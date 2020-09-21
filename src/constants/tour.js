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
    placement: 'right',
    disableBeacon: true,
    clickOn: ['#button_toggle_panel_filters'],
  },
  {
    target:
      '.interactive-scale.button-metric.active.button-cri_weight',
    text: 'TOUR_DESK_STEP_5',
    placement: 'right',
    disableBeacon: true,
  },
  {
    target:
      '.interactive-scale.button-metric.active.button-cri_weight',
    text: 'TOUR_DESK_STEP_6',
    placement: 'right',
    disableBeacon: true,
    clickOn: [
      '.button-cri_weight .quintile-button.quintile-0',
    ],
  },
  {
    target: '.overlays .map-legend',
    text: 'TOUR_DESK_STEP_7',
    placement: 'left',
    disableBeacon: true,
    clickOn: [
      '.button-cri_weight .quintile-button.quintile-2',
      '.button-cri_weight .quintile-button.quintile-3',
      '#button_toggle_panel_filters',
    ],
  },
  {
    target: '.search-autosuggest input',
    text: 'TOUR_DESK_STEP_8', // Search for a school...
    placement: 'bottom',
    disableBeacon: true,
  },
  {
    target: '.mapboxgl-map',
    text: 'TOUR_DESK_STEP_9', // Hover a school..., click a school...
    placement: 'auto',
    disableBeacon: true,
  },
  {
    target: '.map__zoom',
    text: 'TOUR_DESK_STEP_10', // Use these controls to zoom...
    placement: 'left',
    disableBeacon: true,
  },
  {
    target: '.map-layer-toggle-pane',
    text: 'TOUR_DESK_STEP_11', // The map has additional layers...
    placement: 'right',
    disableBeacon: true,
    clickOn: ['#button_toggle_panel_layers'],
  },
  {
    target: '.layout-view-feeder',
    text: 'TOUR_DESK_STEP_12', // The feeder view displays all of the....
    placement: 'auto',
    disableBeacon: true,
    clickOn: ['#button_view_feeder'],
  },
  {
    target: '.row-schools-chart',
    text: 'TOUR_DESK_STEP_13', // The feeder view also displays all of the neighborhood schools...
    placement: 'auto',
    disableBeacon: true,
  },
  {
    target: '#bar_380',
    text: 'TOUR_DESK_STEP_14', // Click individual feeders to see more information about them.
    placement: 'auto',
    disableBeacon: true,
    clickOn: ['#feeder_bar_380'],
  },
  {
    target: '.feeder-chart-legend',
    text: 'TOUR_DESK_STEP_15', // This panel displays additional information about the schools...
    placement: 'left',
    disableBeacon: true,
  },
  {
    target: '.row-schools-chart',
    text: 'TOUR_DESK_STEP_16', // The distribution chart also highlights all of a feeder's schools when a feeder is selected.
    placement: 'top',
    disableBeacon: true,
  },
  {
    target: '.search-autosuggest input',
    text: 'TOUR_DESK_STEP_17', // Search for a school community using this search bar. This will highlight...
    placement: 'bottom',
    disableBeacon: true,
  },
  {
    target: '.map-panel-slideout-info',
    text: 'TOUR_DESK_STEP_18', // The info panel contains insights about each view ...
    placement: 'right',
    disableBeacon: true,
    clickOn: ['#button_toggle_panel_info'],
  },
]

export const MOBILE_STEPS = [
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
    placement: 'right',
    disableBeacon: true,
    clickOn: ['#button_toggle_panel_filters'],
  },
  {
    target:
      '.interactive-scale.button-metric.active.button-cri_weight',
    text: 'TOUR_DESK_STEP_5',
    placement: 'right',
    disableBeacon: true,
  },
  {
    target:
      '.interactive-scale.button-metric.active.button-cri_weight',
    text: 'TOUR_DESK_STEP_6',
    placement: 'right',
    disableBeacon: true,
    clickOn: ['.quintile-button.quintile-0'],
  },
  {
    target: '.overlays .map-legend',
    text: 'TOUR_DESK_STEP_7',
    placement: 'left',
    disableBeacon: true,
    clickOn: [
      '.quintile-button.quintile-1',
      '.quintile-button.quintile-2',
      '.quintile-button.quintile-4',
      '#button_toggle_panel_filters',
    ],
  },
  {
    target: '.search-autosuggest input',
    text: 'TOUR_DESK_STEP_8', // Search for a school...
    placement: 'left',
    disableBeacon: true,
  },
  {
    target: '.mapboxgl-map',
    text: 'TOUR_DESK_STEP_9', // Hover a school..., click a school...
    placement: 'auto',
    disableBeacon: true,
  },
  {
    target: '.map__zoom',
    text: 'TOUR_DESK_STEP_10', // Use these controls to zoom...
    placement: 'left',
    disableBeacon: true,
  },
  {
    target: '.map-layer-toggle-pane',
    text: 'TOUR_DESK_STEP_11', // The map has additional layers...
    placement: 'right',
    disableBeacon: true,
    clickOn: ['#button_toggle_panel_layers'],
  },
  {
    target: '.layout-view-feeder',
    text: 'TOUR_DESK_STEP_12', // The feeder view displays all of the....
    placement: 'auto',
    disableBeacon: true,
    clickOn: ['#button_view_feeder'],
  },
  {
    target: '.row-schools-chart',
    text: 'TOUR_DESK_STEP_13', // The feeder view also displays all of the neighborhood schools...
    placement: 'auto',
    disableBeacon: true,
  },
  {
    target: '#bar_380',
    text: 'TOUR_DESK_STEP_14', // Click individual feeders to see more information about them.
    placement: 'auto',
    disableBeacon: true,
    clickOn: ['#feeder_bar_380'],
  },
  {
    target: '.feeder-chart-legend',
    text: 'TOUR_DESK_STEP_15', // This panel displays additional information about the schools...
    placement: 'left',
    disableBeacon: true,
  },
  {
    target: '.row-schools-chart',
    text: 'TOUR_DESK_STEP_16', // The distribution chart also highlights all of a feeder's schools when a feeder is selected.
    placement: 'top',
    disableBeacon: true,
  },
  {
    target: '.search-autosuggest input',
    text: 'TOUR_DESK_STEP_17', // Search for a school community using this search bar. This will highlight...
    placement: 'bottom',
    disableBeacon: true,
  },
  {
    target: '.map-panel-slideout-info',
    text: 'TOUR_DESK_STEP_18', // The info panel contains insights about each view ...
    placement: 'right',
    disableBeacon: true,
    clickOn: ['#button_toggle_panel_info'],
  },
]
