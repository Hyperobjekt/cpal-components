import { fromJS } from 'immutable'
// import { getDistrictColor } from './../selectors'
import {
  getSchoolZones,
  getSchoolGeojson,
} from './../utils'
import {
  DISTRICT_COLORS,
  // REDLINE_COLORS,
  SCHOOL_ZONE_COLORS,
  REDLINE_FILL_COLORS,
  REDLINE_STROKE_COLORS,
  FEEDER_LAYER_COLOR,
} from './../../../../constants/colors'
import { CPAL_METRICS } from './../../../../constants/metrics'
import {
  getMetric,
  getQuintile,
  isInActiveQuintile,
} from './../utils'
import { redlines } from './../../../../data/TXDallas1937Redline.js'
import { districts } from './../../../../data/districts.js'
import { feeders } from './../../../../data/feeders.js'
import { demotracts } from './../../../../data/demotracts.min.js'
import useStore from './../store'

const noDataFill = '#ccc'

/**
 * Gets the color stops for the provided metric ID
 * @param {string} id
 * @returns {array}
 */
// export const getStopsForVarName = (metric, colors) => {
//   const metricData = getMetric(metric, CPAL_METRICS)
//   const [min, max] = metricData.range
//   const range = Math.abs(max - min)
//   // Grab colors from metric colors array, and detach
//   const assignColors = metricData.colors.slice()
//   // If high is not not good, reverse colors array.
//   if (!metricData.high_is_good) {
//     assignColors.reverse()
//   }
//   const stepSize = range / (assignColors.length - 1)
//   return assignColors.map((c, i) => [min + i * stepSize, c])
// }

// const getSchoolFillStyle = (metric, colors) => {
//   // console.log(
//   //   'getSchoolFillStyle, ',
//   //   varName,
//   //   region,
//   //   colors,
//   // )
//   const stops = getStopsForVarName(metric, colors).reduce(
//     (acc, curr) => [...acc, ...curr],
//     [],
//   )
//   // return [
//   //   'case',
//   //   ['==', ['get', 'metric_' + metric], -999],
//   //   noDataFill,
//   //   ['has', 'metric_' + metric],
//   //   [
//   //     'interpolate',
//   //     ['linear'],
//   //     ['get', 'metric_' + metric],
//   //     ...stops,
//   //   ],
//   //   noDataFill,
//   // ]
//   return [
//     'case',
//     ['==', ['get', metric], -999],
//     noDataFill,
//     ['has', metric],
//     ['interpolate', ['linear'], ['get', metric], ...stops],
//     noDataFill,
//   ]
// }

const getCircleMinZoom = region =>
  region === 'schools' ? 2 : 8

export const getSchoolCircleLayer = ({
  layerId,
  region,
  metric,
  activeQuintiles,
  colors,
}) => {
  // console.log('getSchoolCircleLayer(), ', metric)
  return fromJS({
    id: 'schools-circle',
    source: 'schools',
    type: 'circle',
    minzoom: getCircleMinZoom(region),
    interactive: true,
    layout: {
      visibility: 'visible',
    },
    paint: {
      'circle-color': [
        'case',
        ['==', ['get', metric + '_sd'], 0],
        getMetric(metric, CPAL_METRICS).colors[0],
        ['==', ['get', metric + '_sd'], 1],
        getMetric(metric, CPAL_METRICS).colors[1],
        ['==', ['get', metric + '_sd'], 2],
        getMetric(metric, CPAL_METRICS).colors[2],
        ['==', ['get', metric + '_sd'], 3],
        getMetric(metric, CPAL_METRICS).colors[3],
        ['==', ['get', metric + '_sd'], 4],
        getMetric(metric, CPAL_METRICS).colors[4],
        '#ccc',
      ],
      'circle-opacity': 1,
      'circle-radius': [
        'case',
        ['boolean', ['feature-state', 'hover'], false],
        7, // Hover size
        5, // Normal size
      ],
      'circle-stroke-opacity': 1,
      'circle-stroke-color': [
        'case',
        ['boolean', ['feature-state', 'hover'], false],
        '#fff', // Hover color
        '#fff', // Normal color
      ],
      'circle-stroke-width': [
        'interpolate',
        ['linear'],
        ['zoom'],
        4,
        0.25,
        6,
        0.5, // 1.5,
        14,
        1,
      ],
    },
    filter: [
      'let',
      'quintile',
      ['number', ['get', ['concat', metric, '_sd']]],
      [
        '==',
        [
          'at',
          ['var', 'quintile'],
          ['literal', activeQuintiles],
        ],
        1,
      ],
    ],
  })
}

export const getFeedersOutlines = (
  { layerId, region },
  activeLayers,
) => {
  const isActive = activeLayers[0] === 1
  return fromJS({
    id: 'feeders',
    source: 'feeders',
    type: 'line',
    layout: {
      visibility: !!isActive ? 'visible' : 'none',
    },
    interactive: false,
    paint: {
      'line-color': FEEDER_LAYER_COLOR,
      // [
      //   'string',
      //   [
      //     'get',
      //     ['get', 'tea_id'],
      //     ['literal', DISTRICT_COLORS],
      //   ],
      //   'blue',
      // ],
      'line-width': 2,
    },
  })
}

