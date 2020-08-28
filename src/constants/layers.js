// Maximum percents for all demographics
export const DEMO_MAX_PERCENTS = {
  dem_perwh: 1,
  dem_perbl: 0.902,
  dem_peras: 0.709,
  dem_perhi: 1,
  dem_perpoc: 1,
}

// Array of layers groups.
export const CPAL_LAYER_GROUPS = [
  {
    id: 0,
    title: `UI_MAP_LAYER_0_TITLE`,
    desc: `UI_MAP_LAYER_0_DESC`,
    census_legend: 0,
  },
  {
    id: 1,
    title: `UI_MAP_LAYER_1_TITLE`,
    desc: `UI_MAP_LAYER_1_DESC`,
    census_legend: 1,
  },
]

// Array of layers.
export const CPAL_LAYERS = [
  // {
  //   id: `districts`,
  //   label: `UI_MAP_LAYERS_DISTRICTS`,
  //   types: [`districts`],
  //   tooltip: null,
  //   only_one: false,
  //   only_one_name: null,
  //   group: 0,
  //   index: 0,
  // },
  {
    id: `feeders`,
    label: `UI_MAP_LAYERS_FEEDERS`,
    types: [`feeders`],
    tooltip: null,
    only_one: false,
    only_one_name: null,
    group: 0,
    index: 0,
  },
  {
    id: `redlining`,
    label: `UI_MAP_LAYERS_REDLINING`,
    types: [`redlineShapes`, `redlineLines`],
    tooltip: 'UI_MAP_LAYERS_REDLINING_TIP',
    only_one: false,
    only_one_name: null,
    group: 0,
    index: 1,
  },
  {
    id: `demopoc`,
    label: `UI_MAP_METRIC_DEM_PERPOC`,
    types: [`demoShapes`, `demoLines`],
    tooltip: 'UI_MAP_METRIC_DEM_PERPOC',
    only_one: true,
    only_one_name: `demo`,
    metric: `dem_perpoc`,
    group: 1,
    index: 2,
  },
  {
    id: `demobl`,
    label: `UI_MAP_METRIC_DEM_POPBL`,
    types: [`demoShapes`, `demoLines`],
    tooltip: 'UI_MAP_METRIC_DEM_POPBL',
    only_one: true,
    only_one_name: `demo`,
    metric: `dem_perbl`,
    group: 1,
    index: 3,
  },
  {
    id: `demohi`,
    label: `UI_MAP_METRIC_DEM_POPHI`,
    types: [`demoShapes`, `demoLines`],
    tooltip: 'UI_MAP_METRIC_DEM_POPHI',
    only_one: true,
    only_one_name: `demo`,
    metric: `dem_perhi`,
    group: 1,
    index: 4,
  },
  {
    id: `demoas`,
    label: `UI_MAP_METRIC_DEM_POPAS`,
    types: [`demoShapes`, `demoLines`],
    tooltip: 'UI_MAP_METRIC_DEM_POPAS',
    only_one: true,
    only_one_name: `demo`,
    metric: `dem_peras`,
    group: 1,
    index: 5,
  },
  {
    id: `demowh`,
    label: `UI_MAP_METRIC_DEM_POPWH`,
    types: [`demoShapes`, `demoLines`],
    tooltip: 'UI_MAP_METRIC_DEM_POPWH',
    only_one: true,
    only_one_name: `demo`,
    metric: `dem_perwh`,
    group: 1,
    index: 6,
  },
]

export const BREAKPOINTS = [
  {
    id: 'xs',
    max: 0,
  },
  {
    id: 'sm',
    max: 320,
  },
  {
    id: 'md',
    max: 768,
  },
  {
    id: 'lg',
    max: 992,
  },
  {
    id: 'xl',
    max: 1280,
  },
]
