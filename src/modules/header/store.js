import create from "zustand";

const [useStore] = create((set) => ({
  siteTitle: "Site Title",
  setSiteTitle: (newTitle) => set({ siteTitle: newTitle }),
}));

export default useStore;
