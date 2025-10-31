import { create } from "zustand";

type State = {
    time: number 
    live: boolean
    multiplier: number,
}

type Action = {
    updateTime: (delta:number) => void
    updateLive: (live:boolean) => void
    updateMult: (multiplier:number) => void
}

export const useTime = create<State & Action>((set) => ({
    time: new Date().getTime(),
    live: true,
    multiplier: 1,

    updateTime: (delta = 0) =>
        set((state) => ({
            time: state.live
                ? new Date().getTime() 
                : state.time + delta*state.multiplier
        })),

    updateLive: () => 
        set((state) => ({
            live: !state.live,
            time: state.live ? new Date().getTime() : state.time,
            multiplier: state.live ? 1 : 0,
        })),

    updateMult: (multiplier) => 
        set((state) => ({
            multiplier,
            live: state.live ? false : state.live,
        })),
}));
