import { create } from "zustand";

type State = {
    active: boolean,
}

type Action = {
    setActive: () => void
}

export const useSpaceUI = create<State & Action>((set) => ({
    active: true,
    setActive: () => set((state)=>({active: !state.active})) 
}))
