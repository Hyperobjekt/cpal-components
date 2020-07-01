import { fromJS } from 'immutable'
import {
  getRegionFromLocationId,
  getChoroplethColors,
  getMetricColors,
  getDemographicIdFromVarName,
  getMetricIdFromVarName,
  getMetricRange,
  isGapVarName,
  getDistrictColor,
} from './../selectors'
import {
  DISTRICT_COLORS,
  REDLINE_COLORS,
} from './../../../../constants/colors'
import { redlines } from './../../../../data/TXDallas1937Redline.js'
import { districts } from './../../../../data/districts.js'

const noDataFill = '#ccc'

/**
 * Gets the color stops for the provided metric ID
 * @param {string} id
 * @returns {array}
 */
export const getStopsForVarName = (
  varName,
  region,
  colors = getChoroplethColors(),
) => {
  const demId = getDemographicIdFromVarName(varName)
  const metricId = getMetricIdFromVarName(varName)
  const isGap = isGapVarName(varName)
  colors = isGap ? [...colors].reverse() : colors
  const [min, max] = getMetricRange(
    metricId,
    demId,
    region,
    'map',
  )
  const range = Math.abs(max - min)
  const stepSize = range / (colors.length - 1)
  return colors.map((c, i) => [min + i * stepSize, c])
}

const getSchoolFillStyle = (varName, region, colors) => {
  console.log(
    'getSchoolFillStyle, ',
    varName,
    region,
    colors,
  )
  const stops = getStopsForVarName(
    varName,
    region,
    colors,
  ).reduce((acc, curr) => [...acc, ...curr], [])
  return [
    'case',
    [
      '==',
      ['get', 'metric_' + getMetricIdFromVarName(varName)],
      -999,
    ],
    noDataFill,
    ['has', 'metric_' + getMetricIdFromVarName(varName)],
    [
      'interpolate',
      ['linear'],
      ['get', 'metric_' + getMetricIdFromVarName(varName)],
      ...stops,
    ],
    noDataFill,
  ]
}

const getFillStyle = (varName, region, colors) => {
  console.log('getFillStyle, ', varName, region, colors)
  const stops = getStopsForVarName(
    varName,
    region,
    colors,
  ).reduce((acc, curr) => [...acc, ...curr], [])
  return [
    'case',
    ['==', ['get', varName], -999],
    noDataFill,
    ['has', varName],
    ['interpolate', ['linear'], ['get', varName], ...stops],
    noDataFill,
  ]
}

const getCircleOpacity = region =>
  region === 'schools'
    ? ['interpolate', ['linear'], ['zoom'], 2, 0, 3, 1]
    : [
        'interpolate',
        ['exponential', 2],
        ['zoom'],
        8,
        0,
        10,
        1,
      ]

const getCircleRadius = (region, offset = 0) =>
  region === 'schools'
    ? [
        'interpolate',
        ['linear'],
        ['zoom'],
        2,
        2 + offset,
        4,
        3 + offset,
        14,
        12 + offset,
      ]
    : [
        'interpolate',
        ['linear'],
        ['zoom'],
        7,
        0,
        8,
        1 + offset,
        14,
        12 + offset,
      ]

const getCircleMinZoom = region =>
  region === 'schools' ? 2 : 8

export const getCircleHighlightLayer = ({
  layerId,
  region,
}) =>
  fromJS({
    id: layerId || region + '-circle-highlight',
    source: 'schools',
    'source-layer': 'schools',
    type: 'circle',
    minzoom: getCircleMinZoom(region),
    interactive: false,
    layout: {
      visibility: 'visible',
    },
    paint: {
      'circle-color': 'rgba(0,0,0,0)',
      'circle-opacity': 1,
      'circle-radius': getCircleRadius(region, -3),
      'circle-stroke-opacity': 1,
      'circle-stroke-color': [
        'case',
        ['boolean', ['feature-state', 'hover'], false],
        '#f00',
        [
          'string',
          ['feature-state', 'selected'],
          'rgba(0,0,0,0)',
        ],
      ],
      'circle-stroke-width': [
        'interpolate',
        ['linear'],
        ['zoom'],
        4,
        2,
        6,
        2,
        14,
        4,
      ],
    },
  })

