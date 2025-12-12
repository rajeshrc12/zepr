import { create } from "zustand";

interface LayoutState {
  left: boolean;
  right: boolean;
  setLayout: (layout: Partial<Pick<LayoutState, "left" | "right">>) => void;
}

export const useLayout = create<LayoutState>()((set) => ({
  left: true,
  right: false,

  setLayout: (layout) =>
    set((state) => ({
      ...state,
      ...layout,
    })),
}));