export const getDistrictOutline = (
  { layerId, region },
  activeLayers,
) => {
  // console.log('getDistrictOutline(), ', region)
  // const isActive = activeLayers.indexOf('districts') > -1
  const isActive = true // Changed to always active by client. // activeLayers[0] === 1
  return fromJS({
    id: 'districts',
    source: 'districts',
    type: 'line',
    layout: {
      visibility: !!isActive ? 'visible' : 'none',
    },
    interactive: false,
    paint: {
      'line-color': [
        'string',
        [
          'get',
          ['get', 'tea_id'],
          ['literal', DISTRICT_COLORS],
        ],
        'blue',
      ],
      'line-width': 2,
    },
  })
}

export const getSchoolZoneShapes = ({
  layerId,
  region,
  metric,
  activeQuintiles,
  colors,
}) => {
  // console.log('getSchoolZoneShapes(), ', metric)
  return fromJS({
    id: region + '-zone-shapes', // layerId || region + '-district-outline',
    source: 'schoolzones',
    // 'source-layer': region,
    type: 'fill',
    layout: {
      visibility: 'visible',
    },
    interactive: false,
    paint: {
      // 'fill-color': getMetric(metric, CPAL_METRICS)
      //   .colors[2], // SCHOOL_ZONE_COLORS.fill, // 'orange',
      'fill-color': [
        'case',
        ['==', ['get', metric + '_sd'], 0],
        getMetric(metric, CPAL_METRICS).colors[0],
        ['==', ['get', metric + '_sd'], 1],
        getMetric(metric, CPAL_METRICS).colors[1],
        ['==', ['get', metric + '_sd'], 2],
        getMetric(metric, CPAL_METRICS).colors[2],
        ['==', ['get', metric + '_sd'], 3],
        getMetric(metric, CPAL_METRICS).colors[3],
        ['==', ['get', metric + '_sd'], 4],
        getMetric(metric, CPAL_METRICS).colors[4],
        getMetric(metric, CPAL_METRICS).colors[2],
      ],
      'fill-opacity': [
        'case',
        ['boolean', ['feature-state', 'hover'], false],
        0.2,
        0,
      ],
    },
  })
}

export const getRedlineShapes = (
  { layerId, region },
  activeLayers,
) => {
  const isActive = activeLayers[1] === 1
  return fromJS({
    id: 'redlineShapes',
    source: 'redlines',
    type: 'fill',
    layout: {
      visibility: !!isActive ? 'visible' : 'none',
    },
    interactive: false,
    paint: {
      'fill-color': [
        'string',
        [
          'get',
          ['get', 'holc_grade'],
          ['literal', REDLINE_FILL_COLORS],
        ],
        'blue',
      ],
      // 'fill-opacity': 0.2,
    },
  })
}

export const getRedlineLines = (
  { layerId, region },
  activeLayers,
) => {
  // console.log('getRedlineLines(), ', region)
  // const isActive = activeLayers.indexOf('redlining') > -1
  const isActive = activeLayers[1] === 1
  return fromJS({
    id: 'redlineLines',
    source: 'redlines',
    type: 'line',
    layout: {
      visibility: !!isActive ? 'visible' : 'none',
    },
    interactive: false,
    paint: {
      'line-color': [
        'string',
        [
          'get',
          ['get', 'holc_grade'],
          ['literal', REDLINE_STROKE_COLORS],
        ],
        'blue',
      ],
      'line-width': 1,
    },
  })
}

export const getDemographicShapes = (
  { layerId, region },
  activeLayers,
) => {
  const isActive =
    activeLayers[2] === 1 ||
    activeLayers[3] === 1 ||
    activeLayers[4] === 1 ||
    activeLayers[5] === 1
  let varName = false
  switch (true) {
    case activeLayers[2] === 1:
      varName = 'dem_popbl'
      break
    case activeLayers[3] === 1:
      varName = 'dem_pophi'
      break
    case activeLayers[4] === 1:
      varName = 'dem_popas'
      break
    case activeLayers[5] === 1:
      varName = 'dem_popwh'
      break
    default:
      varName = 'dem_popbl'
  }
  // console.log('getDemographicShapes, varName = ', varName)
  return fromJS({
    id: 'demoShapes',
    source: 'demotracts',
    type: 'fill',
    layout: {
      visibility: !!isActive ? 'visible' : 'none',
    },
    interactive: false,
    paint: {
      'fill-color': 'rgba(0,0,0,0.5)',
      'fill-opacity': [
        'let',
        'perc_floor',
        [
          'round',
          [
            '/',
            [
              '*',
              [
                '/',
                ['number', ['get', varName]],
                ['number', ['get', 'dem_totp']],
              ],
              100,
            ],
            20,
          ],
        ],
        [
          'case',
          ['==', ['var', 'perc_floor'], 5],
          0.8,
          ['==', ['var', 'perc_floor'], 4],
          0.6,
          ['==', ['var', 'perc_floor'], 3],
          0.4,
          ['==', ['var', 'perc_floor'], 2],
          0.2,
          ['==', ['var', 'perc_floor'], 1],
          0.1,
          ['==', ['var', 'perc_floor'], 0],
          0,
          0,
        ],
      ],
      // 'fill-color': [
      //   'string',
      //   [
      //     'get',
      //     ['get', 'holc_grade'],
      //     ['literal', REDLINE_FILL_COLORS],
      //   ],
      //   'blue',
      // ],
      // 'fill-opacity': 0.2,
    },
  })
}

