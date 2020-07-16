import LANG from './en'

export const CPAL_METRICS = [
  {
    id: 'cri',
    title: 'UI_MAP_METRIC_TITLE_CRI',
    abbrev: 'CRI',
    range: [0, 100],
    // At present, dark purple to light purple
    colors: [
      '#3800D9',
      '#5225d3',
      '#795dc9',
      '#9e90c6',
      '#b6b0c6',
    ],
  },
  {
    id: 'econ_index',
    title: 'UI_MAP_METRIC_TITLE_ECON',
    abbrev: 'ECON',
    range: [0, 100],
    colors: [
      '#0225DF',
      '#2038B5',
      '#465CD2',
      '#6076E9',
      '#8397FE',
    ],
  },
  {
    id: 'edu_index',
    title: 'UI_MAP_METRIC_TITLE_EDU',
    abbrev: 'EDU',
    range: [0, 100],
    colors: [
      '#7C0000',
      '#922020',
      '#BA4C4C',
      '#DF6C6C',
      '#FC8B8B',
    ],
  },
  {
    id: 'fam_index',
    title: 'UI_MAP_METRIC_TITLE_FAM',
    abbrev: 'FAM',
    range: [0, 100],
    colors: [
      '#AB5700',
      '#C27627',
      '#D7934D',
      '#E8AA69',
      '#FEC387',
    ],
  },
  {
    id: 'heal_index',
    title: 'UI_MAP_METRIC_TITLE_HEAL',
    abbrev: 'HEAL',
    range: [0, 100],
    colors: [
      '#3800D9',
      '#5225d3',
      '#795dc9',
      '#9e90c6',
      '#b6b0c6',
    ],
  },
  {
    id: 'comm_index',
    title: 'UI_MAP_METRIC_TITLE_COMM',
    abbrev: 'COMM',
    range: [0, 100],
    colors: [
      '#AA00A5',
      '#BB20B6',
      '#D041CB',
      '#E660E2',
      '#FE84FA',
    ],
  },
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
