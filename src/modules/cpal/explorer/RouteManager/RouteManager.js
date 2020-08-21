import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import shallow from 'zustand/shallow'

import useStore from './../store'
import { getRoundedValue } from './../utils'
import { schools } from './../../../../data/schools'
import {
  CPAL_METRICS,
  CPAL_FEEDERS,
} from './../../../../constants/metrics'
import {
  BOUNDS,
  DEFAULT_ROUTE,
} from './../../../../constants/map'
import { CPAL_LAYER_GROUPS } from './../../../../constants/layers'

/**
 * Get a route parameters object based on the string
 * @param {string} path
 * @returns {object} e.g. { region: 'counties', metric: 'avg', ... }
 */
export const getParamsFromPathname = (path, routeVars) => {
  // console.log('getParamsFromPathname()')
  // strip starting "#" and "/" chars
  const route = path.replace(/^#\/+/g, '')
  // Construct object from hash
  return route.split('/').reduce(
    (acc, curr, i) => ({
      ...acc,
      [routeVars[i]]:
        ['zoom', 'lat', 'lon'].indexOf(routeVars[i]) > -1
          ? parseFloat(curr)
          : curr,
    }),
    {},
  )
}

export const getStrippedRoute = route =>
  route.replace(/^#[/]+/g, '').replace(/\/$/g, '')

export const isEmptyRoute = route =>
  getStrippedRoute(route).length === 0

// https://dev.to/gabe_ragland/debouncing-with-react-hooks-jci
export const useDebounce = (value, delay) => {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(
    value,
  )

  useEffect(
    () => {
      // Set debouncedValue to value (passed in) after the specified delay
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)

      // Return a cleanup function that will be called every time ...
      // ... useEffect is re-called. useEffect will only be re-called ...
      // ... if value changes (see the inputs array below).
      // This is how we prevent debouncedValue from changing if value is ...
      // ... changed within the delay period. Timeout gets cleared and restarted.
      // To put it in context, if the user is typing within our app's ...
      // ... search box, we don't want the debouncedValue to update until ...
      // ... they've stopped typing for more than 500ms.
      return () => {
        clearTimeout(handler)
      }
    },
    // Only re-call effect if value changes
    // You could also add the "delay" var to inputs array if you ...
    // ... need to be able to change that dynamically.
    [value, delay],
  )

  return debouncedValue
}

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
  if (!quintiles) return true
  if (quintiles.length < 5) return false
  const arr = quintiles.split(',')
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
  if (!feeder || feeder.length === 0) {
    return true
  } else {
    // If not empty, verify that it's in the feeders collection.
    const filter = CPAL_FEEDERS.find(el => {
      return Number(el.id) === Number(feeder)
    })
    return !!filter ? true : false
  }
}

const isSchoolValid = school => {
  // console.log('isSchoolValid()')
  if (!school || school.length === 0) {
    return true
  } else {
    // If not empty, verify that it's in the feeders collection.
    const filter = schools.find(el => {
      return Number(el.SLN) === Number(school)
    })
    return !!filter ? true : false
  }
}

const isLayersValid = layers => {
  // console.log('isLayersValid()')
  if (!layers) return true
  if (layers.length < 2) return false
  const arr = layers.split(',')
  let t = true
  arr.forEach(el => {
    const n = Number(el)
    if (n !== 1 && n !== 0) {
      t = false
    }
  })
  return t
}

