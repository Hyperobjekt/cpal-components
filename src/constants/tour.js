export const DESKTOP_STEPS = [
  {
    target: '.button-view-map',
    text: 'TOUR_DESK_STEP_0',
    placement: 'right',
    disableBeacon: true,
  },
  {
    target: '.button-view-feeder',
    text: 'TOUR_DESK_STEP_1',
    placement: 'right',
    disableBeacon: true,
  },
  {
    target: '.mapboxgl-map',
    text: 'TOUR_DESK_STEP_2',
    placement: 'auto',
    disableBeacon: true,
  },
  {
    target: '#button_toggle_panel_filters',
    text: 'TOUR_DESK_STEP_3',
    placement: 'right',
    disableBeacon: true,
  },
  {
    target: '.map-panel-controls .dropdown',
    text: 'TOUR_DESK_STEP_4',
    placement: 'top',
    disableBeacon: true,
    clickOn: '#button_toggle_panel_filters',
  },
  {
    target:
      '.interactive-scale.button-metric.active.button-cri_weight',
    text: 'TOUR_DESK_STEP_5',
    placement: 'top',
    disableBeacon: true,
  },
  {
    target:
      '.interactive-scale.button-metric.active.button-cri_weight',
    text: 'TOUR_DESK_STEP_6',
    placement: 'right',
    disableBeacon: true,
    clickOn: '.quintile-button.quintile-0',
  },
  {
    target: '.overlays .map-legend',
    text: 'TOUR_DESK_STEP_7',
    placement: 'left',
    disableBeacon: true,
    clickOn: '#button_toggle_panel_filters',
  },
  {
    target: '.search-autosuggest input',
    text: 'TOUR_DESK_STEP_8',
    placement: 'left',
    disableBeacon: true,
    runOn: () => {
      // set hovered
    },
  },
]

export const MOBILE_STEPS = []
