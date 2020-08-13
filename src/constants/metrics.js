// import LANG from './en'

import {
  CRI_COLORS,
  ECON_COLORS,
  EDU_COLORS,
  FAM_COLORS,
  HEL_COLORS,
  COMM_COLORS,
  DEM_COLORS,
} from './colors'

export const ROUTE_SET = [
  'view', // View, 'map' or 'feeder'
  'metric', // Metric ID to set for active metric.
  'quintiles', // quintiles that are active and inactive. Always length fo 5.
  'feeder', // TEA_ID of feeder that will be "locked" in feeder view.
  'school', // TEA_ID of a school that will be highlighted in feeder view.
  'layers', // To determine active layers, 'district_boundaries' and/or 'redlining'
  'lat', // Latitude
  'lng', // Longitude
  'zoom', // Zoom level
]

export const CPAL_FILTER_TABS = [
  {
    id: 'cri',
    title: 'UI_MAP_METRIC_TITLE_CRI',
  },
  {
    id: 'econ',
    title: 'UI_MAP_METRIC_TITLE_ECON',
  },
  {
    id: 'edu',
    title: 'UI_MAP_METRIC_TITLE_EDU',
  },
  {
    id: 'fam',
    title: 'UI_MAP_METRIC_TITLE_FAM',
  },
  {
    id: 'comm',
    title: 'UI_MAP_METRIC_TITLE_COMM',
  },
  {
    id: 'hel',
    title: 'UI_MAP_METRIC_TITLE_HEAL',
  },
]

// Fucking necessary because the client can't seem to make their affixes consistent between
// indices and indicators to save their fucking lives.
export const CPAL_FEEDER_TIP_ITEMS = [
  {
    id: 'cri_weight',
    title: 'UI_MAP_METRIC_TITLE_CRI',
  },
  {
    id: 'eci_weight',
    title: 'UI_MAP_METRIC_TITLE_ECON',
  },
  {
    id: 'edi_weight',
    title: 'UI_MAP_METRIC_TITLE_EDU',
  },
  {
    id: 'fi_weight',
    title: 'UI_MAP_METRIC_TITLE_FAM',
  },
  {
    id: 'ci_weight',
    title: 'UI_MAP_METRIC_TITLE_COMM',
  },
  {
    id: 'hi_weight',
    title: 'UI_MAP_METRIC_TITLE_HEAL',
  },
]

