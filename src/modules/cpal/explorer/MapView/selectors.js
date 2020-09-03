import { fromJS } from 'immutable'
// import { getDistrictColor } from './../selectors'
import {
  getSchoolZones,
  getSchoolGeojson,
} from './../utils'
import {
  DISTRICT_COLORS,
  SCHOOL_ZONE_COLORS,
  REDLINE_FILL_COLORS,
  REDLINE_STROKE_COLORS,
  FEEDER_LAYER_COLOR,
  DEMO_COLORS,
} from './../../../../constants/colors'
import { DEMO_MAX_PERCENTS } from './../../../../constants/layers'
import { CPAL_METRICS } from './../../../../constants/metrics'
import {
  getMetric,
  getQuintile,
  isInActiveQuintile,
} from './../utils'
import { redlines } from './../../../../data/TXDallas1937Redline.js'
import { districts } from './../../../../data/districts.js'
import { feeders } from './../../../../data/feeders.js'
import { demotracts } from './../../../../data/demotracts.js'
import useStore from './../store'

const noDataFill = '#ccc'

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
        'interpolate',
        ['linear'],
        ['zoom'],
        11.99999, // At or below zoom level of 11.999, smaller school dots.
        [
          'case',
          ['==', ['feature-state', 'hover'], true],
          7,
          5,
        ],
        12, // At or above zoom level of 12, larger school dots.
        [
          'case',
          ['==', ['feature-state', 'hover'], true],
          16,
          12,
        ],
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
  // console.log(
  //   'getSchoolZoneShapes(), ',
  //   metric,
  //   getMetric(metric, CPAL_METRICS).colors[0],
  // )
  const metricSd = metric + '_sd'
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
      'fill-color': [
        'case',
        ['==', ['get', metricSd], 0],
        getMetric(metric, CPAL_METRICS).colors[0],
        ['==', ['get', metricSd], 1],
        getMetric(metric, CPAL_METRICS).colors[1],
        ['==', ['get', metricSd], 2],
        getMetric(metric, CPAL_METRICS).colors[2],
        ['==', ['get', metricSd], 3],
        getMetric(metric, CPAL_METRICS).colors[3],
        ['==', ['get', metricSd], 4],
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
  // console.log('getDemographicShapes, ', activeLayers)
  const isActive =
    activeLayers[2] === 1 ||
    activeLayers[3] === 1 ||
    activeLayers[4] === 1 ||
    activeLayers[5] === 1 ||
    activeLayers[6] === 1
  let varName = false
  let maxVal = false
  switch (true) {
    case activeLayers[2] === 1:
      varName = 'dem_perpoc'
      maxVal = DEMO_MAX_PERCENTS.dem_perpoc
      break
    case activeLayers[3] === 1:
      varName = 'dem_perbl'
      maxVal = DEMO_MAX_PERCENTS.dem_perbl
      break
    case activeLayers[4] === 1:
      varName = 'dem_perhi'
      maxVal = DEMO_MAX_PERCENTS.dem_perhi
      break
    case activeLayers[5] === 1:
      varName = 'dem_peras'
      maxVal = DEMO_MAX_PERCENTS.dem_peras
      break
    case activeLayers[6] === 1:
      varName = 'dem_perwh'
      maxVal = DEMO_MAX_PERCENTS.dem_perwh
      break
    default:
      varName = 'dem_perpoc'
      maxVal = DEMO_MAX_PERCENTS.dem_perpoc
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
      'fill-color': [
        'let',
        'perc_floor',
        [
          'round',
          [
            '/',
            [
              '*',
              ['/', ['number', ['get', varName]], maxVal],
              100,
            ],
            20,
          ],
        ],
        [
          'interpolate',
          ['linear'],
          ['var', 'perc_floor'],
          0,
          DEMO_COLORS[0],
          1,
          DEMO_COLORS[1],
          2,
          DEMO_COLORS[2],
          3,
          DEMO_COLORS[3],
          4,
          DEMO_COLORS[4],
        ],
      ],
    },
    filter: [
      'all',
      [
        '!=',
        ['number', ['get', 'GEOID']],
        ['number', 48113980100],
      ],
      [
        '!=',
        ['number', ['get', 'GEOID']],
        ['number', 48113980000],
      ],
    ],
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
      'line-width': 1,
    },
    filter: [
      'all',
      [
        '!=',
        ['number', ['get', 'GEOID']],
        ['number', 48113980100],
      ],
      [
        '!=',
        ['number', ['get', 'GEOID']],
        ['number', 48113980000],
      ],
    ],
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
      z: 42,
      style: getDemographicShapes(context, activeLayers),
      idMap: true,
      hasFeatureId: null, // isCircleId,
      type: `demoShapes`,
    },
    {
      z: 43,
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
      z: 260,
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
      z: 250,
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
