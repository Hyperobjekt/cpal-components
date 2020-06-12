import create from 'zustand'

const [useStore] = create(set => ({
  siteHref: '/',
  setSiteHref: newHref => set({ siteHref: newHref }),
  logoSrc: `<svg width="150" height="50">
            <rect width="150" height="50" style="fill:#545b62;stroke-width:3;stroke:#545b62" />
            <text x="25" y="40" fill="white">LOGO</text>
          </svg>`,
  colors: {
    base: ``,
    baseInverted: ``,
  },
  activeLang: `en_us`,
  viewDefault: `map`,
  viewSelect: [
    {
      label: `SELECT_ITEM_MAP`,
      id: `map`,
    },
    {
      label: `SELECT_ITEM_FEEDER`,
      id: `feed`,
    },
  ],
}))

export default useStore
