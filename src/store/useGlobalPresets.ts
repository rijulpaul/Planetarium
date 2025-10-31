import presets, { type Presets } from "../utils/planetPresets";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
    presets: Presets
}

type Action = {
    setPresets: (presetId : string) => void
}

export const useGlobalState = create<State & Action>(){
    immer((set)=>({
        presets
    }))
}
