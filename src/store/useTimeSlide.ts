import { create } from "zustand";

type State = {
    sliderIndex: number,
}

type Action = {
    updateIndex: (index:number) => void,
}

export const useTimeSlide = create<State & Action>( set => ({
    sliderIndex: 28,
    updateIndex: (index) => set(() => ({sliderIndex: index}))
}));
