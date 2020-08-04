import axios from 'axios'
import circle from '@turf/circle'
import i18n from '@pureartisan/simple-i18n'

import useStore from './store.js'
import { schools } from './../../../data/schools'
// import { schoolsGeojson } from './../../../data/schoolsGeojson'
import { feeders } from './../../../data/feeders'
import {
  CPAL_METRICS,
  CPAL_FEEDERS,
  DEFAULT_ROUTE,
} from './../../../constants/metrics'
import { BOUNDS } from './../../../constants/map'
import { CPAL_LAYER_GROUPS } from './../../../constants/layers'

// import { parseLocationsString } from './selectors/router'

// const FLAGGED_ENDPOINT =
//   process.env.REACT_APP_DATA_ENDPOINT + 'flagged/'

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
 * Converts string to title case
 * @param  String str String input
 * @return String
 */
export const toTitleCase = str => {
  str = str.toLowerCase().split(' ')
  for (var i = 0; i < str.length; i++) {
    str[i] =
      str[i].charAt(0).toUpperCase() + str[i].slice(1)
  }
  return str.join(' ')
}

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
  padZeroes = false,
  isCurrency = false,
) => {
  // console.log('getRoundedValue()')
  const type = typeof value
  let fixed = null
  if (type === 'string') {
    if (padZeroes) {
      fixed = parseFloat(value)
        .toFixed(decimals)
        .toLocaleString()
    } else {
      fixed = +parseFloat(value)
        .toFixed(decimals)
        .toLocaleString()
    }
  } else {
    if (padZeroes) {
      fixed = Number(
        value.toFixed(decimals),
      ).toLocaleString()
    } else {
      fixed = Number(
        +value.toFixed(decimals),
      ).toLocaleString()
    }
  }
  if (!!isCurrency) {
    fixed = '$' + fixed
  }
  return fixed
}

/**
 * Returns boolean if quintile is within active quintiles
 * @param  {[type]}  quintile        [description]
 * @param  {[type]}  activeQuintiles [description]
 * @return {Boolean}                 [description]
 */
export const isInActiveQuintile = (
  quintile,
  activeQuintiles,
) => {
  return true
}

/**
 * Returns an index value for the quintile, 0 for far left, 4 for far right
 * @type {[type]}
 */
export const getQuintile = (
  value,
  min,
  max,
  high_is_good = 1,
) => {
  // console.log('getQuintile()')
  const standardized =
    (Math.abs(value - min) / Math.abs(max - min)) * 100
  switch (true) {
    case standardized >= 80:
      return high_is_good ? 4 : 0
      break
    case standardized < 80 && standardized >= 60:
      return high_is_good ? 3 : 1
      break
    case standardized < 60 && standardized >= 40:
      return 2
      break
    case standardized < 40 && standardized >= 20:
      return high_is_good ? 1 : 3
      break
    case standardized < 20 && standardized >= 0:
      return high_is_good ? 0 : 4
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
 * Filters an array of metrics, returns an object of metric data
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

export const getQuintilesPhrase = quintiles => {
  if (
    !!quintiles[0] &&
    !!quintiles[1] &&
    !!quintiles[2] &&
    !!quintiles[3] &&
    !!quintiles[4]
  ) {
    // all true, return
    return (
      i18n.translate('ALL_FIVE') +
      ' ' +
      i18n.translate('QUINTILES')
    )
  } else {
    let count = 0
    let last = 0
    for (let i = 1; i < quintiles.length; i++) {
      if (!!quintiles[i]) {
        last = i
        count++
      }
    }
    if (count === 0) {
      // No quintiles active
      return (
        i18n.translate('NO') +
        ' ' +
        i18n.translate('QUINTILES')
      )
    }
    if (count === 1) {
      // 1 quintiles active
      return (
        i18n.translate(getQuintileDesc(last)) +
        ' ' +
        i18n.translate('QUINTILE')
      )
    }
    let phrase = []
    quintiles.forEach((el, i) => {
      if (!!el) {
        phrase.push(i18n.translate(getQuintileDesc(i)))
      }
    })
    if (count === 2) {
      // 2 quintiles active
      // console.log('count is 2')
      phrase[phrase.length - 1] =
        i18n.translate('AND') +
        ' ' +
        phrase[phrase.length - 1]
      phrase.push(i18n.translate('QUINTILES'))
      phrase.join()
      phrase = String(phrase).replace(/,/g, ' ')

      return phrase
    } else {
      phrase[phrase.length - 1] =
        i18n.translate('AND') +
        ' ' +
        phrase[phrase.length - 1]
      phrase.join(',')
      phrase = String(phrase).replace(/,/g, ', ')
      phrase = phrase + ' ' + i18n.translate('QUINTILES')

      return phrase
    }
  }
}

/**
 * Returns string placeholder based on quintile provided
 * @param  Number quintile Quintile 0 - 4
 * @return String          String referncing translation file constant
 */
export const getQuintileDesc = quintile => {
  switch (true) {
    case quintile === 0: {
      return 'FIRST'
    }
    case quintile === 1: {
      return 'SECOND'
    }
    case quintile === 2: {
      return 'THIRD'
    }
    case quintile === 3: {
      return 'FOURTH'
    }
    case quintile === 4: {
      return 'FIFTH'
    }
  }
}

export const getFeederAverage = (metric, schoolSet) => {
  // Get all the schools that are in that
  // console.log('getFeederAverage, ', schoolSet)
  const values = []
  schoolSet.forEach(el => {
    values.push(el[metric])
  })
  let total = 0
  values.forEach(v => (total = total + v))
  return total / values.length
}

/**
 * Generates geojson object with school zones (2 mile radius)
 * @return  Object   GeoJSON Object of all schools in client-supplied data
 */
export const getSchoolGeojson = () => {
  console.log('getSchoolGeojson()')
  const data = schools
  const newJson = {
    type: 'FeatureCollection',
    features: [],
  }
  // Each object in schools is one feature.
  // Add coords
  // Put school properties into properties
  // Add feeder sln (because the client is fucking idiotic)
  // Push the feature into the newJson array.
  data.forEach(el => {
    const newFeature = {
      type: 'Feature',
      id: el.TEA,
      geometry: {
        type: 'Point',
        coordinates: [],
      },
      properties: {},
    }
    newFeature.geometry.coordinates = [
      el.POINT_X,
      el.POINT_Y,
    ]
    newFeature.properties = el
    // const feeder = feeders.find(item => {
    //   return Number(item.TEA) == Number(el.TEA)
    // })
    // if (!!feeder) {
    //   newFeature.properties.feeder = feeder.FEEDER
    //   newFeature.properties.feeder_sln = feeder.FEEDER_SLN
    // }
    newJson.features.push(newFeature)
  })
  console.log(newJson)
  return newJson
}

export const getSchoolZones = () => {
  // console.log('getSchoolZones')
  const data = schools
  // const origJson = schoolsGeojson
  const newJson = {
    type: 'FeatureCollection',
    features: [],
  }
  data.forEach(el => {
    var center = [el.POINT_X, el.POINT_Y]
    var radius = 2
    var options = {
      steps: 64,
      units: 'miles',
      properties: {
        tea_id: el.TEA,
        metric_cri: el.cri_weight,
      },
    }
    const cir = circle(center, radius, options)
    cir.id = '200' + el.TEA
    // Insert into new json object.
    newJson.features.push(cir)
  })
  // console.log('newJson', newJson)
  return newJson
}
