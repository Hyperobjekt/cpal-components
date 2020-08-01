import axios from 'axios'
import circle from '@turf/circle'
import i18n from '@pureartisan/simple-i18n'
import shallow from 'zustand/shallow'

import useStore from './store.js'
import { schools } from './../../../data/schools'
import { schoolsGeojson } from './../../../data/schoolsGeojson'
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
 * Verify that view contains one of the two views.
 * @param  String view View string
 * @return Boolean
 */
const isViewValid = view => {
  // console.log('isViewValid')
  return ['feeder', 'map'].indexOf(view) > -1
}

/**
 * Verifies that metric exists in metric collection.
 * @param  {String}  metric String that corresponds to metric ID in constants
 * @return {Boolean}
 */
const isMetricValid = metric => {
  // Check if it's in the metrics list
  // console.log('isMetricValid')
  // If it's empty, just return true. We'll use the default.
  if (metric.length === 0) {
    return true
  } else {
    // If not empty, verify that it's in the metrics collection.
    const filter = CPAL_METRICS.find(el => {
      return el.id === metric
    })
    return !!filter ? true : false
  }
}

/**
 * Verifies that quintiles string can be converted into array of quintiles.
 * @param  {String}  quintiles String of comma-separated numbers
 * @return {Boolean}
 */
const isQuintilesValid = quintiles => {
  // console.log('isQuintilesValid')
  const arr = quintiles.split(',')
  if (arr.length < 5) return false
  let t = true
  arr.forEach(el => {
    const n = Number(el)
    if (n !== 1 && n !== 0) {
      t = false
    }
  })
  return t
}

const isFeederValid = feeder => {
  // console.log('isFeederValid()')
  if (feeder.length === 0) {
    return true
  } else {
    // If not empty, verify that it's in the feeders collection.
    const filter = CPAL_FEEDERS.find(el => {
      return el.id === Number(feeder)
    })
    return !!filter ? true : false
  }
}

const isSchoolValid = school => {
  // console.log('isSchoolValid()')
  if (school.length === 0) {
    return true
  } else {
    // If not empty, verify that it's in the feeders collection.
    const filter = schools.find(el => {
      return el.TEA_ID === Number(school)
    })
    return !!filter ? true : false
  }
}

// const activeLayers = useStore(state => state.activeLayers)
const isLayersValid = layers => {
  // console.log('isLayersValid()')
  if (layers.length === 0) return true
  const layerNames = CPAL_LAYER_GROUPS.map(el => el.id)
  const splitLayers = layers.split(',')
  let hasAMatch = true
  splitLayers.forEach(el => {
    if (layerNames.indexOf(el) <= -1) {
      hasAMatch = false
    }
  })
  return hasAMatch
}

const isLatLngValid = (lat, lng) => {
  console.log('isLatLngValid()')
  // Make sure they're inside the bounds.
  if (!lat && !lng) return true
  lat = Number(lat)
  lng = Number(lng)
  let isValid = true
  if (lat < BOUNDS.lat.min || lat > BOUNDS.lat.max) {
    console.log('lat out of bounds')
    isValid = false
  }
  if (lng < BOUNDS.lng.min || lng > BOUNDS.lng.max) {
    console.log('lng out of bounds')
    isValid = false
  }
  return isValid
}

const isZoomValid = zoom => {
  if (!zoom) return true
  // Make sure it's within the zoom min and max.
  return zoom > BOUNDS.zoom.min && zoom < BOUNDS.zoom.max
}

/**
 * Validates all route params
 * @param  {Object}  params [description]
 * @return {Boolean}        [description]
 */
export const isRouteValid = params => {
  // console.log('isRouteValid(), ', params)
  let isValid = true
  if (
    !isViewValid(params.view) ||
    !isMetricValid(params.metric) ||
    !isQuintilesValid(params.quintiles) ||
    !isFeederValid(params.feeder) ||
    !isSchoolValid(params.school) ||
    !isLayersValid(params.layers) ||
    !isLatLngValid(params.lat, params.lng) ||
    !isZoomValid(params.zoom)
  ) {
    isValid = false
  }
  // console.log('isValid = ', isValid)
  return isValid
}

