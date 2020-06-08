import create from 'zustand'

const [useStore] = create(set => ({
  siteTitle: 'Site Title',
  setSiteTitle: newTitle => set({ siteTitle: newTitle }),
  siteHref: '/',
  setSiteHref: newHref => set({ siteHref: newHref }),
  logoSrc: `<svg width="150" height="50">
            <rect width="150" height="50" style="fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)" />
            <text x="25" y="40" fill="white">LOGO</text>
          </svg>`,
  colors: {
    base: ``,
    baseInverted: ``,
  },
  menuButtonLabel: `Menu`,
  searchInputLabel: `Enter search criteria`,
  searchButtonLabel: `Select to search`,
  searchPlaceholder: `Search... `,
}))

export default useStore
