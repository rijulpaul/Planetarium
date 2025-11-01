import { Vector3 } from "three";
import { degToRad } from "three/src/math/MathUtils.js";
import type { OrbitalElements } from "./planetData";

function kepler(M:number, e:number) {
  M = degToRad(M);
  let E = M;

  // Iterative calculation of E
  for (let i = 0; i < 3; i++) {
    E = E - (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
  }
  return E;
}

// Compute all planet positions
export function getPositions(date:Date = new Date(), elements:OrbitalElements | null) {
  if (!elements) return { x:0, y:0, z:0 }

  const { a, e, i, Ω, ω, M0 } = elements;

  const J2000 = new Date("2000-01-01T12:00:00Z");
  const daysSinceJ2000 = (date.getTime() - J2000.getTime()) / (1000 * 60 * 60 * 24);

  const n = 360 / (a ** 1.5 * 365.25); // mean motion in deg/day (simplified)
  const M = M0 + n * daysSinceJ2000; // mean anomaly
  const E = kepler(M, e); // eccentric anomaly

  const xOrb = a * (Math.cos(E) - e);
  const yOrb = a * Math.sqrt(1 - e * e) * Math.sin(E);

  const cosΩ = Math.cos(degToRad(Ω)),
    sinΩ = Math.sin(degToRad(Ω));
  const cosi = Math.cos(degToRad(i)),
    sini = Math.sin(degToRad(i));
  const cosω = Math.cos(degToRad(ω)),
    sinω = Math.sin(degToRad(ω));

  // Rotate to heliocentric ecliptic coordinates
  const x =
    (cosΩ * cosω - sinΩ * sinω * cosi) * xOrb +
    (-cosΩ * sinω - sinΩ * cosω * cosi) * yOrb;
  const y =
    (sinΩ * cosω + cosΩ * sinω * cosi) * xOrb +
    (-sinΩ * sinω + cosΩ * cosω * cosi) * yOrb;
  const z = sinω * sini * xOrb + cosω * sini * yOrb;

  // convert from AU to km
  return { x: x * 149600000, y: -y * 149600000, z: z * 149600000 };
}

export function getRotations(date: Date = new Date(), period:number) {
  if (period == 0) return 0;

  const J2000 = new Date("2000-01-01T12:00:00Z");
  const daysSinceJ2000 = (date.getTime() - J2000.getTime()) / 86400000;

  const rotationPeriodDays = period / 24;
  const rotations = daysSinceJ2000 / rotationPeriodDays;

  const angle = (rotations * 360) % 360;

  return degToRad(angle)
}

export function sampleOrbit(elements:OrbitalElements, date:Date = new Date(), numPoints: number = 360) {
  const { a, e, i, Ω, ω, M0 } = elements;
  const n = 360 / (a ** 1.5 * 365.25); // deg/day
  const J2000 = new Date("2000-01-01T12:00:00Z");
  const d = (date.getTime() - J2000.getTime()) / (1000 * 60 * 60 * 24);
  const epochMdeg = (M0 + n * d) % 360;
  const epochM = degToRad(epochMdeg);

  const points = [];
  for (let k = 0; k < numPoints; k++) {
    const M = (2 * Math.PI * k) / numPoints + epochM;
    const E = kepler(M, e);
    const v =
      2 *
      Math.atan2(
        Math.sqrt(1 + e) * Math.sin(E / 2),
        Math.sqrt(1 - e) * Math.cos(E / 2),
      );
    const r = a * (1 - e * Math.cos(E));

    const iRad = degToRad(i);
    const Omega = degToRad(Ω);
    const argp = degToRad(ω);
    const theta = argp + v;

    const cosOmega = Math.cos(Omega),
      sinOmega = Math.sin(Omega);
    const cosTheta = Math.cos(theta),
      sinTheta = Math.sin(theta);
    const cosi = Math.cos(iRad);

    const x = r * (cosOmega * cosTheta - sinOmega * sinTheta * cosi);
    const y = r * (sinOmega * cosTheta + cosOmega * sinTheta * cosi);
    const z = r * (sinTheta * Math.sin(iRad));

    points.push(new Vector3(x, y, z));
  }
  // close orbit: push first point again
  points.push(points[0].clone());
  return points;
}
