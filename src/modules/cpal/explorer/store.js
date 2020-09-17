import create from 'zustand'
import i18n from '@pureartisan/simple-i18n'
import { FlyToInterpolator } from 'react-map-gl'
import WebMercatorViewport from 'viewport-mercator-project'
import * as ease from 'd3-ease'

import en_US from './../../../constants/en_US'
import {
  DEFAULT_VIEWPORT,
  DEFAULT_ROUTE,
} from './../../../constants/map'

const [useStore] = create((set, get) => ({
  route: '',
  defaultRoute: DEFAULT_ROUTE,
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
  activeView: `map`, // Map or feeder
  setActiveView: newVal => set({ activeView: newVal }),
  viewSelect: [
    {
      label: `SELECT_ITEM_MAP`,
      id: `select_view_map`,
      active: true,
    },
    {
      label: `SELECT_ITEM_FEEDER`,
      id: `select_view_feeder`,
      active: false,
    },
  ],
  setViewSelect: newArr => set({ viewSelect: newArr }),
  displayDistricts: [`057905`, `057834`],
  viewport: {
    latitude: 32.7603525,
    longitude: -96.791731,
    zoom: 10,
    bearing: 0,
    pitch: 0,
    dragPan: true,
    touchZoom: true,
    touchRotate: true,
    preserveDrawingBuffer: true,
  },
  resetViewport: DEFAULT_VIEWPORT,
  setViewport: viewport =>
    set(state => ({
      viewport: { ...state.viewport, ...viewport },
    })),
  flyToReset: () => {
    set(state => ({
      viewport: {
        ...state.resetViewport,
        transitionDuration: 3000,
        transitionInterpolator: new FlyToInterpolator(),
        transitionEasing: ease.easeCubic,
      },
    }))
  },
  flyToSchool: (lat, lng) => {
    // console.log('fly to school, ', lat)
    const newViewport = {
      latitude: lat,
      longitude: lng,
      zoom: 14,
    }
    set(state => ({
      viewport: {
        ...state.viewport,
        ...newViewport,
        transitionDuration: 3000,
        transitionInterpolator: new FlyToInterpolator(),
        transitionEasing: ease.easeCubic,
      },
    }))
  },
  schoolZonesAffix: `200`,
  activeLayers: [0, 0, 0, 0, 0, 0],
  setActiveLayers: newArr => set({ activeLayers: newArr }),
  defaultMetric: 'cri_weight',
  activeMetric: 'cri_weight',
  setActiveMetric: newActiveMetric =>
    set({ activeMetric: newActiveMetric }),
  activeQuintiles: [1, 1, 1, 1, 1],
  setActiveQuintiles: newArr =>
    set({ activeQuintiles: newArr }),
  slideoutPanel: {
    active: false,
    panel: '', // 'filters', 'layers', or 'info'
  },
  setSlideoutPanel: newObj =>
    set({ slideoutPanel: newObj }),
  defaultFilterTab: 'cri',
  activeFilterTab: 'cri',
  setActiveFilterTab: newActiveFilterTab =>
    set({ activeFilterTab: newActiveFilterTab }),
  feederSchools: [],
  setFeederSchools: newArr =>
    set({ feederSchools: newArr }),
  activeFeeder: null,
  setActiveFeeder: newVal => set({ activeFeeder: newVal }),
  justLoaded: true,
  setJustLoaded: newBool => set({ justLoaded: newBool }),
  feederLocked: false,
  setFeederLocked: newBool =>
    set({ feederLocked: newBool }),
  highlightedSchool: null,
  setHighlightedSchool: newStr =>
    set({ highlightedSchool: newStr }),
  shareLinkModal: false,
  setShareLinkModal: newBool =>
    set({ shareLinkModal: newBool }),
  unifiedShareModal: false,
  setUnifiedShareModal: newBool =>
    set({ unifiedShareModal: newBool }),
  handleToggleMenu: null,
  setHandleToggleMenu: newFunc =>
    set({ handleToggleMenu: newFunc }),
  shareHash: null,
  setShareHash: newStr => set({ shareHash: newStr }),
  breakpoint: null,
  setBreakpoint: newVal => set({ breakpoint: newVal }),
  browserWidth: null,
  setBrowserWidth: newVal => set({ browserWidth: newVal }),
  flyToSchoolSLN: null,
  setFlyToSchoolSLN: newVal =>
    set({ flyToSchoolSLN: newVal }),
  schoolHint: null,
  setSchoolHint: newVal => set({ schoolHint: newVal }),
  showIntroModal: false,
  setShowIntroModal: newVal =>
    set({ showIntroModal: newVal }),
  showPanelModal: false,
  setShowPanelModal: newVal =>
    set({ showPanelModal: newVal }),
  enableTour: false, // Set this true to show the launch tour button in intro modal.
  setEnableTour: newVal => set({ enableTour: newVal }),
  showMapModal: false,
  setShowMapModal: newVal => set({ showMapModal: newVal }),
  // Hovered feature ID
  hovered: null,
  // Hovered feature type.
  type: null,
  // Hovered feature object.
  feature: null,
  // x, y coords of hovered object.
  coords: [0, 0],
  setCoords: coords => set({ coords }),
  // Sets the various state items related to school hover.
  setHovered: (
    hoveredId,
    hoveredType,
    coords,
    feature,
    options = { showTooltip: true, showMarkers: true },
  ) => {
    // console.log(
    //   'setHovered',
    //   hoveredId,
    //   hoveredType,
    //   coords,
    // )
    // hoveredId
    //   ?
    set(state => ({
      hovered: hoveredId,
      type: hoveredType,
      coords: coords ? coords : state.coords,
      feature: feature,
    }))
  },
  // Position of tooltips in control panel, changes with breakpoint
  buttonTooltipPosition: 'auto',
  setButtonTooltipPosition: newVal =>
    set({ buttonTooltipPosition: newVal }),
  showMobileLegend: false,
  setShowMobileLegend: newVal =>
    set({ showMobileLegend: newVal }),
  isMobile: false,
  setIsMobile: newVal => set({ isMobile: newVal }),
  interactionsMobile: false,
  setInteractionsMobile: newVal =>
    set({ interactionsMobile: newVal }),
}))

export default useStore