export const getDemographicLines = (
  { layerId, region },
  activeLayers,
) => {
  // console.log('getDemographicLines()')
  const isActive =
    activeLayers[2] === 1 ||
    activeLayers[3] === 1 ||
    activeLayers[4] === 1 ||
    activeLayers[5] === 1
  return fromJS({
    id: 'demoLines',
    source: 'demotracts',
    type: 'line',
    layout: {
      visibility: !!isActive ? 'visible' : 'none',
    },
    interactive: false,
    paint: {
      'line-color': '#ccc',
      // 'line-color': [
      //   'string',
      //   [
      //     'get',
      //     ['get', 'holc_grade'],
      //     ['literal', REDLINE_STROKE_COLORS],
      //   ],
      //   'blue',
      // ],
      'line-width': 1,
    },
  })
}

const isSchoolCircleId = id => {
  // console.log('isSchoolCircleId')
  if (!id) {
    return false
  }
  // const featureRegion = getRegionFromLocationId(id)
  // return featureRegion === 'schools'
  return 'schools'
}

const isSchoolZoneId = id => {
  // console.log('isSchoolZoneId')
  if (!id) {
    return false
  }
  // const featureRegion = getRegionFromLocationId(id)
  // return featureRegion === 'schools'
  return 'schoolzones'
}

export const getFeedersLayers = (context, activeLayers) => {
  // console.log('getDistrictLayers', context)
  return [
    {
      z: 150,
      style: getFeedersOutlines(context, activeLayers),
      idMap: true,
      hasFeatureId: null, // isCircleId,
      type: `feeders`,
    },
  ]
}

export const getDistrictLayers = (
  context,
  activeLayers,
) => {
  // console.log('getDistrictLayers', context)
  return [
    {
      z: 150,
      style: getDistrictOutline(context, activeLayers),
      idMap: true,
      hasFeatureId: null, // isCircleId,
      type: `districts`,
    },
  ]
}

export const getRedlineLayers = (context, activeLayers) => {
  // console.log('getRedlineLayers', context)
  return [
    {
      z: 100,
      style: getRedlineShapes(context, activeLayers),
      idMap: true,
      hasFeatureId: null, // isCircleId,
      type: `redlineShapes`,
    },
    {
      z: 101,
      style: getRedlineLines(context, activeLayers),
      idMap: true,
      hasFeatureId: null, // isCircleId,
      type: `redlineLines`,
    },
  ]
}

export const getDemographicLayers = (
  context,
  activeLayers,
) => {
  // console.log('getRedlineLayers', context)
  return [
    {
      z: 102,
      style: getDemographicShapes(context, activeLayers),
      idMap: true,
      hasFeatureId: null, // isCircleId,
      type: `demoShapes`,
    },
    {
      z: 103,
      style: getDemographicLines(context, activeLayers),
      idMap: true,
      hasFeatureId: null, // isCircleId,
      type: `demoLines`,
    },
  ]
}

export const getAssetLayers = context => {
  // console.log('getAssetLayers', context)
}

export const getSchoolZoneLayers = context => {
  // console.log('getSchoolZoneLayers', context)
  return [
    {
      z: 160,
      style: getSchoolZoneShapes(context),
      idMap: true,
      hasFeatureId: isSchoolZoneId,
      type: `schoolzones`,
    },
  ]
}

export const getCircleLayers = context => {
  // console.log('getCircleLayers', context)
  return [
    {
      z: 150,
      style: getSchoolCircleLayer(context),
      idMap: true,
      hasFeatureId: isSchoolCircleId,
      type: `schools`,
    },
  ]
}

export const getLayers = (context, activeLayers) => {
  // console.log('getLayers', context, activeLayers)
  return [
    ...getSchoolZoneLayers(context),
    ...getDistrictLayers(context, activeLayers),
    ...getFeedersLayers(context, activeLayers),
    ...getRedlineLayers(context, activeLayers),
    ...getDemographicLayers(context, activeLayers),
    ...getCircleLayers(context),
  ]
}

export const CPAL_SOURCES = fromJS({
  districts: {
    type: `geojson`,
    data: districts,
  },
  redlines: {
    type: `geojson`,
    data: redlines,
  },
  schoolzones: {
    type: `geojson`,
    data: getSchoolZones(),
  },
  schools: {
    type: `geojson`,
    data: getSchoolGeojson(),
  },
  demotracts: {
    type: `geojson`,
    data: demotracts,
  },
  feeders: {
    type: `geojson`,
    data: feeders,
  },
})
