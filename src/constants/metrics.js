import LANG from './en'
import {
  CRI_COLORS,
  ECON_COLORS,
  EDU_COLORS,
  FAM_COLORS,
  HEL_COLORS,
  COMM_COLORS,
} from './colors'

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

export const CPAL_METRICS = [
  {
    id: 'cri',
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
    id: 'econ_index',
    title: 'UI_MAP_METRIC_TITLE_ECON_INDEX',
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
    id: 'edu_index',
    title: 'UI_MAP_METRIC_TITLE_EDU_INDEX',
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
    id: 'fam_index',
    title: 'UI_MAP_METRIC_TITLE_FAM_INDEX',
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
    id: 'health_index',
    title: 'UI_MAP_METRIC_TITLE_HEAL_INDEX',
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
    id: 'com_index',
    title: 'UI_MAP_METRIC_TITLE_COMM_INDEX',
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
    decimals: 3,
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
    decimals: 2,
  },
  {
    id: 'comm_cctrcap',
    title: 'UI_MAP_METRIC_COMM_CCTRCAP',
    abbrev: '',
    range: [0, 2.806],
    high_is_good: 1,
    colors: COMM_COLORS,
    tab: 'comm',
    tab_level: 1,
    tooltip: 0,
    decimals: 3,
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
    decimals: 3,
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
  },
  {
    id: 'comm_libcap',
    title: 'UI_MAP_METRIC_COMM_LIBCAP',
    abbrev: '',
    range: [0, 1.647],
    high_is_good: 1,
    colors: COMM_COLORS,
    tab: 'comm',
    tab_level: 1,
    tooltip: 0,
    decimals: 3,
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
    decimals: 3,
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
    decimals: 3,
  },
  {
    id: 'comm_ocb',
    title: 'UI_MAP_METRIC_COMM_OCB',
    abbrev: '',
    range: [283.908, 4782.808],
    high_is_good: 0,
    colors: COMM_COLORS,
    tab: 'comm',
    tab_level: 1,
    tooltip: 0,
    decimals: 0,
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
    decimals: 3,
  },
  {
    id: 'comm_parkcap',
    title: 'UI_MAP_METRIC_COMM_PARKCAP',
    abbrev: '',
    range: [0.009, 1.031],
    high_is_good: 1,
    colors: COMM_COLORS,
    tab: 'comm',
    tab_level: 1,
    tooltip: 0,
    decimals: 3,
  },
  {
    id: 'comm_rcb',
    title: 'UI_MAP_METRIC_COMM_RCB',
    abbrev: '',
    range: [242.631, 14178.655],
    high_is_good: 0,
    colors: COMM_COLORS,
    tab: 'comm',
    tab_level: 1,
    tooltip: 0,
    decimals: 0,
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
    decimals: 3,
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
    decimals: 3,
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
    decimals: 3,
  },
  {
    id: 'econ_cpr',
    title: 'UI_MAP_METRIC_ECON_CPR',
    abbrev: '',
    range: [1.957, 42.361],
    high_is_good: 0,
    colors: ECON_COLORS,
    tab: 'econ',
    tab_level: 1,
    tooltip: 0,
    decimals: 1,
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
  },
  {
    id: 'econ_medinc',
    title: 'UI_MAP_METRIC_ECON_MEDINC',
    abbrev: '',
    range: [14304.652, 1650671.195],
    high_is_good: 1,
    colors: ECON_COLORS,
    tab: 'econ',
    tab_level: 1,
    tooltip: 0,
    decimals: 0,
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
  },
  {
    id: 'econ_pctlwjobs',
    title: 'UI_MAP_METRIC_ECON_PCTLWJOBS',
    abbrev: '',
    range: [0.101, 0.359],
    high_is_good: 0,
    colors: ECON_COLORS,
    tab: 'econ',
    tab_level: 1,
    tooltip: 0,
    decimals: 3,
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
    decimals: 2,
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
    decimals: 3,
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
    decimals: 3,
  },
  {
    id: 'econ_ur',
    title: 'UI_MAP_METRIC_ECON_UR',
    abbrev: '',
    range: [0.017, 0.084],
    high_is_good: 0,
    colors: ECON_COLORS,
    tab: 'econ',
    tab_level: 1,
    tooltip: 0,
    decimals: 3,
  },
  {
    id: 'edu_oostkids',
    title: 'UI_MAP_METRIC_EDU_OOSTKIDS',
    abbrev: '',
    range: [0, 0.407],
    high_is_good: 1,
    colors: EDU_COLORS,
    tab: 'edu',
    tab_level: 1,
    tooltip: 0,
    decimals: 3,
  },
  {
    id: 'edu_perbach',
    title: 'UI_MAP_METRIC_EDU_PERBACH',
    abbrev: '',
    range: [0.061, 1.178],
    high_is_good: 1,
    colors: EDU_COLORS,
    tab: 'edu',
    tab_level: 1,
    tooltip: 0,
    decimals: 3,
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
    decimals: 3,
  },
  {
    id: 'edu_qeckids',
    title: 'UI_MAP_METRIC_EDU_QECKIDS',
    abbrev: '',
    range: [0, 0.001],
    high_is_good: 1,
    colors: EDU_COLORS,
    tab: 'edu',
    tab_level: 1,
    tooltip: 0,
    decimals: 3,
  },
  {
    id: 'fam_affcckids',
    title: 'UI_MAP_METRIC_FAM_AFFCCKIDS',
    abbrev: '',
    range: [0, 0.003],
    high_is_good: 1,
    colors: FAM_COLORS,
    tab: 'fam',
    tab_level: 1,
    tooltip: 0,
    decimals: 3,
  },
  {
    id: 'fam_lcckids',
    title: 'UI_MAP_METRIC_FAM_LCCKIDS',
    abbrev: '',
    range: [0, 0.004],
    high_is_good: 1,
    colors: FAM_COLORS,
    tab: 'fam',
    tab_level: 1,
    tooltip: 0,
    decimals: 3,
  },
  {
    id: 'fam_tphh',
    title: 'UI_MAP_METRIC_FAM_TPHH',
    abbrev: '',
    range: [329.045, 6142.345],
    high_is_good: 1,
    colors: FAM_COLORS,
    tab: 'fam',
    tab_level: 1,
    tooltip: 0,
    decimals: 0,
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
    decimals: 3,
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
    decimals: 3,
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
    decimals: 3,
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
  },
  {
    id: 'hel_sleep',
    title: 'UI_MAP_METRIC_HEL_SLEEP',
    abbrev: '',
    range: [1476.828, 4298.227],
    high_is_good: 0,
    colors: HEL_COLORS,
    tab: 'hel',
    tab_level: 1,
    tooltip: 0,
    decimals: 0,
  },
  {
    id: 'hel_stroke',
    title: 'UI_MAP_METRIC_HEL_STROKE',
    abbrev: '',
    range: [1476.828, 4298.227],
    high_is_good: 0,
    colors: HEL_COLORS,
    tab: 'hel',
    tab_level: 1,
    tooltip: 0,
    decimals: 0,
  },

  // Old entries below

  // {
  //   id: 'comm_crimedensity',
  //   title: 'UI_MAP_METRIC_TITLE_COMM_CRIMEDENSITY',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: COMM_COLORS,
  //   tab: 'comm',
  //   tab_level: 1,
  //   tooltip: 0,
  // },
  // {
  //   id: 'comm_crime',
  //   title: 'UI_MAP_METRIC_TITLE_COMM_CRIME',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: COMM_COLORS,
  //   tab: 'comm',
  //   tab_level: 1,
  //   tooltip: 0,
  // },
  // {
  //   id: 'comm_church',
  //   title: 'UI_MAP_METRIC_TITLE_COMM_CHURCH',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: COMM_COLORS,
  //   tab: 'comm',
  //   tab_level: 1,
  //   tooltip: 0,
  // },
  // {
  //   id: 'comm_churchdensity',
  //   title: 'UI_MAP_METRIC_COMM_CHURCHDENSITY',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: COMM_COLORS,
  //   tab: 'comm',
  //   tab_level: 1,
  //   tooltip: 0,
  // },
  // {
  //   id: 'comm_ev1',
  //   title: 'UI_MAP_METRIC_COMM_EV1',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: COMM_COLORS,
  //   tab: 'comm',
  //   tab_level: 1,
  //   tooltip: 0,
  // },
  // {
  //   id: 'comm_ev2',
  //   title: 'UI_MAP_METRIC_COMM_EV2',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: COMM_COLORS,
  //   tab: 'comm',
  //   tab_level: 1,
  //   tooltip: 0,
  // },
  // {
  //   id: 'comm_ev3',
  //   title: 'UI_MAP_METRIC_COMM_EV3',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: COMM_COLORS,
  //   tab: 'comm',
  //   tab_level: 1,
  //   tooltip: 0,
  // },
  // {
  //   id: 'comm_ev4',
  //   title: 'UI_MAP_METRIC_COMM_EV4',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: COMM_COLORS,
  //   tab: 'comm',
  //   tab_level: 1,
  //   tooltip: 0,
  // },
  // {
  //   id: 'comm_rvp',
  //   title: 'UI_MAP_METRIC_COMM_RVP',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: COMM_COLORS,
  //   tab: 'comm',
  //   tab_level: 1,
  //   tooltip: 0,
  // },
  //
  // {
  //   id: 'comm_ltrvp',
  //   title: 'UI_MAP_METRIC_COMM_LTVP',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: COMM_COLORS,
  //   tab: 'comm',
  //   tab_level: 1,
  //   tooltip: 0,
  // },
  // {
  //   id: 'comm_ltbvp',
  //   title: 'UI_MAP_METRIC_COMM_LTBVP',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: COMM_COLORS,
  //   tab: 'comm',
  //   tab_level: 1,
  //   tooltip: 0,
  // },
  // {
  //   id: 'comm_nsres',
  //   title: 'UI_MAP_METRIC_COMM_NSRES',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: COMM_COLORS,
  //   tab: 'comm',
  //   tab_level: 1,
  //   tooltip: 0,
  // },
  // {
  //   id: 'comm_nsbus',
  //   title: 'UI_MAP_METRIC_COMM_NSBUS',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: COMM_COLORS,
  //   tab: 'comm',
  //   tab_level: 1,
  //   tooltip: 0,
  // },
  // {
  //   id: 'comm_nsreslt',
  //   title: 'UI_MAP_METRIC_COMM_NSRESLT',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: COMM_COLORS,
  //   tab: 'comm',
  //   tab_level: 1,
  //   tooltip: 0,
  // },
  // {
  //   id: 'comm_nsbuslt',
  //   title: 'UI_MAP_METRIC_COMM_NSBUSLT',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: COMM_COLORS,
  //   tab: 'comm',
  //   tab_level: 1,
  //   tooltip: 0,
  // },
  // {
  //   id: 'comm_thh',
  //   title: 'UI_MAP_METRIC_COMM_THH',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: COMM_COLORS,
  //   tab: 'comm',
  //   tab_level: 1,
  //   tooltip: 0,
  // },
  // {
  //   id: 'comm_oohh',
  //   title: 'UI_MAP_METRIC_COMM_OOHH',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: COMM_COLORS,
  //   tab: 'comm',
  //   tab_level: 1,
  //   tooltip: 0,
  // },
  // {
  //   id: 'comm_rohh',
  //   title: 'UI_MAP_METRIC_COMM_ROHH',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: COMM_COLORS,
  //   tab: 'comm',
  //   tab_level: 1,
  //   tooltip: 0,
  // },
  // {
  //   id: 'comm_ocb',
  //   title: 'UI_MAP_METRIC_COMM_OCB',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: COMM_COLORS,
  //   tab: 'comm',
  //   tab_level: 1,
  //   tooltip: 0,
  // },
  // {
  //   id: 'comm_rcb',
  //   title: 'UI_MAP_METRIC_COMM_RCB',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: COMM_COLORS,
  //   tab: 'comm',
  //   tab_level: 1,
  //   tooltip: 0,
  // },
  // {
  //   id: 'comm_ocbp',
  //   title: 'UI_MAP_METRIC_COMM_OCBP',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: COMM_COLORS,
  //   tab: 'comm',
  //   tab_level: 1,
  // },
  // {
  //   id: 'comm_rcbp',
  //   title: 'UI_MAP_METRIC_COMM_RCBP',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: COMM_COLORS,
  //   tab: 'comm',
  //   tab_level: 1,
  // },
  // {
  //   id: 'comm_owncb_pct',
  //   title: 'UI_MAP_METRIC_COMM_OWNCB_PCT',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: COMM_COLORS,
  //   tab: 'comm',
  //   tab_level: 1,
  // },
  // {
  //   id: 'comm_rentcb_pct',
  //   title: 'UI_MAP_METRIC_COMM_RENTCB_PCT',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: COMM_COLORS,
  //   tab: 'comm',
  //   tab_level: 1,
  // },
  // {
  //   id: 'comm_aduincar_denom',
  //   title: 'UI_MAP_METRIC_COMM_ADUINCAR_DENOM',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: COMM_COLORS,
  //   tab: 'comm',
  //   tab_level: 1,
  // },
  // {
  //   id: 'comm_aduincarct',
  //   title: 'UI_MAP_METRIC_COMM_ADUINCARCT',
  //   abbrev: '',
  //   range: [13, 607],
  //   colors: COMM_COLORS,
  //   tab: 'comm',
  //   tab_level: 1,
  // },
  // {
  //   id: 'comm_adupop',
  //   title: 'UI_MAP_METRIC_COMM_ADUINCARCT',
  //   abbrev: '',
  //   range: [13, 607],
  //   colors: COMM_COLORS,
  //   tab: 'comm',
  //   tab_level: 1,
  // },
  // {
  //   id: 'comm_incarpct',
  //   title: 'UI_MAP_METRIC_COMM_INCARPCT',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: COMM_COLORS,
  //   tab: 'comm',
  //   tab_level: 1,
  // },
  // {
  //   id: 'comm_pctvoip',
  //   title: 'UI_MAP_METRIC_COMM_PCTVOIP',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: COMM_COLORS,
  //   tab: 'comm',
  //   tab_level: 1,
  // },
  // {
  //   id: 'comm_pctwifi',
  //   title: 'UI_MAP_METRIC_COMM_PCTWIFI',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: COMM_COLORS,
  //   tab: 'comm',
  //   tab_level: 1,
  // },
  // {
  //   id: 'econ_adupop',
  //   title: 'UI_MAP_METRIC_ECON_ADUPOP',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: ECON_COLORS,
  //   tab: 'econ',
  //   tab_level: 1,
  // },
  // {
  //   id: 'econ_unem',
  //   title: 'UI_MAP_METRIC_ECON_UNEM',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: ECON_COLORS,
  //   tab: 'econ',
  //   tab_level: 1,
  // },
  // {
  //   id: 'econ_juvpop',
  //   title: 'UI_MAP_METRIC_ECON_JUVPOP',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: ECON_COLORS,
  //   tab: 'econ',
  //   tab_level: 1,
  // },
  // {
  //   id: 'econ_juvunem',
  //   title: 'UI_MAP_METRIC_ECON_JUVUNEM',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: ECON_COLORS,
  //   tab: 'econ',
  //   tab_level: 1,
  // },
  // {
  //   id: 'econ_unemppct',
  //   title: 'UI_MAP_METRIC_ECON_UNEMPPCT',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: ECON_COLORS,
  //   tab: 'econ',
  //   tab_level: 1,
  // },
  // {
  //   id: 'econ_juvunemppct',
  //   title: 'UI_MAP_METRIC_ECON_JUVUNEMPPCT',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: ECON_COLORS,
  //   tab: 'econ',
  //   tab_level: 1,
  // },
  // {
  //   id: 'econ_medinc',
  //   title: 'UI_MAP_METRIC_ECON_MEDINC',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: ECON_COLORS,
  //   tab: 'econ',
  //   tab_level: 1,
  // },
  // {
  //   id: 'econ_jobs17',
  //   title: 'UI_MAP_METRIC_ECON_JOBS17',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: ECON_COLORS,
  //   tab: 'econ',
  //   tab_level: 1,
  // },
  // {
  //   id: 'econ_banks',
  //   title: 'UI_MAP_METRIC_ECON_BANKS',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: ECON_COLORS,
  //   tab: 'econ',
  //   tab_level: 1,
  // },
  // {
  //   id: 'econ_cu',
  //   title: 'UI_MAP_METRIC_ECON_CU',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: ECON_COLORS,
  //   tab: 'econ',
  //   tab_level: 1,
  // },
  // {
  //   id: 'econ_fin',
  //   title: 'UI_MAP_METRIC_ECON_FIN',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: ECON_COLORS,
  //   tab: 'econ',
  //   tab_level: 1,
  // },
  // {
  //   id: 'econ_payday',
  //   title: 'UI_MAP_METRIC_ECON_PAYDAY',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: ECON_COLORS,
  //   tab: 'econ',
  //   tab_level: 1,
  // },
  // {
  //   id: 'econ_pop',
  //   title: 'UI_MAP_METRIC_ECON_POP',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: ECON_COLORS,
  //   tab: 'econ',
  //   tab_level: 1,
  // },
  // {
  //   id: 'econ_belpov',
  //   title: 'UI_MAP_METRIC_ECON_BELPOV',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: ECON_COLORS,
  //   tab: 'econ',
  //   tab_level: 1,
  // },
  // {
  //   id: 'econ_kids',
  //   title: 'UI_MAP_METRIC_ECON_KIDS',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: ECON_COLORS,
  //   tab: 'econ',
  //   tab_level: 1,
  // },
  // {
  //   id: 'econ_cbp',
  //   title: 'UI_MAP_METRIC_ECON_CBP',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: ECON_COLORS,
  //   tab: 'econ',
  //   tab_level: 1,
  // },
  // {
  //   id: 'econ_u5',
  //   title: 'UI_MAP_METRIC_ECON_U5',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: ECON_COLORS,
  //   tab: 'econ',
  //   tab_level: 1,
  // },
  // {
  //   id: 'econ_u5bp',
  //   title: 'UI_MAP_METRIC_ECON_U5BP',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: ECON_COLORS,
  //   tab: 'econ',
  //   tab_level: 1,
  // },
  // {
  //   id: 'econ_5t17',
  //   title: 'UI_MAP_METRIC_ECON_5T17',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: ECON_COLORS,
  //   tab: 'econ',
  //   tab_level: 1,
  // },
  // {
  //   id: 'econ_5t17bp',
  //   title: 'UI_MAP_METRIC_ECON_5T17BP',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: ECON_COLORS,
  //   tab: 'econ',
  //   tab_level: 1,
  // },
  // {
  //   id: 'econ_bppct',
  //   title: 'UI_MAP_METRIC_ECON_BPPCT',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: ECON_COLORS,
  //   tab: 'econ',
  //   tab_level: 1,
  // },
  // {
  //   id: 'econ_cpr',
  //   title: 'UI_MAP_METRIC_ECON_CPR',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: ECON_COLORS,
  //   tab: 'econ',
  //   tab_level: 1,
  // },
  // {
  //   id: 'econ_u5rbp',
  //   title: 'UI_MAP_METRIC_ECON_U5RBP',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: ECON_COLORS,
  //   tab: 'econ',
  //   tab_level: 1,
  // },
  // {
  //   id: 'econ_5t17rbp',
  //   title: 'UI_MAP_METRIC_ECON_5T17RBP',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: ECON_COLORS,
  //   tab: 'econ',
  //   tab_level: 1,
  // },
  // {
  //   id: 'econ_povertyrate',
  //   title: 'UI_MAP_METRIC_ECON_POVERTYRATE',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: ECON_COLORS,
  //   tab: 'econ',
  //   tab_level: 1,
  // },
  // {
  //   id: 'econ_cpr2',
  //   title: 'UI_MAP_METRIC_ECON_CPR2',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: ECON_COLORS,
  //   tab: 'econ',
  //   tab_level: 1,
  // },
  // {
  //   id: 'econ_u5_povrate',
  //   title: 'UI_MAP_METRIC_ECON_U5_POVRATE',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: ECON_COLORS,
  //   tab: 'econ',
  //   tab_level: 1,
  // },
  // {
  //   id: 'econ_5t17_povrate',
  //   title: 'UI_MAP_METRIC_ECON_ECON_5T17_POVRATE',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: ECON_COLORS,
  //   tab: 'econ',
  //   tab_level: 1,
  // },
  // {
  //   id: 'fam_hhc',
  //   title: 'UI_MAP_METRIC_FAM_HHC',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: FAM_COLORS,
  //   tab: 'fam',
  //   tab_level: 1,
  // },
  // {
  //   id: 'fam_hhcfh',
  //   title: 'UI_MAP_METRIC_FAM_HHCFH',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: FAM_COLORS,
  //   tab: 'fam',
  //   tab_level: 1,
  // },
  // {
  //   id: 'fam_hhcmh',
  //   title: 'UI_MAP_METRIC_FAM_HHCMH',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: FAM_COLORS,
  //   tab: 'fam',
  //   tab_level: 1,
  // },
  // {
  //   id: 'fam_lcc',
  //   title: 'UI_MAP_METRIC_FAM_LCC',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: FAM_COLORS,
  //   tab: 'fam',
  //   tab_level: 1,
  // },
  // {
  //   id: 'fam_tphh',
  //   title: 'UI_MAP_METRIC_FAM_TPHH',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: FAM_COLORS,
  //   tab: 'fam',
  //   tab_level: 1,
  // },
  // {
  //   id: 'fam_tphh_pct',
  //   title: 'UI_MAP_METRIC_FAM_TPHH_PCT',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: FAM_COLORS,
  //   tab: 'fam',
  //   tab_level: 1,
  // },
  // {
  //   id: 'edu_bach',
  //   title: 'UI_MAP_METRIC_EDU_BACH',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: EDU_COLORS,
  //   tab: 'edu',
  //   tab_level: 1,
  // },
  // {
  //   id: 'edu_k34',
  //   title: 'UI_MAP_METRIC_EDU_K34',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: EDU_COLORS,
  //   tab: 'edu',
  //   tab_level: 1,
  // },
  // {
  //   id: 'edu_k34es',
  //   title: 'UI_MAP_METRIC_EDU_K34ES',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: EDU_COLORS,
  //   tab: 'edu',
  //   tab_level: 1,
  // },
  // {
  //   id: 'edu_oostcap',
  //   title: 'UI_MAP_METRIC_EDU_OOSTCAP',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: EDU_COLORS,
  //   tab: 'edu',
  //   tab_level: 1,
  // },
  // {
  //   id: 'edu_oostcapmean',
  //   title: 'UI_MAP_METRIC_EDU_OOSTCAPMEAN',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: EDU_COLORS,
  //   tab: 'edu',
  //   tab_level: 1,
  // },
  // {
  //   id: 'edu_oostct',
  //   title: 'UI_MAP_METRIC_EDU_OOSTCT',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: EDU_COLORS,
  //   tab: 'edu',
  //   tab_level: 1,
  // },
  // {
  //   id: 'edu_perbach',
  //   title: 'UI_MAP_METRIC_EDU_PERBACH',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: EDU_COLORS,
  //   tab: 'edu',
  //   tab_level: 1,
  // },
  // {
  //   id: 'edu_perearlyed',
  //   title: 'UI_MAP_METRIC_EDU_PEREARLYED',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: EDU_COLORS,
  //   tab: 'edu',
  //   tab_level: 1,
  // },
  // {
  //   id: 'edu_popadu',
  //   title: 'UI_MAP_METRIC_ECON_EDU_POPADU',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: EDU_COLORS,
  //   tab: 'edu',
  //   tab_level: 1,
  // },
  // {
  //   id: 'hel_clin',
  //   title: 'UI_MAP_METRIC_HEL_CLIN',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: HEAL_COLORS,
  //   tab: 'hel',
  //   tab_level: 1,
  // },
  // {
  //   id: 'hel_fruitavg',
  //   title: 'UI_MAP_METRIC_HEL_FRUITAVG',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: HEAL_COLORS,
  //   tab: 'hel',
  //   tab_level: 1,
  // },
  // {
  //   id: 'hel_groc',
  //   title: 'UI_MAP_METRIC_HEL_GROC',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: HEAL_COLORS,
  //   tab: 'hel',
  //   tab_level: 1,
  // },
  // {
  //   id: 'hel_inspop',
  //   title: 'UI_MAP_METRIC_HEL_INSPOP',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: HEAL_COLORS,
  //   tab: 'hel',
  //   tab_level: 1,
  // },
  // {
  //   id: 'hel_le',
  //   title: 'UI_MAP_METRIC_HEL_LE',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: HEAL_COLORS,
  //   tab: 'hel',
  //   tab_level: 1,
  // },
  // {
  //   id: 'hel_perins',
  //   title: 'UI_MAP_METRIC_HEL_PERINS',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: HEAL_COLORS,
  //   tab: 'hel',
  //   tab_level: 1,
  // },
  // {
  //   id: 'hel_pharm',
  //   title: 'UI_MAP_METRIC_HEL_PHARM',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: HEAL_COLORS,
  //   tab: 'hel',
  //   tab_level: 1,
  // },
  // {
  //   id: 'hel_unins',
  //   title: 'UI_MAP_METRIC_HEL_UNINS',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: HEAL_COLORS,
  //   tab: 'hel',
  //   tab_level: 1,
  // },
  // {
  //   id: 'hel_vegavg',
  //   title: 'UI_MAP_METRIC_HEL_VEGAVG',
  //   abbrev: '',
  //   range: [0, 100],
  //   colors: HEAL_COLORS,
  //   tab: 'hel',
  //   tab_level: 1,
  // },
]

