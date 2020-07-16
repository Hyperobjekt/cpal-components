import create from 'zustand'

const [useStore] = create((set, get) => ({
  siteHref: '/',
  setSiteHref: newHref => set({ siteHref: newHref }),
  // activeDistrict: ``,
  // setActiveDistrict: newDistrict =>
  //   set({ activeDistrict: newDistrict }),
  // schoolsData: {},
  // setSchoolsData: newObj => set({ schoolsData: newObj }),
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
      id: `select_view_map`,
    },
    {
      label: `SELECT_ITEM_FEEDER`,
      id: `select_view_feed`,
    },
  ],
  displayDistricts: [`057905`, `057834`],
  viewport: {
    latitude: 32.7603525,
    longitude: -96.791731,
    zoom: 10,
    bearing: 0,
    pitch: 0,
    dragPan: true,
    touchZoomRotate: { around: 'center' },
    // scrollZoom: { around: 'center' },
  },
  setViewport: viewport =>
    set(state => ({
      viewport: { ...state.viewport, ...viewport },
    })),
  schoolZonesAffix: `200`,
  activeLayers: [
    {
      id: `district_boundaries`,
      active: true,
      types: [`districts`],
    },
    {
      id: `redlining`,
      active: false,
      types: ['redlineShapes', 'redlineLines'],
    },
  ],
  setActiveLayers: newArr => set({ activeLayers: newArr }),
}))

export default useStore