const isLatLngValid = (lat, lng) => {
  // console.log('isLatLngValid()')
  // Make sure they're inside the bounds.
  if (!lat && !lng) return true
  lat = Number(lat)
  lng = Number(lng)
  let isValid = true
  if (lat < BOUNDS.lat.min || lat > BOUNDS.lat.max) {
    // console.log('lat out of bounds')
    isValid = false
  }
  if (lng < BOUNDS.lng.min || lng > BOUNDS.lng.max) {
    // console.log('lng out of bounds')
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
const isRouteValid = params => {
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
  console.log('isValid = ', isValid)
  return isValid
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

const RouteManager = props => {
  // track if initial route has loaded
  const isLoaded = useRef(false)
  const activeView = useStore(state => state.activeView)
  const setActiveView = useStore(
    state => state.setActiveView,
  )

  const activeMetric = useStore(state => state.activeMetric)
  const setActiveMetric = useStore(
    state => state.setActiveMetric,
  )
  const setActiveFilterTab = useStore(
    state => state.setActiveFilterTab,
  )

  const activeQuintiles = useStore(
    state => state.activeQuintiles,
  )
  const setActiveQuintiles = useStore(
    state => state.setActiveQuintiles,
  )

  const activeFeeder = useStore(state => state.activeFeeder)
  const setActiveFeeder = useStore(
    state => state.setActiveFeeder,
  )

  const highlightedSchool = useStore(
    state => state.highlightedSchool,
  )
  const setHighlightedSchool = useStore(
    state => state.setHighlightedSchool,
  )

  const activeLayers = useStore(
    state => [...state.activeLayers],
    shallow,
  )
  const setActiveLayers = useStore(
    state => state.setActiveLayers,
  )

  const viewport = useStore(state => state.viewport)
  const setViewport = useStore(state => state.setViewport)

  const setShowIntroModal = useStore(
    state => state.setShowIntroModal,
  )

  const feederLocked = useStore(state => state.feederLocked)
  const setFeederLocked = useStore(
    state => state.setFeederLocked,
  )

  // Track share hash and update when it changes
  const shareHash = useStore(state => state.shareHash)
  const setShareHash = useStore(state => state.setShareHash)

  /**
   * Returns a hash based on state
   * @return {String} [description]
   */
  const getHashFromState = () => {
    const hash =
      activeView +
      '/' +
      activeMetric +
      '/' +
      activeQuintiles.toString() +
      '/' +
      (!!activeFeeder && !!feederLocked
        ? activeFeeder
        : '') +
      '/' +
      (!!highlightedSchool && !!feederLocked
        ? highlightedSchool
        : '') +
      '/' +
      getLayersString(activeLayers) +
      '/' +
      getRoundedValue(viewport.latitude, 4) +
      '/' +
      getRoundedValue(viewport.longitude, 4) +
      '/' +
      getRoundedValue(viewport.zoom, 2) +
      '/'

    return hash
  }

  // get the route params based on current view
  const route = getHashFromState()

  // debounce the route so it updates every 1 second max
  const debouncedRoute = useDebounce(route, 500)

  /**
   * Sets state from route params
   * @param {[type]} params [description]
   */
  const setStateFromHash = params => {
    // console.log('setStateFromHash()')

    if (!!params.view) {
      setActiveView(params.view)
    }
    if (!!params.metric) {
      setActiveMetric(params.metric)
      const tab = CPAL_METRICS.filter(
        el => el.id === params.metric,
      )[0].tab
      if (!!tab) {
        setActiveFilterTab(tab)
      }
      // console.log('setting metric, ', params.metric, tab)
    }
    if (params.quintiles && params.quintiles.length > 0) {
      const quintiles = params.quintiles.split(',')
      setActiveQuintiles(
        quintiles.map(el => {
          return Number(el)
        }),
      )
    }
    if (!!params.feeder) {
      setActiveFeeder(params.feeder)
      setFeederLocked(true)
    }
    if (!!params.school) {
      setHighlightedSchool(params.school)
      setFeederLocked(true)
    }
    if (params.layers && params.layers.length > 0) {
      const getLayers = params.layers.split(',')
      setActiveLayers(
        getLayers.map(el => {
          return Number(el)
        }),
      )
    }

    let resetViewport = false
    if (!!params.lat && !!params.lng) {
      viewport.latitude = Number(params.lat)
      viewport.longitude = Number(params.lng)
      resetViewport = true
    }
    if (!!params.zoom) {
      viewport.zoom = Number(params.zoom)
      resetViewport = true
    }
    if (!!resetViewport) {
      setViewport(viewport)
    }
  }

  useEffect(() => {
    if (isLoaded.current) {
      // When hash changes, if route is valid, update route for sharing.
      window.addEventListener('hashchange', () => {
        // console.log('hashchange')
        const path = window.location.hash
        // Construct params object from hash.
        const params = getParamsFromPathname(
          path,
          props.routeSet,
        )
        if (
          !isEmptyRoute(path) &&
          isRouteValid(params, props.routeSet) &&
          path !== shareHash
        ) {
          // console.log('updating hash')
          // Update state based on params
          // setStateFromHash(params)
          setShareHash(window.location.hash)
        }
      })
    }
  }, [isLoaded.current])

  // update the hash when debounced route changes
  useEffect(() => {
    // only change the hash if the initial route has loaded
    if (isLoaded.current) {
      // window.location.hash = '#/' + debouncedRoute
      window.history.replaceState(
        { hash: '#/' + debouncedRoute },
        'Explorer state update',
        window.location.origin +
          window.location.pathname +
          '#/' +
          debouncedRoute,
      )
      localStorage.setItem(
        'cpal_hash',
        '#/' + debouncedRoute,
      )
      setShareHash('#/' + debouncedRoute)
    }
  }, [debouncedRoute])

  // load the route when the application mounts
  useEffect(() => {
    async function loadRoute() {
      // console.log('loadRoute')
      isLoaded.current = true
      // Get path.
      const path = window.location.hash
      // Construct params object from hash.
      const params = getParamsFromPathname(
        path,
        props.routeSet,
      )
      if (
        !isEmptyRoute(path) &&
        isRouteValid(params, props.routeSet)
      ) {
        // Update state based on params
        setStateFromHash(params)
      }
      const localStorageHash = localStorage.getItem(
        'cpal_hash',
      )
      if (!!localStorageHash) {
        if (localStorageHash.length > 0) {
          const lsparams = getParamsFromPathname(
            localStorageHash,
            props.routeSet,
          )
          if (isRouteValid(lsparams, props.routeSet)) {
            setStateFromHash(lsparams)
          }
        }
      }
      if (isEmptyRoute(path) && !localStorageHash) {
        // console.log('showing intro modal')
        setShowIntroModal(true)
      }
    }
    loadRoute()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // this component doesn't render anything
  return null
}

RouteManager.propTypes = {
  routeSet: PropTypes.array, // Constants listing params and allowable options.
}

export default RouteManager
