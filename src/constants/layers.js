export const CPAL_LAYER_GROUPS = [
  {
    id: `districts`,
    label: `UI_MAP_LAYERS_DISTRICTS`,
    types: [`districts`],
    tooltip: null,
    only_one: false,
    only_one_name: null,
  },
  {
    id: `redlining`,
    label: `UI_MAP_LAYERS_REDLINING`,
    types: [`redlineShapes`, `redlineLines`],
    tooltip: 'UI_MAP_LAYERS_REDLINING_TIP',
    only_one: false,
    only_one_name: null,
  },
  {
    id: `demobl`,
    label: `UI_MAP_METRIC_DEM_POPBL`,
    types: [`demoShapes`, `demoLines`],
    tooltip: 'UI_MAP_METRIC_DEM_POPBL',
    only_one: true,
    only_one_name: `demo`,
    metric: `dem_popbl`,
  },
  {
    id: `demohi`,
    label: `UI_MAP_METRIC_DEM_POPHI`,
    types: [`demoShapes`, `demoLines`],
    tooltip: 'UI_MAP_METRIC_DEM_POPHI',
    only_one: true,
    only_one_name: `demo`,
    metric: `dem_pophi`,
  },
  {
    id: `demoas`,
    label: `UI_MAP_METRIC_DEM_POPAS`,
    types: [`demoShapes`, `demoLines`],
    tooltip: 'UI_MAP_METRIC_DEM_POPAS',
    only_one: true,
    only_one_name: `demo`,
    metric: `dem_popas`,
  },
  {
    id: `demowh`,
    label: `UI_MAP_METRIC_DEM_POPWH`,
    types: [`demoShapes`, `demoLines`],
    tooltip: 'UI_MAP_METRIC_DEM_POPWH',
    only_one: true,
    only_one_name: `demo`,
    metric: `dem_popwh`,
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
