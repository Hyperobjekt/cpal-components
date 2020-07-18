import create from 'zustand'
import i18n from '@pureartisan/simple-i18n'
import en_US from './../../../constants/en_US'

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
  activeView: `map`,
  setActiveView: newVal => set({ activeView: newVal }),
  viewSelect: [
    {
      label: `SELECT_ITEM_MAP`,
      id: `select_view_map`,
    },
    {
      label: `SELECT_ITEM_FEEDER`,
      id: `select_view_feeder`,
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
    preserveDrawingBuffer: true,
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
  activeMetric: 'cri',
  setActiveMetric: newActiveMetric =>
    set({ activeMetric: newActiveMetric }),
  activeQuintiles: [1, 1, 1, 1, 1],
  setActiveQuintiles: newArr =>
    set({ activeQuintiles: newArr }),
  slideoutPanel: {
    active: false,
    panel: '', // filters or weights, presumably, possibly info
  },
  setSlideoutPanel: newObj =>
    set({ slideoutPanel: newObj }),
}))

export default useStore
