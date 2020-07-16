import axios from 'axios'
import { parseLocationsString } from './selectors/router'

const FLAGGED_ENDPOINT =
  process.env.REACT_APP_DATA_ENDPOINT + 'flagged/'

/**
 * Loads map features based on a string of locations
 * @param {string} locations locations formed as `{id},{lat},{lon}` separated by a `+`
 * @returns {Promise<Array<Feature>>}
 */
export const loadFeaturesFromRoute = locations =>
  loadFeaturesFromCoords(parseLocationsString(locations))

/**
 * Loads map features from location parameter
 * @param {*} params
 * @returns {Promise<Array<Feature>>}
 */
export const loadFeaturesFromRouteParams = params =>
  params.locations
    ? loadFeaturesFromRoute(params.locations)
    : Promise.resolve([])

export const loadFlaggedData = type => {
  return axios.get(FLAGGED_ENDPOINT + type + '.json')
}

/**
 * Returns the feature with an id property that matches the
 * provided ID
 * @param {string} id
 * @param {FeatureCollection} collection
 * @returns {Feature}
 */
const getFeatureFromCollection = (id, collection) => {
  const feature = collection.find(
    f => f.properties.id === id,
  )
  if (!feature) {
    throw new Error(
      'feature ' + id + ' not found from tilequery API',
    )
  }
  return feature
}

//
// /**
//  * Loads a feature from a location object containing a feature ID,
//  * latitude, and longitude
//  * @param {object} location
//  * @returns {Promise<Feature>}
//  */
// export const loadFeatureFromCoords = ({ id, lat, lon }) => {
//   const region =
//     id.length === 5
//       ? 'counties'
//       : id.length === 12
//       ? 'schools'
//       : 'districts'
//   return axios
//     .get(getTilequeryUrl(region, lat, lon))
//     .then(res => {
//       return getFeatureFromCollection(id, res.data.features)
//     })
// }
//
// /**
//  * Loads map features based on a string of locations
//  * @param {string} locations locations formed as `{id},{lat},{lon}` separated by a `+`
//  * @returns {Promise<Array<Feature>>}
//  */
// export const loadFeaturesFromCoords = locationsArray =>
//   Promise.all(
//     locationsArray.map(l => loadFeatureFromCoords(l)),
//   )

/**
 * Returns a value rounded to the indicated number of decimals
 * @param  String value     Number or string, value passed to function
 * @param  Number decimals  Number of decimals to round to
 * @param  Boolan padZeroes If true, pad with extra zeroes to fill empty decimal spots
 * @return Number
 */
export const getRoundedValue = (
  value,
  decimals,
  padZeroes,
) => {
  // console.log('getRoundedValue()')
  const type = typeof value
  let fixed = null
  if (type === 'string') {
    if (padZeroes) {
      fixed = parseFloat(value).toFixed(decimals)
    } else {
      fixed = +parseFloat(value).toFixed(decimals)
    }
  } else {
    console.log('type is number')
    if (padZeroes) {
      fixed = value.toFixed(decimals)
    } else {
      fixed = +value.toFixed(decimals)
    }
  }
  return fixed
}

/**
 * Returns an index value for the quintile, 0 for far left, 4 for far right
 * @type {[type]}
 */
export const getQuintile = (value, min, max) => {
  // console.log('getQuintile()')
  const standardized = ((value - min) / (max - min)) * 100
  switch (true) {
    case standardized >= 80:
      return 4
      break
    case standardized < 80 && standardized >= 60:
      return 3
      break
    case standardized < 60 && standardized >= 40:
      return 2
      break
    case standardized < 40 && standardized >= 20:
      return 1
      break
    case standardized < 20 && standardized >= 0:
      return 0
      break
    default:
      return 0
  }
}

/**
 * Calculates hash position (percent from left/0 based on min/max)
 * @param  Number value Value of metric
 * @param  Number min   Minimum of range for metric
 * @param  Number max   Maximum of range for metric
 * @return {[type]}       [description]
 */
export const getHashLeft = (value, min, max) => {
  return ((value - min) / (max - min)) * 100
}

/**
 * Returns an array of color values, one for each quintile for the given metric
 * @param  String metric string for metric
 * @return {[type]}        [description]
 */
export const getMetric = (metric, metrics) => {
  // console.log('getMetric, ', metric)
  const metricData = metrics.find(m => {
    return m.id === metric
  })
  if (!!metricData) {
    return metricData
  } else {
    console.error(`Unable to get metric ${metric}.`)
  }
}
