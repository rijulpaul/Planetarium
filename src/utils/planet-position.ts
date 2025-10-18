// Orbital elements for planets (simplified, epoch J2000)
const positionData = {
  mercury: { a: 0.387, e: 0.206, i: 7.0, Ω: 48.3, ω: 29.1, M0: 174.8 },
  venus:   { a: 0.723, e: 0.007, i: 3.4, Ω: 76.7, ω: 54.9, M0: 50.4 },
  earth:   { a: 1.000, e: 0.017, i: 0.0, Ω: 0.0, ω: 102.9, M0: 357.5 },
  mars:    { a: 1.524, e: 0.093, i: 1.85, Ω: 49.6, ω: 286.5, M0: 19.4 },
  jupiter: { a: 5.203, e: 0.049, i: 1.3, Ω: 100.5, ω: 273.9, M0: 20.0 },
  saturn:  { a: 9.537, e: 0.056, i: 2.5, Ω: 113.7, ω: 339.4, M0: 317.0 },
  uranus:  { a: 19.19, e: 0.046, i: 0.8, Ω: 74.0, ω: 96.0, M0: 142.2 },
  neptune: { a: 30.07, e: 0.009, i: 1.8, Ω: 131.8, ω: 273.0, M0: 256.2 }
};

// Convert degrees to radians
const deg2rad = deg => deg * Math.PI / 180;

// Solve Kepler's equation: M = E - e*sin(E)
function kepler(M, e) {
  M = deg2rad(M);
  let E = M;
  for (let i = 0; i < 10; i++) { E = E - (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E)); }
  return E;
}

// Compute heliocentric position in AU
function heliocentric(planet, daysSinceJ2000) {
  if (!positionData[planet]) {
    // console.log(
    //   `No entry for ${planet} in positionData planet-positions.ts\nfalling back to 0.`,
    // );
    return { x:0, y:0, z:0 };
  }

  const { a, e, i, Ω, ω, M0 } = positionData[planet];

  const n = 360 / (a**1.5 * 365.25); // mean motion in deg/day (simplified)
  const M = M0 + n * daysSinceJ2000; // mean anomaly
  const E = kepler(M, e); // eccentric anomaly

  const xOrb = a * (Math.cos(E) - e);
  const yOrb = a * Math.sqrt(1 - e*e) * Math.sin(E);

  const cosΩ = Math.cos(deg2rad(Ω)), sinΩ = Math.sin(deg2rad(Ω));
  const cosi = Math.cos(deg2rad(i)), sini = Math.sin(deg2rad(i));
  const cosω = Math.cos(deg2rad(ω)), sinω = Math.sin(deg2rad(ω));

  // Rotate to heliocentric ecliptic coordinates
  const x = (cosΩ * cosω - sinΩ * sinω * cosi) * xOrb + (-cosΩ * sinω - sinΩ * cosω * cosi) * yOrb;
  const y = (sinΩ * cosω + cosΩ * sinω * cosi) * xOrb + (-sinΩ * sinω + cosΩ * cosω * cosi) * yOrb;
  const z = (sinω * sini) * xOrb + (cosω * sini) * yOrb;

  return { x, y, z };
}

function getPositions(planet) {
    // Compute days since J2000
    const J2000 = new Date('2000-01-01T12:00:00Z');
    const now = new Date();
    const daysSinceJ2000 = (now - J2000) / (1000 * 60 * 60 * 24);

    // Compute all planet positions
    const position = heliocentric(planet.toLowerCase(),daysSinceJ2000);

    return position;
}

export default getPositions;
