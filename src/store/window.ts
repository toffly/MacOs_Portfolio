import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "../constants";

type WindowData = unknown;

type WindowStateItem = {
  isOpen: boolean;
  zIndex: number;
  data: WindowData | null;
};

type WindowState = {
  windows: Record<string, WindowStateItem>;
  nextZIndex: number;

  openWindow: (windowKey: string | number, data?: WindowData | null) => void;
  closeWindow: (windowKey: string | number) => void;
  focusWindow: (windowKey: string | number) => void;
};

const useWindowStore = create<WindowState>()(
  immer((set) => ({
    windows: WINDOW_CONFIG as Record<number, WindowStateItem>,
    nextZIndex: INITIAL_Z_INDEX + 1,

    openWindow: (windowKey, data = null) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;

        win.isOpen = true;
        win.zIndex = state.nextZIndex;
        win.data = data ?? win.data;
        state.nextZIndex++;
      }),

    closeWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;

        win.isOpen = false;
        win.zIndex = INITIAL_Z_INDEX;
        win.data = null;
      }),

    focusWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;

        win.zIndex = state.nextZIndex++;
      }),

  }))
);

export default useWindowStore;