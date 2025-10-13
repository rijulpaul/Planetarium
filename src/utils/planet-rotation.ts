const rotationData = {
  mercury: { period: 1407.5, tilt: 0.03 },
  venus:   { period: -5832.5, tilt: 177.4 },
  earth:   { period: 23.9345, tilt: 23.44 },
  mars:    { period: 24.6229, tilt: 25.19 },
  jupiter: { period: 9.925, tilt: 3.13 },
  saturn:  { period: 10.656, tilt: 26.73 },
  uranus:  { period: -17.24, tilt: 97.77 },
  neptune: { period: 16.11, tilt: 28.32 }
};

// Compute rotation angle in degrees at current time
function rotationAngle(planet, daysSinceJ2000) {
  const period = rotationData[planet].period;
  const rotationPeriodDays = period / 24; // convert hours to days
  const angle = (360 * (daysSinceJ2000 / rotationPeriodDays)) % 360;
  return angle;
}

function getRotations(planet) {
    const J2000 = new Date('2000-01-01T12:00:00Z');
    const now = new Date();
    const daysSinceJ2000 = (now - J2000) / (1000 * 60 * 60 * 24);

    let rotation;

    try {
        rotation = rotationAngle(planet,daysSinceJ2000)
    } catch (e) {
        throw Error(`Invalid planet name "${planet}"`)
    }

    return rotation;
}

export default getRotations;
