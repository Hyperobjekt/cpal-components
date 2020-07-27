import axios from 'axios'
import circle from '@turf/circle'
import i18n from '@pureartisan/simple-i18n'
import { schools } from './../../../data/schools'
import { schoolsGeojson } from './../../../data/schoolsGeojson'
import { feeders } from './../../../data/feeders'
import {
  CPAL_METRICS,
  CPAL_FEEDERS,
} from './../../../constants/metrics'

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

/**
 * Generates geojson object with school zones (2 mile radius)
 * @return  Object   GeoJSON Object of all schools in client-supplied data
 */
export const getSchoolGeojson = () => {
  // console.log('getSchoolGeojson()')
  const data = schools
  const origJson = schoolsGeojson
  const newJson = {
    type: 'FeatureCollection',
    features: [],
  }
  const features = origJson.features
  features.forEach(el => {
    const found = data.find(
      school => school.TEA_ID === el.properties.SLN,
    )
    // console.log('found, ', found)
    if (!!found) {
      // Add data to the properties.
      el.id = found.TEA_ID
      el.properties.tea_id = found.TEA_ID
      CPAL_METRICS.forEach(item => {
        // Add metric value
        const node = 'metric_' + item.id
        el.properties[node] = found[item.id]
        // Also add quintile for each value
        const quintile = 'metric_quintile_' + item.id
        el.properties[quintile] = getQuintile(
          found[item.id],
          item.range[0],
          item.range[1],
          item.high_is_good,
        )
      })
      // Insert into new json object.
      newJson.features.push(el)
    }
  })
  // console.log(newJson)
  return newJson
}

export const getSchoolZones = () => {
  // console.log('getSchoolZones')
  const data = schools
  const origJson = schoolsGeojson
  const newJson = {
    type: 'FeatureCollection',
    features: [],
  }
  const features = origJson.features
  features.forEach(el => {
    const found = data.find(
      school => school.TEA_ID === el.properties.SLN,
    )
    if (!!found) {
      // Add data to the properties.
      var center = el.geometry.coordinates
      var radius = 2
      var options = {
        steps: 64,
        units: 'miles',
        properties: {
          tea_id: found.TEA_ID,
          metric_cri: found.cri,
        },
      }
      const cir = circle(center, radius, options)
      cir.id = '200' + found.TEA_ID
      // Insert into new json object.
      newJson.features.push(cir)
    }
  })
  // console.log('newJson', newJson)
  return newJson
}

/**
 * Returns an array of schools with feeder data added
 * @return Array Array of objects, one for each school
 */
export const getFeederSchools = () => {
  // console.log('getFeederSchools()')
  const data = schools
  const feederSchools = feeders
  const json = []
  data.forEach(el => {
    const feeder = feederSchools.find(item => {
      return Number(item.SLN) == Number(el.TEA_ID)
    })
    if (!!feeder) {
      el.feeder = feeder.FEEDER
      el.feeder_sln = feeder.FEEDER_SLN
      json.push(el)
    }
  })
  // console.log('data, ', json)
  return json
}