export const CPAL_METRICS = [
  {
    id: 'cri_weight',
    title: 'UI_MAP_METRIC_TITLE_CRI',
    abbrev: 'CRI',
    range: [0, 100],
    high_is_good: 1,
    colors: CRI_COLORS,
    tab: 'cri',
    tab_level: 0,
    tooltip: 1,
    desc: `UI_MAP_METRIC_DESC_CRI`,
    decimals: 0,
  },
  {
    id: 'eci_weight',
    title: 'UI_MAP_METRIC_TITLE_ECON_INDEX',
    // desc: 'UI_MAP_METRIC_DESC_ECON',
    abbrev: 'ECON',
    range: [0, 100],
    high_is_good: 1,
    colors: ECON_COLORS,
    tab: 'econ',
    tab_level: 0,
    tooltip: 1,
    decimals: 0,
  },
  {
    id: 'edi_weight',
    title: 'UI_MAP_METRIC_TITLE_EDU_INDEX',
    // desc: 'UI_MAP_METRIC_DESC_EDU',
    abbrev: 'EDU',
    range: [0, 100],
    high_is_good: 1,
    colors: EDU_COLORS,
    tab: 'edu',
    tab_level: 0,
    tooltip: 1,
    decimals: 0,
  },
  {
    id: 'fi_weight',
    title: 'UI_MAP_METRIC_TITLE_FAM_INDEX',
    // desc: 'UI_MAP_METRIC_DESC_FAM',
    abbrev: 'FAM',
    range: [0, 100],
    high_is_good: 1,
    colors: FAM_COLORS,
    tab: 'fam',
    tab_level: 0,
    tooltip: 1,
    decimals: 0,
  },
  {
    id: 'hi_weight',
    title: 'UI_MAP_METRIC_TITLE_HEAL_INDEX',
    // desc: 'UI_MAP_METRIC_DESC_HEAL',
    abbrev: 'HEAL',
    range: [0, 100],
    high_is_good: 1,
    colors: HEL_COLORS,
    tab: 'hel',
    tab_level: 0,
    tooltip: 1,
    decimals: 0,
  },
  {
    id: 'ci_weight',
    title: 'UI_MAP_METRIC_TITLE_COMM_INDEX',
    // desc: 'UI_MAP_METRIC_DESC_COMM',
    abbrev: 'COMM',
    range: [0, 100],
    high_is_good: 1,
    colors: COMM_COLORS,
    tab: 'comm',
    tab_level: 0,
    tooltip: 1,
    decimals: 0,
  },
  {
    id: 'comm_bbp',
    title: 'UI_MAP_METRIC_TITLE_COMM_BBP',
    abbrev: '',
    range: [0.426, 0.944],
    high_is_good: 1,
    colors: COMM_COLORS,
    tab: 'comm',
    tab_level: 1,
    tooltip: 0,
    decimals: 1,
    as_percent: 1,
    order: 12,
  },
  {
    id: 'comm_bvp',
    title: 'UI_MAP_METRIC_COMM_BVP',
    abbrev: '',
    range: [0.03, 0.25],
    high_is_good: 0,
    colors: COMM_COLORS,
    tab: 'comm',
    tab_level: 1,
    tooltip: 0,
    decimals: 1,
    as_percent: 1,
    order: 2,
  },
  {
    id: 'comm_cctrcap',
    title: 'UI_MAP_METRIC_COMM_CCTRCAP',
    abbrev: '',
    range: [0, 4.409107253],
    high_is_good: 1,
    colors: COMM_COLORS,
    tab: 'comm',
    tab_level: 1,
    tooltip: 0,
    decimals: 2,
    order: 9,
  },
  {
    id: 'comm_incarpct',
    title: 'UI_MAP_METRIC_COMM_INCARPCT',
    abbrev: '',
    range: [0.001, 0.027],
    high_is_good: 0,
    colors: COMM_COLORS,
    tab: 'comm',
    tab_level: 1,
    tooltip: 0,
    decimals: 1,
    as_percent: 1,
    order: 7,
  },
  {
    id: 'comm_juvcrimecap',
    title: 'UI_MAP_METRIC_COMM_JUVCRIMECAP',
    abbrev: '',
    range: [0, 3512.382],
    high_is_good: 0,
    colors: COMM_COLORS,
    tab: 'comm',
    tab_level: 1,
    tooltip: 0,
    decimals: 0,
    order: 8,
  },
  {
    id: 'comm_libcap',
    title: 'UI_MAP_METRIC_COMM_LIBCAP',
    abbrev: '',
    range: [0, 1.342207171],
    high_is_good: 1,
    colors: COMM_COLORS,
    tab: 'comm',
    tab_level: 1,
    tooltip: 0,
    decimals: 3,
    order: 10,
  },
  {
    id: 'comm_ltbvp',
    title: 'UI_MAP_METRIC_COMM_LTBVP',
    abbrev: '',
    range: [0.029, 0.226],
    high_is_good: 0,
    colors: COMM_COLORS,
    tab: 'comm',
    tab_level: 1,
    tooltip: 0,
    decimals: 1,
    as_percent: 1,
    order: 3,
  },
  {
    id: 'comm_ltrvp',
    title: 'UI_MAP_METRIC_COMM_LTRVP',
    abbrev: '',
    range: [0.003, 0.141],
    high_is_good: 0,
    colors: COMM_COLORS,
    tab: 'comm',
    tab_level: 1,
    tooltip: 0,
    decimals: 1,
    as_percent: 1,
    order: 4,
  },
  {
    id: 'comm_ocbp',
    title: 'UI_MAP_METRIC_COMM_OCBP',
    abbrev: '',
    range: [0.19, 0.328],
    high_is_good: 0,
    colors: COMM_COLORS,
    tab: 'comm',
    tab_level: 1,
    tooltip: 0,
    decimals: 1,
    as_percent: 1,
    order: 5,
  },
  {
    id: 'comm_parkcap',
    title: 'UI_MAP_METRIC_COMM_PARKCAP',
    abbrev: '',
    range: [0, 1.190866456],
    high_is_good: 1,
    colors: COMM_COLORS,
    tab: 'comm',
    tab_level: 1,
    tooltip: 0,
    decimals: 3,
    order: 11,
  },
  {
    id: 'comm_rcbp',
    title: 'UI_MAP_METRIC_COMM_RCBP',
    abbrev: '',
    range: [0.336, 0.584],
    high_is_good: 0,
    colors: COMM_COLORS,
    tab: 'comm',
    tab_level: 1,
    tooltip: 0,
    decimals: 1,
    as_percent: 1,
    order: 6,
  },
  {
    id: 'comm_rvp',
    title: 'UI_MAP_METRIC_COMM_RVP',
    abbrev: '',
    range: [0.005, 0.148],
    high_is_good: 0,
    colors: COMM_COLORS,
    tab: 'comm',
    tab_level: 1,
    tooltip: 0,
    decimals: 1,
    as_percent: 1,
    order: 3,
  },
  {
    id: 'comm_u18bbp',
    title: 'UI_MAP_METRIC_COMM_U18BBP',
    abbrev: '',
    range: [0.417, 0.981],
    high_is_good: 1,
    colors: COMM_COLORS,
    tab: 'comm',
    tab_level: 1,
    tooltip: 0,
    decimals: 1,
    as_percent: 1,
    order: 13,
  },
  {
    id: 'comm_evrate',
    title: 'UI_MAP_METRIC_COMM_EVRATE',
    abbrev: '',
    range: [6.986375153, 517.5018159],
    high_is_good: 0,
    colors: COMM_COLORS,
    tab: 'comm',
    tab_level: 1,
    tooltip: 0,
    decimals: 2,
    order: 1,
  },
  {
    id: 'econ_cpr',
    title: 'UI_MAP_METRIC_ECON_CPR',
    abbrev: '',
    range: [0.02360659218, 0.5110657644],
    high_is_good: 0,
    colors: ECON_COLORS,
    tab: 'econ',
    tab_level: 1,
    tooltip: 0,
    decimals: 1,
    as_percent: 1,
    order: 3,
  },
  {
    id: 'econ_fincap',
    title: 'UI_MAP_METRIC_ECON_FINCAP',
    abbrev: '',
    range: [0, 11.297],
    high_is_good: 1,
    colors: ECON_COLORS,
    tab: 'econ',
    tab_level: 1,
    tooltip: 0,
    decimals: 2,
    order: 9,
  },
  {
    id: 'econ_medinc',
    title: 'UI_MAP_METRIC_ECON_MEDINC',
    abbrev: '',
    range: [17201.90402, 81300.25703],
    high_is_good: 1,
    colors: ECON_COLORS,
    tab: 'econ',
    tab_level: 1,
    tooltip: 0,
    decimals: 0,
    is_currency: 1,
    order: 1,
  },
  {
    id: 'econ_paydaycap',
    title: 'UI_MAP_METRIC_ECON_PAYDAYCAP',
    abbrev: '',
    range: [0, 4.138],
    high_is_good: 0,
    colors: ECON_COLORS,
    tab: 'econ',
    tab_level: 1,
    tooltip: 0,
    decimals: 2,
    order: 10,
  },
  {
    id: 'econ_pctlwjobs',
    title: 'UI_MAP_METRIC_ECON_PCTLWJOBS',
    abbrev: '',
    range: [0.101, 0.359],
    high_is_good: 1,
    colors: ECON_COLORS,
    tab: 'econ',
    tab_level: 1,
    tooltip: 0,
    decimals: 1,
    as_percent: 1,
    order: 5,
  },
  {
    id: 'econ_pctmwjobs',
    title: 'UI_MAP_METRIC_ECON_PCTMWJOBS',
    abbrev: '',
    range: [0.221, 0.511],
    high_is_good: 1,
    colors: ECON_COLORS,
    tab: 'econ',
    tab_level: 1,
    tooltip: 0,
    decimals: 1,
    as_percent: 1,
    order: 6,
  },
  {
    id: 'econ_pr',
    title: 'UI_MAP_METRIC_ECON_PR',
    abbrev: '',
    range: [0.038, 0.382],
    high_is_good: 0,
    colors: ECON_COLORS,
    tab: 'econ',
    tab_level: 1,
    tooltip: 0,
    decimals: 1,
    as_percent: 1,
    order: 2,
  },
  {
    id: 'econ_pyr',
    title: 'UI_MAP_METRIC_ECON_PYR',
    abbrev: '',
    range: [0.04, 0.581],
    high_is_good: 0,
    colors: ECON_COLORS,
    tab: 'econ',
    tab_level: 1,
    tooltip: 0,
    decimals: 1,
    as_percent: 1,
    order: 8,
  },
  {
    id: 'econ_ur',
    title: 'UI_MAP_METRIC_ECON_UR',
    abbrev: '',
    range: [0.02106888661, 0.1112855214],
    high_is_good: 0,
    colors: ECON_COLORS,
    tab: 'econ',
    tab_level: 1,
    tooltip: 0,
    decimals: 1,
    as_percent: 1,
    order: 7,
  },
  {
    id: 'edu_oostkids',
    title: 'UI_MAP_METRIC_EDU_OOSTKIDS',
    abbrev: '',
    range: [0, 4065.419759],
    high_is_good: 1,
    colors: EDU_COLORS,
    tab: 'edu',
    tab_level: 1,
    tooltip: 0,
    decimals: 0,
    order: 4,
  },
  {
    id: 'edu_perbach',
    title: 'UI_MAP_METRIC_EDU_PERBACH',
    abbrev: '',
    range: [0.024812673, 0.424107957],
    high_is_good: 1,
    colors: EDU_COLORS,
    tab: 'edu',
    tab_level: 1,
    tooltip: 0,
    decimals: 1,
    as_percent: 1,
    order: 1,
  },
  {
    id: 'edu_perearlyed',
    title: 'UI_MAP_METRIC_EDU_PEREARLYED',
    abbrev: '',
    range: [0.163, 0.704],
    high_is_good: 1,
    colors: EDU_COLORS,
    tab: 'edu',
    tab_level: 1,
    tooltip: 0,
    decimals: 1,
    as_percent: 1,
    order: 2,
  },
  {
    id: 'edu_qeckids',
    title: 'UI_MAP_METRIC_EDU_QECKIDS',
    abbrev: '',
    range: [0, 10.00381449],
    high_is_good: 1,
    colors: EDU_COLORS,
    tab: 'edu',
    tab_level: 1,
    tooltip: 0,
    decimals: 0,
    order: 3,
  },
  {
    id: 'econ_totjobs',
    title: 'UI_MAP_METRIC_ECON_TOTJOBS',
    abbrev: '',
    range: [1468, 209962],
    high_is_good: 1,
    colors: EDU_COLORS,
    tab: 'edu',
    tab_level: 1,
    tooltip: 0,
    decimals: 0,
    order: 4,
  },
  {
    id: 'fam_affcckids',
    title: 'UI_MAP_METRIC_FAM_AFFCCKIDS',
    abbrev: '',
    range: [0.950858557, 28.62102666],
    high_is_good: 1,
    colors: FAM_COLORS,
    tab: 'fam',
    tab_level: 1,
    tooltip: 0,
    decimals: 2,
    order: 3,
  },
  {
    id: 'fam_lcckids',
    title: 'UI_MAP_METRIC_FAM_LCCKIDS',
    abbrev: '',
    range: [1.220288152, 36.35139285],
    high_is_good: 1,
    colors: FAM_COLORS,
    tab: 'fam',
    tab_level: 1,
    tooltip: 0,
    decimals: 2,
    order: 2,
  },
  {
    id: 'fam_tphhpct',
    title: 'UI_MAP_METRIC_FAM_TPHHPCT',
    abbrev: '',
    range: [0.251, 0.875],
    high_is_good: 1,
    colors: FAM_COLORS,
    tab: 'fam',
    tab_level: 1,
    tooltip: 0,
    decimals: 1,
    as_percent: 1,
    order: 1,
  },
  {
    id: 'hel_bphigh',
    title: 'UI_MAP_METRIC_HEL_BPHIGH',
    abbrev: '',
    range: [1311.253, 5013.889],
    high_is_good: 0,
    colors: HEL_COLORS,
    tab: 'hel',
    tab_level: 1,
    tooltip: 0,
    decimals: 0,
    order: 12,
  },
  {
    id: 'hel_castthma',
    title: 'UI_MAP_METRIC_HEL_CASTTHMA',
    abbrev: '',
    range: [390.967, 1237.637],
    high_is_good: 0,
    colors: HEL_COLORS,
    tab: 'hel',
    tab_level: 1,
    tooltip: 0,
    decimals: 0,
    order: 13,
  },
  {
    id: 'hel_checkup',
    title: 'UI_MAP_METRIC_HEL_CHECKUP',
    abbrev: '',
    range: [3149.483, 7555.752],
    high_is_good: 1,
    colors: HEL_COLORS,
    tab: 'hel',
    tab_level: 1,
    tooltip: 0,
    decimals: 0,
    order: 9,
  },
  {
    id: 'hel_fruitsveggies',
    title: 'UI_MAP_METRIC_HEL_FRUITSVEGGIES',
    abbrev: '',
    range: [244.245, 534.967],
    high_is_good: 1,
    colors: HEL_COLORS,
    tab: 'hel',
    tab_level: 1,
    tooltip: 0,
    decimals: 0,
    is_currency: 1,
    order: 8,
  },
  {
    id: 'hel_le',
    title: 'UI_MAP_METRIC_HEL_LE',
    abbrev: '',
    range: [38.972, 82.499],
    high_is_good: 1,
    colors: HEL_COLORS,
    tab: 'hel',
    tab_level: 1,
    tooltip: 0,
    decimals: 0,
    order: 4,
  },
  {
    id: 'hel_mhlth',
    title: 'UI_MAP_METRIC_HEL_MHLTH',
    abbrev: '',
    range: [602.264, 1901.951],
    high_is_good: 0,
    colors: HEL_COLORS,
    tab: 'hel',
    tab_level: 1,
    tooltip: 0,
    decimals: 0,
    order: 10,
  },
  {
    id: 'hel_obesity',
    title: 'UI_MAP_METRIC_HEL_OBESITY',
    abbrev: '',
    range: [1449.195, 4738.889],
    high_is_good: 0,
    colors: HEL_COLORS,
    tab: 'hel',
    tab_level: 1,
    tooltip: 0,
    decimals: 0,
    order: 14,
  },
  {
    id: 'hel_perpri',
    title: 'UI_MAP_METRIC_HEL_PERPRI',
    abbrev: '',
    range: [0.258, 0.876],
    high_is_good: 1,
    colors: HEL_COLORS,
    tab: 'hel',
    tab_level: 1,
    tooltip: 0,
    decimals: 1,
    as_percent: 1,
    order: 2,
  },
  {
    id: 'hel_perpub',
    title: 'UI_MAP_METRIC_HEL_PERPUB',
    abbrev: '',
    range: [0.153, 0.496],
    high_is_good: 1,
    colors: HEL_COLORS,
    tab: 'hel',
    tab_level: 1,
    tooltip: 0,
    decimals: 1,
    as_percent: 1,
    order: 3,
  },
  {
    id: 'hel_perins',
    title: 'UI_MAP_METRIC_HEL_PERINS',
    abbrev: '',
    range: [0.5890289674, 0.955786156],
    high_is_good: 1,
    colors: HEL_COLORS,
    tab: 'hel',
    tab_level: 1,
    tooltip: 0,
    decimals: 1,
    as_percent: 1,
    order: 1,
  },
  {
    id: 'hel_pharmacap',
    title: 'UI_MAP_METRIC_HEL_PHARMACAP',
    abbrev: '',
    range: [0, 10.464],
    high_is_good: 1,
    colors: HEL_COLORS,
    tab: 'hel',
    tab_level: 1,
    tooltip: 0,
    decimals: 2,
    order: 6,
  },
  {
    id: 'hel_phlth',
    title: 'UI_MAP_METRIC_HEL_PHLTH',
    abbrev: '',
    range: [498.704, 2074.081],
    high_is_good: 0,
    colors: HEL_COLORS,
    tab: 'hel',
    tab_level: 1,
    tooltip: 0,
    decimals: 0,
    order: 11,
  },
  {
    id: 'hel_clincap',
    title: 'UI_MAP_METRIC_HEL_CLINCAP',
    abbrev: '',
    range: [0, 4.591794665],
    high_is_good: 1,
    colors: HEL_COLORS,
    tab: 'hel',
    tab_level: 1,
    tooltip: 0,
    decimals: 2,
    order: 5,
  },
  {
    id: 'hel_groccap',
    title: 'UI_MAP_METRIC_HEL_GROCCAP',
    abbrev: '',
    range: [0, 2.267815118],
    high_is_good: 1,
    colors: HEL_COLORS,
    tab: 'hel',
    tab_level: 1,
    tooltip: 0,
    decimals: 2,
    order: 7,
  },
  {
    id: 'dem_totp',
    title: 'UI_MAP_METRIC_DEM_TOTP',
    abbrev: '',
    range: [6529, 105444],
    high_is_good: 1,
    colors: DEM_COLORS,
    tab: 'dem',
    tab_level: null,
    tooltip: 0,
    decimals: 2,
  },
  {
    id: 'dem_popwh',
    title: 'UI_MAP_METRIC_DEM_POPWH',
    abbrev: '',
    range: [2562, 84630],
    high_is_good: 1,
    colors: DEM_COLORS,
    tab: 'dem',
    tab_level: null,
    tooltip: 0,
    decimals: 2,
  },
  {
    id: 'dem_popbl',
    title: 'UI_MAP_METRIC_DEM_POPBL',
    abbrev: '',
    range: [925, 31423],
    high_is_good: 1,
    colors: DEM_COLORS,
    tab: 'dem',
    tab_level: null,
    tooltip: 0,
    decimals: 2,
  },
  {
    id: 'dem_popas',
    title: 'UI_MAP_METRIC_DEM_POPAS',
    abbrev: '',
    range: [0, 6489],
    high_is_good: 1,
    colors: DEM_COLORS,
    tab: 'dem',
    tab_level: null,
    tooltip: 0,
    decimals: 2,
  },
  {
    id: 'dem_pophi',
    title: 'UI_MAP_METRIC_DEM_POPHI',
    abbrev: '',
    range: [2112, 73920],
    high_is_good: 1,
    colors: DEM_COLORS,
    tab: 'dem',
    tab_level: null,
    tooltip: 0,
    decimals: 2,
  },
  {
    id: 'dem_popm',
    title: 'UI_MAP_METRIC_DEM_POPM',
    abbrev: '',
    range: [3313, 54739],
    high_is_good: 1,
    colors: DEM_COLORS,
    tab: 'dem',
    tab_level: null,
    tooltip: 0,
    decimals: 2,
  },
  {
    id: 'dem_popf',
    title: 'UI_MAP_METRIC_DEM_POPF',
    abbrev: '',
    range: [3218, 50713],
    high_is_good: 1,
    colors: DEM_COLORS,
    tab: 'dem',
    tab_level: null,
    tooltip: 0,
    decimals: 2,
  },
  {
    id: 'dem_thh',
    title: 'UI_MAP_METRIC_DEM_THH',
    abbrev: '',
    range: [1794, 57490],
    high_is_good: 1,
    colors: DEM_COLORS,
    tab: 'dem',
    tab_level: null,
    tooltip: 0,
    decimals: 2,
  },
  {
    id: 'dem_popse',
    title: 'UI_MAP_METRIC_DEM_POPSE',
    abbrev: '',
    range: [598, 10218],
    high_is_good: 1,
    colors: DEM_COLORS,
    tab: 'dem',
    tab_level: null,
    tooltip: 0,
    decimals: 2,
  },
  {
    id: 'dem_popch',
    title: 'UI_MAP_METRIC_DEM_POPCH',
    abbrev: '',
    range: [2007, 28225],
    high_is_good: 1,
    colors: DEM_COLORS,
    tab: 'dem',
    tab_level: null,
    tooltip: 0,
    decimals: 2,
  },
]