/**
 * Sets state from route params
 * @param {[type]} params [description]
 */
export const setStateFromHash = params => {
  const setActiveView = useStore(state => state.activeView)
  const setActiveMetric = useStore(
    state => state.activeMetric,
  )
  const setActiveQuintiles = useStore(
    state => state.activeQuintiles,
  )
  const setActiveFeeder = useStore(
    state => state.activeFeeder,
  )
  const setHighlightedSchool = useStore(
    state => state.highlightedSchool,
  )
  const setActiveLayers = useStore(
    state => state.activeLayers,
  )
  const viewport = useStore(state => state.viewport)
  const setViewport = useStore(state => state.setViewport)
}

/**
 * Constructs a comma-delineated string from array of active layers.
 * @param  {Array} activeLayers
 * @return {String}
 */
const getLayersString = activeLayers => {
  // console.log('getLayersString(), ', activeLayers)
  return activeLayers.toString()
}

/**
 * Returns a hash based on state
 * @return {String} [description]
 */
export const getHashFromState = () => {
  const activeView = useStore(state => state.activeView)
  const activeMetric = useStore(state => state.activeMetric)
  const activeQuintiles = useStore(
    state => state.activeQuintiles,
  )
  const activeFeeder = useStore(state => state.activeFeeder)
  const highlightedSchool = useStore(
    state => state.highlightedSchool,
  )
  const activeLayers = useStore(
    state => [...state.activeLayers],
    shallow,
  )
  const viewport = useStore(state => state.viewport)

  const hash =
    activeView +
    '/' +
    activeMetric +
    '/' +
    activeQuintiles.toString() +
    '/' +
    (!!activeFeeder ? activeFeeder : '') +
    '/' +
    (!!highlightedSchool ? highlightedSchool : '') +
    '/' +
    getLayersString(activeLayers) +
    '/' +
    viewport.latitude +
    '/' +
    viewport.longitude +
    '/' +
    viewport.zoom +
    '/'

  return hash
}

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
      const feeder = feeders.find(item => {
        return Number(item.SLN) == Number(found.TEA_ID)
      })
      if (!!feeder) {
        el.properties.feeder = feeder.FEEDER
        el.properties.feeder_sln = feeder.FEEDER_SLN
      }
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
      el.schoolname = feeder.SCHOOLNAME
      json.push(el)
    }
  })
  // console.log('data, ', json)
  return json
}

// More generic utils or utils from external sources

import { useState, useEffect } from 'react'

// // https://dev.to/gabe_ragland/debouncing-with-react-hooks-jci
// export const useDebounce = (value, delay) => {
//   // State and setters for debounced value
//   const [debouncedValue, setDebouncedValue] = useState(
//     value,
//   )
//
//   useEffect(
//     () => {
//       // Set debouncedValue to value (passed in) after the specified delay
//       const handler = setTimeout(() => {
//         setDebouncedValue(value)
//       }, delay)
//
//       // Return a cleanup function that will be called every time ...
//       // ... useEffect is re-called. useEffect will only be re-called ...
//       // ... if value changes (see the inputs array below).
//       // This is how we prevent debouncedValue from changing if value is ...
//       // ... changed within the delay period. Timeout gets cleared and restarted.
//       // To put it in context, if the user is typing within our app's ...
//       // ... search box, we don't want the debouncedValue to update until ...
//       // ... they've stopped typing for more than 500ms.
//       return () => {
//         clearTimeout(handler)
//       }
//     },
//     // Only re-call effect if value changes
//     // You could also add the "delay" var to inputs array if you ...
//     // ... need to be able to change that dynamically.
//     [value, delay],
//   )
//
//   return debouncedValue
// }
