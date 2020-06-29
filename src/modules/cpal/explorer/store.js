import create from 'zustand'

const [useStore] = create(set => ({
  siteHref: '/',
  setSiteHref: newHref => set({ siteHref: newHref }),
  districtDataDallas: {},
  setDistrictDataDallas: newObj =>
    set({ districtDataDallas: newObj }),
  districtDataRichardson: {},
  setDistrictDataRichardson: newObj =>
    set({ districtDataDallas: newObj }),
  districtPolyDallas: {},
  setDistrictPolyDallas: newObj =>
    set({ districtPolyDallas: newObj }),
  districtPolyRichardson: {},
  setDistrictPolyRichardson: newObj =>
    set({ districtPolyRichardson: newObj }),
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
  GEO: {
    dallas: {
      lat: 32.8203525,
      lng: -97.011731,
    },
  },
  displayDistricts: [`057905`, `057834`],
  viewport: {
    latitude: 32.8203525,
    longitude: -97.011731,
    zoom: 9,
    bearing: 0,
    pitch: 0,
    dragPan: true,
    touchZoomRotate: { around: 'center' },
    scrollZoom: { around: 'center' },
  },
  setViewport: viewport =>
    set(state => ({
      viewport: { ...state.viewport, ...viewport },
    })),
}))

export default useStore
