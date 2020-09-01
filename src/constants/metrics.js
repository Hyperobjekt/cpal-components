// import LANG from './en'

import { CRI_COLORS } from './colors'

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
    mean: 43.15873016,
  },
  {
    id: 'eci_weight',
    title: 'UI_MAP_METRIC_TITLE_ECON_INDEX',
    desc: 'UI_MAP_METRIC_DESC_ECON',
    abbrev: 'ECON',
    range: [0, 100],
    high_is_good: 1,
    colors: CRI_COLORS,
    tab: 'econ',
    tab_level: 0,
    tooltip: 1,
    decimals: 0,
    mean: 36.93121693,
  },
  {
    id: 'edi_weight',
    title: 'UI_MAP_METRIC_TITLE_EDU_INDEX',
    desc: 'UI_MAP_METRIC_DESC_EDU',
    abbrev: 'EDU',
    range: [0, 100],
    high_is_good: 1,
    colors: CRI_COLORS,
    tab: 'edu',
    tab_level: 0,
    tooltip: 1,
    decimals: 0,
    mean: 65.00529101,
  },
  {
    id: 'fi_weight',
    title: 'UI_MAP_METRIC_TITLE_FAM_INDEX',
    desc: 'UI_MAP_METRIC_DESC_FAM',
    abbrev: 'FAM',
    range: [0, 100],
    high_is_good: 1,
    colors: CRI_COLORS,
    tab: 'fam',
    tab_level: 0,
    tooltip: 1,
    decimals: 0,
    mean: 73.20634921,
  },
  {
    id: 'hi_weight',
    title: 'UI_MAP_METRIC_TITLE_HEAL_INDEX',
    desc: 'UI_MAP_METRIC_DESC_HEAL',
    abbrev: 'HEAL',
    range: [0, 100],
    high_is_good: 1,
    colors: CRI_COLORS,
    tab: 'hel',
    tab_level: 0,
    tooltip: 1,
    decimals: 0,
    mean: 33.36507937,
  },
  {
    id: 'ci_weight',
    title: 'UI_MAP_METRIC_TITLE_COMM_INDEX',
    desc: 'UI_MAP_METRIC_DESC_COMM',
    abbrev: 'COMM',
    range: [0, 100],
    high_is_good: 1,
    colors: CRI_COLORS,
    tab: 'comm',
    tab_level: 0,
    tooltip: 1,
    decimals: 0,
    mean: 58.38624339,
  },
  {
    id: 'comm_bbp',
    title: 'UI_MAP_METRIC_TITLE_COMM_BBP',
    abbrev: '',
    range: [0.426, 0.944],
    high_is_good: 1,
    colors: CRI_COLORS,
    tab: 'comm',
    tab_level: 1,
    tooltip: 0,
    decimals: 1,
    as_percent: 1,
    order: 12,
    mean: 0.702151315,
  },
  {
    id: 'comm_bvp',
    title: 'UI_MAP_METRIC_COMM_BVP',
    abbrev: '',
    range: [0.03, 0.25],
    high_is_good: 0,
    colors: CRI_COLORS,
    tab: 'comm',
    tab_level: 1,
    tooltip: 0,
    decimals: 1,
    as_percent: 1,
    order: 2,
    mean: 0.110147045,
  },
  {
    id: 'comm_cctrcap',
    title: 'UI_MAP_METRIC_COMM_CCTRCAP',
    abbrev: '',
    range: [0, 4.409107253],
    high_is_good: 1,
    colors: CRI_COLORS,
    tab: 'comm',
    tab_level: 1,
    tooltip: 0,
    decimals: 2,
    order: 9,
    mean: 0.583806165,
  },
  {
    id: 'comm_incarpct',
    title: 'UI_MAP_METRIC_COMM_INCARPCT',
    abbrev: '',
    range: [0.001, 0.027],
    high_is_good: 0,
    colors: CRI_COLORS,
    tab: 'comm',
    tab_level: 1,
    tooltip: 0,
    decimals: 1,
    as_percent: 1,
    order: 7,
    mean: 0.007068464,
  },
  {
    id: 'comm_juvcrimecap',
    title: 'UI_MAP_METRIC_COMM_JUVCRIMECAP',
    abbrev: '',
    range: [0, 3512.382],
    high_is_good: 0,
    colors: CRI_COLORS,
    tab: 'comm',
    tab_level: 1,
    tooltip: 0,
    decimals: 0,
    order: 8,
    mean: 265.3440108,
  },
  {
    id: 'comm_libcap',
    title: 'UI_MAP_METRIC_COMM_LIBCAP',
    abbrev: '',
    range: [0, 1.342207171],
    high_is_good: 1,
    colors: CRI_COLORS,
    tab: 'comm',
    tab_level: 1,
    tooltip: 0,
    decimals: 3,
    order: 10,
    mean: 0.239304636,
  },
  {
    id: 'comm_ltbvp',
    title: 'UI_MAP_METRIC_COMM_LTBVP',
    abbrev: '',
    range: [0.029, 0.226],
    high_is_good: 0,
    colors: CRI_COLORS,
    tab: 'comm',
    tab_level: 1,
    tooltip: 0,
    decimals: 1,
    as_percent: 1,
    order: 3,
    mean: 0.101979026,
  },
  {
    id: 'comm_ltrvp',
    title: 'UI_MAP_METRIC_COMM_LTRVP',
    abbrev: '',
    range: [0.003, 0.141],
    high_is_good: 0,
    colors: CRI_COLORS,
    tab: 'comm',
    tab_level: 1,
    tooltip: 0,
    decimals: 1,
    as_percent: 1,
    order: 4,
    mean: 0.023023024,
  },
  {
    id: 'comm_ocbp',
    title: 'UI_MAP_METRIC_COMM_OCBP',
    abbrev: '',
    range: [0.19, 0.328],
    high_is_good: 0,
    colors: CRI_COLORS,
    tab: 'comm',
    tab_level: 1,
    tooltip: 0,
    decimals: 1,
    as_percent: 1,
    order: 5,
    mean: 0.258023585,
  },
  {
    id: 'comm_parkcap',
    title: 'UI_MAP_METRIC_COMM_PARKCAP',
    abbrev: '',
    range: [0, 1.190866456],
    high_is_good: 1,
    colors: CRI_COLORS,
    tab: 'comm',
    tab_level: 1,
    tooltip: 0,
    decimals: 3,
    order: 11,
    mean: 0.157809687,
  },
  {
    id: 'comm_rcbp',
    title: 'UI_MAP_METRIC_COMM_RCBP',
    abbrev: '',
    range: [0.336, 0.584],
    high_is_good: 0,
    colors: CRI_COLORS,
    tab: 'comm',
    tab_level: 1,
    tooltip: 0,
    decimals: 1,
    as_percent: 1,
    order: 6,
    mean: 0.468919709,
  },
  {
    id: 'comm_rvp',
    title: 'UI_MAP_METRIC_COMM_RVP',
    abbrev: '',
    range: [0.005, 0.148],
    high_is_good: 0,
    colors: CRI_COLORS,
    tab: 'comm',
    tab_level: 1,
    tooltip: 0,
    decimals: 1,
    as_percent: 1,
    order: 3,
    mean: 0.026313575,
  },
  {
    id: 'comm_u18bbp',
    title: 'UI_MAP_METRIC_COMM_U18BBP',
    abbrev: '',
    range: [0.417, 0.981],
    high_is_good: 1,
    colors: CRI_COLORS,
    tab: 'comm',
    tab_level: 1,
    tooltip: 0,
    decimals: 1,
    as_percent: 1,
    order: 13,
    mean: 0.698269342,
  },
  {
    id: 'comm_evrate',
    title: 'UI_MAP_METRIC_COMM_EVRATE',
    abbrev: '',
    range: [6.986375153, 517.5018159],
    high_is_good: 0,
    colors: CRI_COLORS,
    tab: 'comm',
    tab_level: 1,
    tooltip: 0,
    decimals: 2,
    order: 1,
    mean: 171.2772017,
  },
  {
    id: 'econ_cpr',
    title: 'UI_MAP_METRIC_ECON_CPR',
    abbrev: '',
    range: [0.02360659218, 0.5110657644],
    high_is_good: 0,
    colors: CRI_COLORS,
    tab: 'econ',
    tab_level: 1,
    tooltip: 0,
    decimals: 1,
    as_percent: 1,
    order: 3,
    mean: 0.325030259,
  },
  {
    id: 'econ_fincap',
    title: 'UI_MAP_METRIC_ECON_FINCAP',
    abbrev: '',
    range: [0, 11.297],
    high_is_good: 1,
    colors: CRI_COLORS,
    tab: 'econ',
    tab_level: 1,
    tooltip: 0,
    decimals: 2,
    order: 9,
    mean: 1.924224345,
  },
  {
    id: 'econ_medinc',
    title: 'UI_MAP_METRIC_ECON_MEDINC',
    abbrev: '',
    range: [17201.90402, 81300.25703],
    high_is_good: 1,
    colors: CRI_COLORS,
    tab: 'econ',
    tab_level: 1,
    tooltip: 0,
    decimals: 0,
    is_currency: 1,
    order: 1,
    mean: 31245.51999,
  },
  {
    id: 'econ_paydaycap',
    title: 'UI_MAP_METRIC_ECON_PAYDAYCAP',
    abbrev: '',
    range: [0, 4.138],
    high_is_good: 0,
    colors: CRI_COLORS,
    tab: 'econ',
    tab_level: 1,
    tooltip: 0,
    decimals: 2,
    order: 10,
    mean: 1.453789022,
  },
  {
    id: 'econ_pctlwjobs',
    title: 'UI_MAP_METRIC_ECON_PCTLWJOBS',
    abbrev: '',
    range: [0.101, 0.359],
    high_is_good: 0,
    colors: CRI_COLORS,
    tab: 'econ',
    tab_level: 1,
    tooltip: 0,
    decimals: 1,
    as_percent: 1,
    order: 5,
    mean: 0.244134848,
  },
  {
    id: 'econ_pr',
    title: 'UI_MAP_METRIC_ECON_PR',
    abbrev: '',
    range: [0.038, 0.382],
    high_is_good: 0,
    colors: CRI_COLORS,
    tab: 'econ',
    tab_level: 1,
    tooltip: 0,
    decimals: 1,
    as_percent: 1,
    order: 2,
    mean: 0.22304028,
  },
  {
    id: 'econ_pyr',
    title: 'UI_MAP_METRIC_ECON_PYR',
    abbrev: '',
    range: [0.04, 0.581],
    high_is_good: 0,
    colors: CRI_COLORS,
    tab: 'econ',
    tab_level: 1,
    tooltip: 0,
    decimals: 1,
    as_percent: 1,
    order: 8,
    mean: 0.27608401,
  },
  {
    id: 'econ_ur',
    title: 'UI_MAP_METRIC_ECON_UR',
    abbrev: '',
    range: [0.02106888661, 0.1112855214],
    high_is_good: 0,
    colors: CRI_COLORS,
    tab: 'econ',
    tab_level: 1,
    tooltip: 0,
    decimals: 1,
    as_percent: 1,
    order: 7,
    mean: 0.058182314,
  },
  {
    id: 'edu_oostkids',
    title: 'UI_MAP_METRIC_EDU_OOSTKIDS',
    abbrev: '',
    range: [0, 4065.419759],
    high_is_good: 1,
    colors: CRI_COLORS,
    tab: 'edu',
    tab_level: 1,
    tooltip: 0,
    decimals: 0,
    order: 4,
    mean: 1267.921417,
  },
  {
    id: 'edu_perbach',
    title: 'UI_MAP_METRIC_EDU_PERBACH',
    abbrev: '',
    range: [0.024812673, 0.424107957],
    high_is_good: 1,
    colors: CRI_COLORS,
    tab: 'edu',
    tab_level: 1,
    tooltip: 0,
    decimals: 1,
    as_percent: 1,
    order: 1,
    mean: 0.146699211,
  },
  {
    id: 'edu_perearlyed',
    title: 'UI_MAP_METRIC_EDU_PEREARLYED',
    abbrev: '',
    range: [0.163, 0.704],
    high_is_good: 1,
    colors: CRI_COLORS,
    tab: 'edu',
    tab_level: 1,
    tooltip: 0,
    decimals: 1,
    as_percent: 1,
    order: 2,
    mean: 0.419375719,
  },
  {
    id: 'edu_qeckids',
    title: 'UI_MAP_METRIC_EDU_QECKIDS',
    abbrev: '',
    range: [0, 10.00381449],
    high_is_good: 1,
    colors: CRI_COLORS,
    tab: 'edu',
    tab_level: 1,
    tooltip: 0,
    decimals: 0,
    order: 3,
    mean: 0.802863804,
  },
  {
    id: 'econ_totjobs',
    title: 'UI_MAP_METRIC_ECON_TOTJOBS',
    abbrev: '',
    range: [1468, 209962],
    high_is_good: 1,
    colors: CRI_COLORS,
    tab: 'econ',
    tab_level: 1,
    tooltip: 0,
    decimals: 0,
    order: 4,
    mean: 27096.08995,
  },
  {
    id: 'fam_affcckids',
    title: 'UI_MAP_METRIC_FAM_AFFCCKIDS',
    abbrev: '',
    range: [0.950858557, 28.62102666],
    high_is_good: 1,
    colors: CRI_COLORS,
    tab: 'fam',
    tab_level: 1,
    tooltip: 0,
    decimals: 2,
    order: 3,
    mean: 8.3784329,
  },
  {
    id: 'fam_lcckids',
    title: 'UI_MAP_METRIC_FAM_LCCKIDS',
    abbrev: '',
    range: [1.220288152, 36.35139285],
    high_is_good: 1,
    colors: CRI_COLORS,
    tab: 'fam',
    tab_level: 1,
    tooltip: 0,
    decimals: 2,
    order: 2,
    mean: 13.97422226,
  },
  {
    id: 'fam_tphhpct',
    title: 'UI_MAP_METRIC_FAM_TPHHPCT',
    abbrev: '',
    range: [0.251, 0.875],
    high_is_good: 1,
    colors: CRI_COLORS,
    tab: 'fam',
    tab_level: 1,
    tooltip: 0,
    decimals: 1,
    as_percent: 1,
    order: 1,
    mean: 0.585913969,
  },
  {
    id: 'hel_bphigh',
    title: 'UI_MAP_METRIC_HEL_BPHIGH',
    abbrev: '',
    range: [1311.253, 5013.889],
    high_is_good: 0,
    colors: CRI_COLORS,
    tab: 'hel',
    tab_level: 1,
    tooltip: 0,
    decimals: 0,
    order: 12,
    mean: 3378.188761,
  },
  {
    id: 'hel_castthma',
    title: 'UI_MAP_METRIC_HEL_CASTTHMA',
    abbrev: '',
    range: [390.967, 1237.637],
    high_is_good: 0,
    colors: CRI_COLORS,
    tab: 'hel',
    tab_level: 1,
    tooltip: 0,
    decimals: 0,
    order: 13,
    mean: 937.4005199,
  },
  {
    id: 'hel_checkup',
    title: 'UI_MAP_METRIC_HEL_CHECKUP',
    abbrev: '',
    range: [3149.483, 7555.752],
    high_is_good: 1,
    colors: CRI_COLORS,
    tab: 'hel',
    tab_level: 1,
    tooltip: 0,
    decimals: 0,
    order: 9,
    mean: 6412.798045,
  },
  {
    id: 'hel_fruitsveggies',
    title: 'UI_MAP_METRIC_HEL_FRUITSVEGGIES',
    abbrev: '',
    range: [244.245, 534.967],
    high_is_good: 1,
    colors: CRI_COLORS,
    tab: 'hel',
    tab_level: 1,
    tooltip: 0,
    decimals: 0,
    is_currency: 1,
    order: 8,
    mean: 365.6789476,
  },
  {
    id: 'hel_le',
    title: 'UI_MAP_METRIC_HEL_LE',
    abbrev: '',
    range: [69.41595684, 82.49920843],
    high_is_good: 1,
    colors: CRI_COLORS,
    tab: 'hel',
    tab_level: 1,
    tooltip: 0,
    decimals: 0,
    order: 4,
    mean: 76.57082291,
  },
  {
    id: 'hel_mhlth',
    title: 'UI_MAP_METRIC_HEL_MHLTH',
    abbrev: '',
    range: [602.264, 1901.951],
    high_is_good: 0,
    colors: CRI_COLORS,
    tab: 'hel',
    tab_level: 1,
    tooltip: 0,
    decimals: 0,
    order: 10,
    mean: 1538.596681,
  },
  {
    id: 'hel_obesity',
    title: 'UI_MAP_METRIC_HEL_OBESITY',
    abbrev: '',
    range: [1449.195, 4738.889],
    high_is_good: 0,
    colors: CRI_COLORS,
    tab: 'hel',
    tab_level: 1,
    tooltip: 0,
    decimals: 0,
    order: 14,
    mean: 3613.137302,
  },
  {
    id: 'hel_perpri',
    title: 'UI_MAP_METRIC_HEL_PERPRI',
    abbrev: '',
    range: [0.258, 0.876],
    high_is_good: 1,
    colors: CRI_COLORS,
    tab: 'hel',
    tab_level: 1,
    tooltip: 0,
    decimals: 1,
    as_percent: 1,
    order: 2,
    mean: 0.456363656,
  },
  {
    id: 'hel_perpub',
    title: 'UI_MAP_METRIC_HEL_PERPUB',
    abbrev: '',
    range: [0.153, 0.496],
    high_is_good: 1,
    colors: CRI_COLORS,
    tab: 'hel',
    tab_level: 1,
    tooltip: 0,
    decimals: 1,
    as_percent: 1,
    order: 3,
    mean: 0.331760887,
  },
  {
    id: 'hel_perins',
    title: 'UI_MAP_METRIC_HEL_PERINS',
    abbrev: '',
    range: [0.5890289674, 0.955786156],
    high_is_good: 1,
    colors: CRI_COLORS,
    tab: 'hel',
    tab_level: 1,
    tooltip: 0,
    decimals: 1,
    as_percent: 1,
    order: 1,
    mean: 0.747930671,
  },
  {
    id: 'hel_pharmacap',
    title: 'UI_MAP_METRIC_HEL_PHARMACAP',
    abbrev: '',
    range: [0, 10.464],
    high_is_good: 1,
    colors: CRI_COLORS,
    tab: 'hel',
    tab_level: 1,
    tooltip: 0,
    decimals: 2,
    order: 6,
    mean: 2.460278439,
  },
  {
    id: 'hel_phlth',
    title: 'UI_MAP_METRIC_HEL_PHLTH',
    abbrev: '',
    range: [498.704, 2074.081],
    high_is_good: 0,
    colors: CRI_COLORS,
    tab: 'hel',
    tab_level: 1,
    tooltip: 0,
    decimals: 0,
    order: 11,
    mean: 1479.909257,
  },
  {
    id: 'hel_clincap',
    title: 'UI_MAP_METRIC_HEL_CLINCAP',
    abbrev: '',
    range: [0, 4.591794665],
    high_is_good: 1,
    colors: CRI_COLORS,
    tab: 'hel',
    tab_level: 1,
    tooltip: 0,
    decimals: 2,
    order: 5,
    mean: 0.579628637,
  },
  {
    id: 'hel_groccap',
    title: 'UI_MAP_METRIC_HEL_GROCCAP',
    abbrev: '',
    range: [0, 2.267815118],
    high_is_good: 1,
    colors: CRI_COLORS,
    tab: 'hel',
    tab_level: 1,
    tooltip: 0,
    decimals: 2,
    order: 7,
    mean: 1.00935284,
  },
  {
    id: 'dem_totp',
    title: 'UI_MAP_METRIC_DEM_TOTP',
    abbrev: '',
    range: [6529, 105444],
    high_is_good: 1,
    colors: CRI_COLORS,
    tab: 'dem',
    tab_level: null,
    tooltip: 0,
    decimals: 2,
    mean: 55152.98942,
  },
  // {
  //   id: 'dem_popwh',
  //   title: 'UI_MAP_METRIC_DEM_POPWH',
  //   abbrev: '',
  //   range: [2562, 84630],
  //   high_is_good: 1,
  //   colors: DEM_COLORS,
  //   tab: 'dem',
  //   tab_level: null,
  //   tooltip: 0,
  //   decimals: 2,
  //   mean: 37928.41799,
  // },
  // {
  //   id: 'dem_popbl',
  //   title: 'UI_MAP_METRIC_DEM_POPBL',
  //   abbrev: '',
  //   range: [925, 31423],
  //   high_is_good: 1,
  //   colors: DEM_COLORS,
  //   tab: 'dem',
  //   tab_level: null,
  //   tooltip: 0,
  //   decimals: 2,
  //   mean: 11745.65079,
  // },
  // {
  //   id: 'dem_popas',
  //   title: 'UI_MAP_METRIC_DEM_POPAS',
  //   abbrev: '',
  //   range: [0, 6489],
  //   high_is_good: 1,
  //   colors: DEM_COLORS,
  //   tab: 'dem',
  //   tab_level: null,
  //   tooltip: 0,
  //   decimals: 2,
  //   mean: 1135.391534,
  // },
  // {
  //   id: 'dem_pophi',
  //   title: 'UI_MAP_METRIC_DEM_POPHI',
  //   abbrev: '',
  //   range: [2112, 73920],
  //   high_is_good: 1,
  //   colors: DEM_COLORS,
  //   tab: 'dem',
  //   tab_level: null,
  //   tooltip: 0,
  //   decimals: 2,
  //   mean: 27635.5873,
  // },
  // {
  //   id: 'dem_popm',
  //   title: 'UI_MAP_METRIC_DEM_POPM',
  //   abbrev: '',
  //   range: [3313, 54739],
  //   high_is_good: 1,
  //   colors: DEM_COLORS,
  //   tab: 'dem',
  //   tab_level: null,
  //   tooltip: 0,
  //   decimals: 2,
  //   mean: 27478.22222,
  // },
  // {
  //   id: 'dem_popf',
  //   title: 'UI_MAP_METRIC_DEM_POPF',
  //   abbrev: '',
  //   range: [3218, 50713],
  //   high_is_good: 1,
  //   colors: DEM_COLORS,
  //   tab: 'dem',
  //   tab_level: null,
  //   tooltip: 0,
  //   decimals: 2,
  //   mean: 27667.21693,
  // },
  {
    id: 'dem_thh',
    title: 'UI_MAP_METRIC_DEM_THH',
    abbrev: '',
    range: [1794, 57490],
    high_is_good: 1,
    colors: CRI_COLORS,
    tab: 'dem',
    tab_level: null,
    tooltip: 0,
    decimals: 2,
    mean: 19720.63492,
  },
  // {
  //   id: 'dem_popse',
  //   title: 'UI_MAP_METRIC_DEM_POPSE',
  //   abbrev: '',
  //   range: [598, 10218],
  //   high_is_good: 1,
  //   colors: DEM_COLORS,
  //   tab: 'dem',
  //   tab_level: null,
  //   tooltip: 0,
  //   decimals: 2,
  //   mean: 5556.809524,
  // },
  // {
  //   id: 'dem_popch',
  //   title: 'UI_MAP_METRIC_DEM_POPCH',
  //   abbrev: '',
  //   range: [2007, 28225],
  //   high_is_good: 1,
  //   colors: DEM_COLORS,
  //   tab: 'dem',
  //   tab_level: null,
  //   tooltip: 0,
  //   decimals: 2,
  //   mean: 14776.25926,
  // },
  {
    id: 'dem_perwh',
    title: 'UI_MAP_METRIC_DEM_PERWH',
    abbrev: '',
    range: [0, 100],
    high_is_good: 1,
    colors: CRI_COLORS,
    tab: 'dem',
    tab_level: null,
    tooltip: 0,
    decimals: 2,
    mean: 0.664463765,
  },
  {
    id: 'dem_perbl',
    title: 'UI_MAP_METRIC_DEM_PERBL',
    abbrev: '',
    range: [0, 100],
    high_is_good: 1,
    colors: CRI_COLORS,
    tab: 'dem',
    tab_level: null,
    tooltip: 0,
    decimals: 2,
    mean: 0.240555261,
  },
  {
    id: 'dem_peras',
    title: 'UI_MAP_METRIC_DEM_PERAS',
    abbrev: '',
    range: [0, 100],
    high_is_good: 1,
    colors: CRI_COLORS,
    tab: 'dem',
    tab_level: null,
    tooltip: 0,
    decimals: 2,
    mean: 0.01831509,
  },
  {
    id: 'dem_perhi',
    title: 'UI_MAP_METRIC_DEM_PERHI',
    abbrev: '',
    range: [0, 100],
    high_is_good: 1,
    colors: CRI_COLORS,
    tab: 'dem',
    tab_level: null,
    tooltip: 0,
    decimals: 2,
    mean: 0.491636566,
  },
  {
    id: 'dem_perm',
    title: 'UI_MAP_METRIC_DEM_PERM',
    abbrev: '',
    range: [0, 100],
    high_is_good: 1,
    colors: CRI_COLORS,
    tab: 'dem',
    tab_level: null,
    tooltip: 0,
    decimals: 2,
    mean: 0.496209014,
  },
  {
    id: 'dem_perf',
    title: 'UI_MAP_METRIC_DEM_PERF',
    abbrev: '',
    range: [0, 100],
    high_is_good: 1,
    colors: CRI_COLORS,
    tab: 'dem',
    tab_level: null,
    tooltip: 0,
    decimals: 2,
    mean: 0.503663063,
  },
  {
    id: 'dem_perse',
    title: 'UI_MAP_METRIC_DEM_PERSE',
    abbrev: '',
    range: [0, 100],
    high_is_good: 1,
    colors: CRI_COLORS,
    tab: 'dem',
    tab_level: null,
    tooltip: 0,
    decimals: 2,
    mean: 0.101887108,
  },
  {
    id: 'dem_perch',
    title: 'UI_MAP_METRIC_DEM_PERCH',
    abbrev: '',
    range: [0, 100],
    high_is_good: 1,
    colors: CRI_COLORS,
    tab: 'dem',
    tab_level: null,
    tooltip: 0,
    decimals: 2,
    mean: 0.27353863,
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