/**
 * Data metrics in the SEDA data set
 */
export const METRICS = [
  {
    id: 'avg',
    label: LANG['LABEL_AVG'],
    range: {
      'map_*_gap': [-6, 6],
      map_counties: [-3, 3],
      map_districts: [-3.5, 3.5],
      map_schools: [-5, 5],
      '*_counties_np': [-4, 3],
      '*_counties_wh': [-1.5, 4.5],
      '*_districts_wh': [-1.5, 5],
      '*_*_gap': [-0.5, 5],
      '*_counties_b': [-4, 2],
      '*_counties_w': [-4, 4],
      '*_counties_a': [-4, 5],
      '*_counties': [-4.5, 2.5],

      '*_districts_b': [-4, 3],
      '*_districts_w': [-4, 4],
      '*_districts_a': [-4, 5],
      '*_districts': [-4.5, 4.5],
      '*_schools': [-8, 7],
    },
    map: true,
    scatterplot: true,
  },
  {
    id: 'cri',
    label: LANG['LABEL_AVG'],
    range: {
      'map_*_gap': [-6, 6],
      map_counties: [-3, 3],
      map_districts: [-3.5, 3.5],
      map_schools: [0, 100],
      '*_counties_np': [-4, 3],
      '*_counties_wh': [-1.5, 4.5],
      '*_districts_wh': [-1.5, 5],
      '*_*_gap': [-0.5, 5],
      '*_counties_b': [-4, 2],
      '*_counties_w': [-4, 4],
      '*_counties_a': [-4, 5],
      '*_counties': [-4.5, 2.5],

      '*_districts_b': [-4, 3],
      '*_districts_w': [-4, 4],
      '*_districts_a': [-4, 5],
      '*_districts': [-4.5, 4.5],
      '*_schools': [-8, 7],
    },
    map: true,
    scatterplot: false,
  },
  {
    id: 'grd',
    label: LANG['LABEL_GRD'],
    range: {
      'map_*_gap': [-0.4, 0.4],
      'map_*_*': [0.5, 1.5],
      '*_schools': [-0.2, 2.6],
      '*_*_b': [0.4, 1.4],
      '*_*_wb': [-0.3, 0.45],
      '*_*_gap': [-0.4, 0.4],
      '*': [0.4, 1.6],
    },
    map: true,
    scatterplot: true,
  },
  {
    id: 'coh',
    label: LANG['LABEL_COH'],
    range: {
      'map_*_*': [-0.333, 0.3333],
      '*_*_gap': [-0.25, 0.25],
      '*_schools': [-1, 1],
      '*': [-0.5, 0.5],
    },
    map: true,
    scatterplot: true,
  },
  {
    id: 'ses',
    label: LANG['LABEL_SES_NO_REGION'],
    map: false,
    scatterplot: true,
    range: {
      '*_districts_h': [-5, 3],
      '*_counties_h': [-4, 2],
      '*_*_b': [-6, 2],
      '*_*_h': [-6, 2],
      '*_districts_wb': [-1, 6],
      '*_*_wb': [0, 5],
      '*_districts_wh': [-1, 5],
      '*_*_wh': [-0.5, 4.5],
      'map_*_*': [-3, 3],
      '*_counties': [-4, 3],
      '*_districts_w': [-3, 3],
      '*_districts': [-5, 3],
      '*': [-5, 4],
    },
  },
  {
    id: 'seg',
    label: LANG['LABEL_SEG'],
    range: {
      '*_*_np': [0, 0.75],
      '*': [-0.25, 0.75],
    },
    map: false,
    scatterplot: true,
  },
  {
    id: 'min',
    label: LANG['LABEL_MIN'],
    range: {
      '*': [-0.1, 0.7],
    },
  },
  {
    id: 'frl',
    label: LANG['LABEL_FRL'],
    range: {
      '*': [0, 1],
    },
    map: false,
    scatterplot: true,
  },
]

export const KEY_METRIC_IDS = ['cri', 'avg', 'grd', 'coh']
