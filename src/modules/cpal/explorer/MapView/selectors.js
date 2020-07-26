import { fromJS } from 'immutable'
// import { getDistrictColor } from './../selectors'
import {
  getSchoolZones,
  getSchoolGeojson,
} from './../utils'
import {
  DISTRICT_COLORS,
  REDLINE_COLORS,
  SCHOOL_ZONE_COLORS,
} from './../../../../constants/colors'
import { CPAL_METRICS } from './../../../../constants/metrics'
import {
  getMetric,
  getQuintile,
  isInActiveQuintile,
} from './../utils'
import { redlines } from './../../../../data/TXDallas1937Redline.js'
import { districts } from './../../../../data/districts.js'
import useStore from './../store'

const noDataFill = '#ccc'

/**
 * Gets the color stops for the provided metric ID
 * @param {string} id
 * @returns {array}
 */
export const getStopsForVarName = (metric, colors) => {
  const metricData = getMetric(metric, CPAL_METRICS)
  const [min, max] = metricData.range
  const range = Math.abs(max - min)
  // Grab colors from metric colors array, and detach
  const assignColors = metricData.colors.slice()
  // If high is not not good, reverse colors array.
  if (!metricData.high_is_good) {
    assignColors.reverse()
  }
  const stepSize = range / (assignColors.length - 1)
  return assignColors.map((c, i) => [min + i * stepSize, c])
}

const getSchoolFillStyle = (metric, colors) => {
  // console.log(
  //   'getSchoolFillStyle, ',
  //   varName,
  //   region,
  //   colors,
  // )
  const stops = getStopsForVarName(metric, colors).reduce(
    (acc, curr) => [...acc, ...curr],
    [],
  )
  return [
    'case',
    ['==', ['get', 'metric_' + metric], -999],
    noDataFill,
    ['has', 'metric_' + metric],
    [
      'interpolate',
      ['linear'],
      ['get', 'metric_' + metric],
      ...stops,
    ],
    noDataFill,
  ]
}

const getCircleMinZoom = region =>
  region === 'schools' ? 2 : 8

export const getSchoolCircleLayer = ({
  layerId,
  region,
  metric,
  activeQuintiles,
  colors,
}) => {
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
      'circle-color': getSchoolFillStyle(
        metric,
        getMetric(metric, CPAL_METRICS).colors,
      ),
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
        '#1e0370', // Hover color
        '#fff', // Normal color
      ],
      'circle-stroke-width': [
        'interpolate',
        ['linear'],
        ['zoom'],
        4,
        0,
        6,
        0.5,
        14,
        2,
      ],
    },
  })
}

export const getDistrictOutline = (
  { layerId, region },
  activeLayers,
) => {
  // console.log('getDistrictOutline(), ', region)
  const layer = activeLayers.find(item => {
    return item.types.indexOf('districts') >= 0
  })
  console.log('layer = ', layer)
  return fromJS({
    id: 'districts',
    source: 'districts',
    type: 'line',
    layout: {
      visibility: !!layer.active ? 'visible' : 'none',
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
}) => {
  // console.log('getSchoolZoneShapes(), ', region)
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
      'fill-color': SCHOOL_ZONE_COLORS.fill, // 'orange',
      'fill-outline-color': SCHOOL_ZONE_COLORS.outline, // '#000',
      'fill-opacity': [
        'case',
        ['boolean', ['feature-state', 'hover'], false],
        1, // 0.2,
        0,
      ],
    },
  })
}

export const getRedlineShapes = (
  { layerId, region },
  activeLayers,
) => {
  // console.log('getRedlineShapes(), ', region)
  const layer = activeLayers.find(item => {
    return item.types.indexOf('redlineShapes') >= 0
  })
  return fromJS({
    id: 'redlineShapes',
    source: 'redlines',
    type: 'fill',
    layout: {
      visibility: !!layer.active ? 'visible' : 'none',
    },
    interactive: false,
    paint: {
      'fill-color': [
        'string',
        [
          'get',
          ['get', 'holc_grade'],
          ['literal', REDLINE_COLORS],
        ],
        'blue',
      ],
      'fill-opacity': 0.2,
    },
  })
}

export const getRedlineLines = (
  { layerId, region },
  activeLayers,
) => {
  // console.log('getRedlineLines(), ', region)
  const layer = activeLayers.find(item => {
    return item.types.indexOf('redlineLines') >= 0
  })
  return fromJS({
    id: 'redlineLines',
    source: 'redlines',
    type: 'line',
    layout: {
      visibility: !!layer.active ? 'visible' : 'none',
    },
    interactive: false,
    paint: {
      'line-color': [
        'string',
        [
          'get',
          ['get', 'holc_grade'],
          ['literal', REDLINE_COLORS],
        ],
        'blue',
      ],
      'line-width': 2,
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
  console.log('isSchoolZoneId')
  if (!id) {
    return false
  }
  // const featureRegion = getRegionFromLocationId(id)
  // return featureRegion === 'schools'
  return 'schoolzones'
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
    ...getRedlineLayers(context, activeLayers),
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
})