export const getSchoolCircleHoverLayer = ({
  layerId,
  region,
}) =>
  fromJS({
    id: layerId || region + '-circle-highlight',
    source: 'schools',
    // 'source-layer': 'schools',
    type: 'circle',
    minzoom: getCircleMinZoom(region),
    interactive: true,
    layout: {
      visibility: 'visible',
    },
    paint: {
      'circle-color': 'rgba(0,0,0,0)',
      'circle-opacity': 1,
      'circle-radius': getCircleRadius(region, -3),
      'circle-stroke-opacity': 1,
      'circle-stroke-color': [
        'case',
        ['boolean', ['feature-state', 'hover'], false],

        ['string', ['feature-state', 'selected'], '#fff'],
        'rgba(0,0,0,0)',
      ],
      'circle-stroke-width': [
        'interpolate',
        ['linear'],
        ['zoom'],
        4,
        2,
        6,
        2,
        14,
        4,
      ],
    },
  })

export const getCircleLayer = ({
  layerId,
  region,
  metric,
  demographic,
  colors,
}) => {
  return fromJS({
    id: layerId || 'schools-circle',
    source: 'schools',
    'source-layer': 'schools',
    type: 'circle',
    minzoom: 1, // getCircleMinZoom(region),
    // interactive: region === 'schools',
    interactive: true,
    layout: {
      visibility:
        demographic === 'all' ? 'visible' : 'none',
    },
    paint: {
      'circle-color': getFillStyle(
        [demographic, metric].join('_'),
        'schools',
        colors,
      ),
      'circle-opacity': 1, // getCircleOpacity(region),
      'circle-radius': 4, // getCircleRadius(region),
      'circle-stroke-opacity': 1, // getCircleOpacity(region),
      'circle-stroke-color': '#fff',
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

export const getSchoolCircleLayer = ({
  layerId,
  region,
  metric,
  demographic,
  colors,
}) => {
  return fromJS({
    id: layerId || 'schools-circle',
    source: 'schools',
    // 'source-layer': 'schools',
    type: 'circle',
    minzoom: getCircleMinZoom(region),
    // interactive: region === 'schools',
    interactive: true,
    layout: {
      visibility: 'visible',
    },
    paint: {
      'circle-color': getSchoolFillStyle(
        [demographic, metric].join('_'),
        'schools',
        getMetricColors(metric),
      ),
      'circle-opacity': 1,
      // 4,
      'circle-radius': [
        'case',
        ['boolean', ['feature-state', 'hover'], true],
        4,
        7,
      ],
      'circle-stroke-opacity': 1,
      'circle-stroke-color': '#fff',
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

export const getCircleCasingLayer = ({
  layerId,
  demographic,
  region,
}) =>
  fromJS({
    id: layerId || region + '-circle-casing',
    source: 'schools',
    'source-layer': 'schools',
    type: 'circle',
    minzoom: getCircleMinZoom(region),
    interactive: false,
    layout: {
      visibility:
        demographic === 'all' ? 'visible' : 'none',
    },
    paint: {
      'circle-stroke-opacity': getCircleOpacity(region),
      'circle-radius': getCircleRadius(region, 1),
      'circle-color': 'transparent',
      'circle-stroke-color': [
        'interpolate',
        ['linear'],
        ['zoom'],
        6,
        '#ccc',
        8,
        '#5d5d5d',
      ],
      'circle-stroke-width': [
        'interpolate',
        ['linear'],
        ['zoom'],
        8,
        0.5,
        10,
        1,
        14,
        2,
      ],
    },
  })

export const getChoroplethOutline = ({ layerId, region }) =>
  fromJS({
    id: layerId || region + '-choropleth-outline',
    source: 'redlines',
    'source-layer': region,
    type: 'line',
    interactive: false,
    paint: {
      'line-color': [
        'case',
        ['boolean', ['feature-state', 'hover'], false],
        '#f00',
        [
          'string',
          ['feature-state', 'selected'],
          'rgba(0,0,0,0)',
        ],
      ],
      'line-width': [
        'case',
        [
          'any',
          ['boolean', ['feature-state', 'hover'], false],
          ['to-boolean', ['feature-state', 'selected']],
        ],
        2.5,
        0,
      ],
    },
  })

export const getDistrictOutline = ({ layerId, region }) => {
  // console.log('getDistrictOutline(), ', region)
  return fromJS({
    id: region + '-district-outline', // layerId || region + '-district-outline',
    source: 'districts',
    // 'source-layer': region,
    type: 'line',
    layout: {
      visibility: 'visible',
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

export const getRedlineShapes = ({ layerId, region }) => {
  // console.log('getRedlineShapes(), ', region)
  return fromJS({
    id: region + '-redline-shapes', // layerId || region + '-district-outline',
    source: 'redlines',
    // 'source-layer': region,
    type: 'fill',
    layout: {
      visibility: 'visible',
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

export const getRedlineLines = ({ layerId, region }) => {
  // console.log('getRedlineLines(), ', region)
  return fromJS({
    id: region + '-redline-lines', // layerId || region + '-district-outline',
    source: 'redlines',
    // 'source-layer': region,
    type: 'line',
    layout: {
      visibility: 'visible',
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

/**
 * Gets the mapboxgl layer for the choropleth outline
 * @param {string} region
 */
export const getChoroplethOutlineCasing = ({
  layerId,
  region,
}) =>
  fromJS({
    id: layerId || region + '-choropleth-outline-casing',
    source: 'schools',
    'source-layer': region,
    type: 'line',
    interactive: false,
    paint: {
      'line-color': '#fff',
      'line-opacity': [
        'case',
        [
          'any',
          ['boolean', ['feature-state', 'hover'], false],
          ['to-boolean', ['feature-state', 'selected']],
        ],
        1,
        0,
      ],
      'line-width': [
        'case',
        [
          'any',
          ['boolean', ['feature-state', 'hover'], false],
          ['to-boolean', ['feature-state', 'selected']],
        ],
        1.5,
        0,
      ],
      'line-gap-width': [
        'case',
        [
          'any',
          ['boolean', ['feature-state', 'hover'], false],
          ['to-boolean', ['feature-state', 'selected']],
        ],
        2.5,
        0,
      ],
    },
  })

const isChoroplethId = id => {
  if (!id) {
    return false
  }
  const featureRegion = getRegionFromLocationId(id)
  return (
    featureRegion === 'districts' ||
    featureRegion === 'counties'
  )
}

const isCircleId = id => {
  if (!id) {
    return false
  }
  const featureRegion = getRegionFromLocationId(id)
  return featureRegion === 'schools'
}

export const getChoroplethLayer = ({
  layerId,
  region,
  metric,
  demographic,
  colors,
}) =>
  fromJS({
    id: layerId || region + '-choropleth',
    source: 'redlines',
    'source-layer':
      region === 'schools' ? 'districts' : region,
    type: 'fill',
    interactive: true,
    paint: {
      'fill-color': getFillStyle(
        [demographic, metric].join('_'),
        region,
        colors,
      ),
      'fill-opacity':
        region === 'schools'
          ? [
              'interpolate',
              ['linear'],
              ['zoom'],
              3,
              0,
              8,
              0.5,
              10,
              0.666,
            ]
          : 1,
    },
  })

/**
 * Gets choropleth layer based on current context
 * @param {*} context { metric, demographic, region}
 */
export const getChoroplethLayers = context => {
  console.log('getChoroplethLayers', context)
  return [
    {
      z: 1,
      style: getChoroplethLayer(context),
      hasFeatureId: isChoroplethId,
    },
    { z: 50, style: getChoroplethOutline(context) },
    { z: 50, style: getChoroplethOutlineCasing(context) },
  ]
}

// export const getCircleLayers = context => {
//   console.log('getCircleLayers', context)
//   return [
//     { z: 50, style: getCircleHighlightLayer(context) },
//     {
//       z: 50,
//       style: getCircleLayer(context),
//       idMap: true,
//       hasFeatureId: isCircleId,
//     },
//     { z: 50, style: getCircleCasingLayer(context) },
//   ]
// }
//
//
//

export const getDistrictLayers = context => {
  console.log('getDistrictLayers', context)
  return [
    {
      z: 100,
      style: getDistrictOutline(context),
    },
  ]
}

export const getRedlineLayers = context => {
  console.log('getRedlineLayers', context)
  return [
    {
      z: 140,
      style: getRedlineShapes(context),
    },
    {
      z: 141,
      style: getRedlineLines(context),
    },
  ]
}

export const getAssetLayers = context => {
  console.log('getCircleLayers', context)
}

export const getCircleLayers = context => {
  // console.log('getCircleLayers', context)
  return [
    // {
    //   z: 150,
    //   style: getSchoolCircleHoverLayer(context),
    // },
    {
      z: 150,
      style: getSchoolCircleLayer(context),
      idMap: true,
      hasFeatureId: isCircleId,
    },
    // { z: 50, style: getCircleCasingLayer(context) },
  ]
}

export const getLayers = context => {
  console.log('getLayers', context)
  return [
    // ...getChoroplethLayers(context),
    // ...getCircleLayers(context),
    ...getCircleLayers(context),
    ...getDistrictLayers(context),
    ...getRedlineLayers(context),
  ]
}

// export const SEDA_SOURCES = fromJS({
//   seda: {
//     url:
//       'mapbox://hyperobjekt.states-v4-' +
//       process.env.REACT_APP_BUILD_ID +
//       ',hyperobjekt.counties-v4-' +
//       process.env.REACT_APP_BUILD_ID +
//       ',hyperobjekt.districts-v4-' +
//       process.env.REACT_APP_BUILD_ID +
//       ',hyperobjekt.schools-v4-' +
//       process.env.REACT_APP_BUILD_ID,
//     type: 'vector',
//   },
// })

export const CPAL_SOURCES = fromJS({
  // schools: {
  //   type: `geojson`,
  //   data: {},
  // },
  districts: {
    type: `geojson`,
    data: districts,
  },
  redlines: {
    type: `geojson`,
    data: redlines,
  },
  schools: {
    type: `geojson`,
    data: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {
            name: 'School Name A',
            metric_cri: 20,
            metric_econ: 15,
          },
          geometry: {
            type: 'Point',
            coordinates: [-96.705731, 32.6403525],
          },
        },
        {
          type: 'Feature',
          properties: {
            name: 'School Name B',
            metric_cri: 120,
            metric_econ: 150,
          },
          geometry: {
            type: 'Point',
            coordinates: [-96.705731, 32.7403525],
          },
        },
        {
          type: 'Feature',
          properties: {
            name: 'School Name C',
            metric_cri: 80,
            metric_econ: 15,
          },
          geometry: {
            type: 'Point',
            coordinates: [-96.705731, 32.8403525],
          },
        },
        {
          type: 'Feature',
          properties: {
            name: 'School Name D',
            metric_cri: 40,
            metric_econ: 15,
          },
          geometry: {
            type: 'Point',
            coordinates: [-96.735731, 32.6403525],
          },
        },
        {
          type: 'Feature',
          properties: {
            name: 'School Name E',
            metric_cri: 150,
            metric_econ: 150,
          },
          geometry: {
            type: 'Point',
            coordinates: [-96.735731, 32.7403525],
          },
        },
        {
          type: 'Feature',
          properties: {
            name: 'School Name F',
            metric_cri: 200,
            metric_econ: 15,
          },
          geometry: {
            type: 'Point',
            coordinates: [-96.735731, 32.8403525],
          },
        },
      ],
    },
  },
})
