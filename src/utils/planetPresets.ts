const presets = {
    background: "/space_spheremap_8k.jpg",
    showOrbitPath: true,
    showPlanetLabel: true,
    rotationScale: 1,
    distanceScale: 1,
    sizeScale: 1,
    timeScale: 1,
}

export interface Presets {
    background: string,
    showOrbitPath: boolean,
    showPlanetLabel: boolean,
    rotationScale: number,
    distanceScale: number,
    sizeScale: number,
    timeScale: number
}

export default presets;
