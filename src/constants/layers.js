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
    tooltip: 'UI_MAP_LAYERS_REDLINING_TIP',
    only_one: true,
    only_one_name: `demo`,
  },
  {
    id: `demohi`,
    label: `UI_MAP_METRIC_DEM_POPHI`,
    types: [`demoShapes`, `demoLines`],
    tooltip: 'UI_MAP_LAYERS_REDLINING_TIP',
    only_one: true,
    only_one_name: `demo`,
  },
  {
    id: `demoas`,
    label: `UI_MAP_METRIC_DEM_POPAS`,
    types: [`demoShapes`, `demoLines`],
    tooltip: 'UI_MAP_LAYERS_REDLINING_TIP',
    only_one: true,
    only_one_name: `demo`,
  },
  {
    id: `demowh`,
    label: `UI_MAP_METRIC_DEM_POPHI`,
    types: [`demoShapes`, `demoLines`],
    tooltip: 'UI_MAP_LAYERS_REDLINING_TIP',
    only_one: true,
    only_one_name: `demo`,
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
