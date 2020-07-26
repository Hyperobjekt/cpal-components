/**
 * Returns if the provided value is high, low, mid, or none
 * @param {*} value value for the provided metric
 * @param {*} metric the metric ID
 */
// export const getHighLow = (value, metric) => {
//   if (!value) {
//     return 'NONE'
//   }
//   switch (metric) {
//     case 'avg':
//       return value > 0.3
//         ? 'HIGH'
//         : value < -0.3
//         ? 'LOW'
//         : 'MID'
//     case 'coh':
//       return value > 0.1
//         ? 'HIGH'
//         : value < -0.1
//         ? 'LOW'
//         : 'MID'
//     case 'grd':
//       return value > 1.09
//         ? 'HIGH'
//         : value < 0.91
//         ? 'LOW'
//         : 'MID'
//     default:
//       return ''
//   }
// }

/**
 * Gets a property from a feature, returns null if not found
 * @param {Feature} feature GeoJSON feature
 * @param {string} propName property name to grab
 */
export const getFeatureProperty = (feature, propName) => {
  if (
    feature &&
    feature.properties &&
    feature.properties[propName] !== -999
  ) {
    return feature.properties[propName]
  }
  return null
}

/**
 * Returns if the provided object is a feature
 * @param {*} feature
 */
export const isFeature = feature => {
  return (
    feature &&
    typeof feature === 'object' &&
    feature.hasOwnProperty('properties')
  )
}

export const getFeatureFromArray = (features, id) => {
  return features.find(
    l => getFeatureProperty(l, 'id') === id,
  )
}

/**
 * Gets the id of the hovered feature
 * @param {*} hovered
 */
// export const getHoveredId = hovered =>
//   hovered && hovered.properties && hovered.properties.id
//     ? hovered.properties.id
//     : ''

export {
  getSelectedColors, // getColorForVarNameValue, // isColorInvertedForVarName, // getChoroplethColorAtValue, // getChoroplethColors, // getMetricColors, // getSelectedColors, // getDistrictColor,
} from './colors'

export {
  isGapDemographic, // getDemographicForVarNames, // getGapDemographics, // getDemographicFromVarName, // getDemographicIdFromVarName, // isVersusFromVarNames, // isGapVarName, // , // getGapById, // getDemographicById, // getGaps, // getDemographics,
} from './demographics'

export {} from // valueToLowMidHigh,
// getInvertedFromVarName,
// getMetricFromVarName,
// getMetricIdFromVarName,
// getMetricById,
// getMetrics,
// getMetricRange,
// getKeyMetrics,
// getSecondaryForDemographic,
'./metrics'

export {
  getRegionFromLocationId, // getRegionFromFeature, // getRegionFromLocationId,
} from // getSizesForRegion, //   , //   getRegionById, //   getRegionDomain, //   getSingularRegion, //   getSingularRegions, //   getRegions, //   getLocationIdsForRegion, //   getSizesForRegion,
'./regions'

export {} from // getPositionForVarNameValue,
// getPredictedValue,
// getFormatterForVarName, // getMidpointForVarName, // getMetricRangeFromVarName, // getVarNames, // getDataForId,
'./data'

// export {
//   getRegionLabel,
//   getMetricLabel,
//   getDemographicLabel,
//   getLabelFromVarName,
//   getLabelsFromVarNames,
// } from './lang'
