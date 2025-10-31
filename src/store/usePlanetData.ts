import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import basePlanetData, { type PlanetData, type OrbitalElements } from "../utils/planetData";

type State = {
    planets: PlanetData
}

type Actions = {
    updateOrbitalElements: (planetKey: string, updater: (prev: OrbitalElements) => OrbitalElements) => void
}

export const usePlanetData = create<State & Actions>()(immer((set) => ({
    planets: basePlanetData,
    updateOrbitalElements: (planetKey, updater) => set((draft) => {
        const planet = draft.planets[planetKey];
        if (!planet || planet.orbitalElements == null) return;
        const next = updater(planet.orbitalElements);
        planet.orbitalElements = next;
    })
}))
);

export default usePlanetData;


