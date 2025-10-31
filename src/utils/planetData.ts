// Orbital elements for planets (simplified, epoch J2000)

// a — Semi-major axis (AU): Average orbital radius (distance from Sun).
// e — Eccentricity: How elliptical the orbit is (0 = circle, 1 = parabola).
// i — Inclination (°): Tilt of the orbital plane relative to the ecliptic plane.
// Ω (Omega) — Longitude of ascending node (°): The angle from the reference direction (vernal equinox) to where the planet crosses the ecliptic from south to north.
// ω (omega) — Argument of perihelion (°): Angle from the ascendng node to the point of closest approach to the Sun (perihelion).
// M₀ — Mean anomaly at epoch (°): Where the planet was in its orbit at a specific reference time (epoch J2000 here).

const planetData = {
    sun: {
        radius: 695700,
        rotation: { period: 0, tilt: 0 },
        emission: 1,
        ring: null,
        orbitalElements: null,
        color: "#ffc300"
    },
    mercury: {
        radius: 2439,
        rotation: { period: 1407.5, tilt: 0.03 },
        emission: null,
        ring: null,
        orbitalElements: { a: 0.387, e: 0.206, i: 7.0, Ω: 48.3, ω: 29.1, M0: 174.8 },
        color: "#9ca3af"
    },
    venus: {
        radius: 6051,
        rotation: { period: -5832.5, tilt: 177.4 },
        emission: null,
        ring: null,
        orbitalElements: { a: 0.723, e: 0.007, i: 3.4, Ω: 76.7, ω: 54.9, M0: 50.4 },
        color: "#f5cba7"
    },
    earth: {
        radius: 6371,
        rotation: { period: 23.9345, tilt: 23.44 },
        emission: null,
        ring: null,
        orbitalElements: { a: 1.0, e: 0.017, i: 0.0, Ω: 0.0, ω: 102.9, M0: 357.5 },
        color: "#3bafda"
    },
    mars: {
        radius: 3389,
        rotation: { period: 24.6229, tilt: 25.19 },
        emission: null,
        ring: null,
        orbitalElements: { a: 1.524, e: 0.093, i: 1.85, Ω: 49.6, ω: 286.5, M0: 19.4 },
        color: "#f76c3c"
    },
    jupiter: {
        radius: 69911,
        rotation: { period: 9.925, tilt: 3.13 },
        emission: null,
        ring: null,
        orbitalElements: { a: 5.203, e: 0.049, i: 1.3, Ω: 100.5, ω: 273.9, M0: 20.0 },
        color: "#d7b377"
    },
    saturn: {
        radius: 58232,
        rotation: { period: 10.656, tilt: 26.73 },
        emission: null,
        ring: { inner: 66900, outer: 175000 },
        orbitalElements: { a: 9.537, e: 0.056, i: 2.5, Ω: 113.7, ω: 339.4, M0: 317.0 },
        color: "#f1c2d7"
    },
    uranus: {
        radius: 25362,
        rotation: { period: -17.24, tilt: 97.77 },
        emission: null,
        ring: { inner: 39600, outer: 51140 },
        orbitalElements: { a: 19.19, e: 0.046, i: 0.8, Ω: 74.0, ω: 96.0, M0: 142.2 },
        color: "#76d7c4"
    },
    neptune: {
        radius: 24622,
        rotation: { period: 16.11, tilt: 28.32 },
        emission: null,
        ring: null,
        orbitalElements: { a: 30.07, e: 0.009, i: 1.8, Ω: 131.8, ω: 273.0, M0: 256.2 },
        color: "#5dade2"
    },
};

export interface AngleXYZ {
    x: number,
    y: number,
    z: number
}

export interface Ring {
    inner: number,
    outer: number,
    rotation: AngleXYZ
}

export interface OrbitalElements {
    a: number,
    e: number,
    i: number,
    Ω: number,
    ω: number,
    M0: number
}

export interface Planet {
    radius: number,
    rotation: { period: number, tilt: number },
    emission: number | null,
    ring: Ring | null,
    orbitalElements: OrbitalElements | null,
    color: string
}

export interface PlanetData {
    [key:string] : Planet
}

 export default planetData;
