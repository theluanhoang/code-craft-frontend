import { create } from "zustand"

interface SidebarState {
  isSidebarOpen: boolean
  isSidebarUnderXLOpen: boolean
  activedSubject: string[]
  toggleSidebar: () => void
  toggleSidebarUnderXL: () => void
  toggleActiveSubject: (slug: string) => void
}

const useSidebarStore = create<SidebarState>((set) => ({
  isSidebarOpen: true,
  isSidebarUnderXLOpen: false,
  activedSubject: [],
  toggleSidebar: () =>
    set((state) => ({
      isSidebarOpen: !state.isSidebarOpen,
    })),
  toggleSidebarUnderXL: () =>
    set((state) => ({
      isSidebarUnderXLOpen: !state.isSidebarUnderXLOpen,
    })),
  toggleActiveSubject: (slug: string) =>
    set((state) => ({
      activedSubject: state.activedSubject.includes(slug)
        ? state.activedSubject.filter((_slug) => _slug !== slug)
        : [...state.activedSubject, slug],
    })),
}))

export default useSidebarStore