export const CPAL_FEEDERS = [
  {
    id: 1,
    title: 'Adams',
  },
  {
    id: 2,
    title: 'Adamson',
  },
  {
    id: 23,
    title: 'Carter',
  },
  {
    id: 28,
    title: 'Conrad',
  },
  {
    id: 6,
    title: 'Hillcrest',
  },
  {
    id: 7,
    title: 'Jefferson',
  },
  {
    id: 8,
    title: 'Kimball',
  },
  {
    id: 9,
    title: 'Lincoln',
    desc: 'SCHOOL_PROSE_FEEDER_LINCOLN',
  },
  {
    id: 32,
    title: 'Madison',
  },
  {
    id: 5,
    title: 'Molina',
  },
  {
    id: 24,
    title: 'North Dallas',
  },
  {
    id: 12,
    title: 'Pinkston',
  },
  {
    id: 13,
    title: 'Roosevelt',
  },
  {
    id: 14,
    title: 'Samuell',
  },
  {
    id: 15,
    title: 'Seagoville',
  },
  {
    id: 25,
    title: 'Skyline',
  },
  {
    id: 16,
    title: 'SOC',
  },
  {
    id: 17,
    title: 'Spruce',
  },
  {
    id: 18,
    title: 'Sunset',
  },
  {
    id: 21,
    title: 'White',
  },
  {
    id: 380,
    title: 'Wilmer-Hutchins',
  },
  {
    id: 22,
    title: 'Wilson',
  },
]
