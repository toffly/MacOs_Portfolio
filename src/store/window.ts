import { create } from "zustand";
import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "../constants";

const useWindowStore = create()((set) => ({
  windows: WINDOW_CONFIG,
  nextZIndex: INITIAL_Z_INDEX + 1,

  openWindow: (windowKey: string, data = null) => set((state) => {
    const win = state.windows[windowKey]
    win.isOpen = true
    win.zindex = state.nextZindex
    win.date = data ?? win.data
    state.nextZindex++
  }),

  closeWindow: (windowKey: string) => set((state) => {
    const win = state.windows[windowKey]
    win.isOpen = false
    win.zindex = INITIAL_Z_INDEX
    win.date = null
  }),

  focusWindow: (windowKey: string) => set((state) => {
    const win = state.windows[windowKey]
    win.zindex = state.nextZIndex++
  })
}));

export default useWindowStore
