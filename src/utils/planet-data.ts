const planetData = {
    sun: {
        size: 1391400,
        distance: 0,
        rotation: 0,
        orbitalVel: 0,
        ring: null,
    },
    mercury: {
        size: 4879,
        distance: 57900000,
        rotation: { period: 1407.5, tilt: 0.03 },
        orbitalVel: 47.9,
        ring: null,
    },
    venus: {
        size: 12104,
        distance: 108200000,
        rotation: { period: -5832.5, tilt: 177.4 },
        orbitalVel: 35,
        ring: null,
    },
    earth: {
        size: 12742,
        distance: 149600000,
        rotation: { period: 23.9345, tilt: 23.44 },
        orbitalVel: 29.78,
        ring: null,
    },
    mars: {
        size: 6779,
        distance: 227940000,
        rotation: { period: 24.6229, tilt: 25.19 },
        orbitalVel: 24.07,
        ring: null,
    },
    jupiter: {
        size: 139820,
        distance: 778330000,
        rotation: { period: 9.925, tilt: 3.13 },
        orbitalVel: 13.07,
        ring: null,
    },
    saturn: {
        size: 116460,
        distance: 1429400000,
        rotation: { period: 10.656, tilt: 26.73 },
        orbitalVel: 9.69,
        ring: { inner: 7000, outer: 80000 },
    },
    uranus: {
        size: 50724,
        distance: 2870990000,
        mesh: null,
        rotation: { period: -17.24, tilt: 97.77 },
        orbitalVel: 6.8,
        ring: { inner: 39600, outer: 97700 },
    },
    neptune: {
        size: 49244,
        distance: 4495100000,
        rotation: { period: 16.11, tilt: 28.32 },
        orbitalVel: 5.43,
        ring: null,
    },
};

 export default planetData;
