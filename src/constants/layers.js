export const CPAL_LAYER_GROUPS = [
  {
    id: `districts`,
    label: `UI_MAP_LAYERS_DISTRICTS`,
    types: [`districts`],
    tooltip: null,
  },
  {
    id: `redlining`,
    label: `UI_MAP_LAYERS_REDLINING`,
    types: [`redlineShapes`, `redlineLines`],
    tooltip: 'UI_MAP_LAYERS_REDLINING_TIP',
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
