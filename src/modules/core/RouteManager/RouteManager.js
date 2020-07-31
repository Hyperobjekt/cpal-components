import { useEffect, useRef } from 'react'
import propTypes from 'prop-types'
// import useDebounce from './../../../utils/useDebounce'
// import {
//   useRouterParams,
//   useAddLocationsByRoute,
// } from '../hooks'
// import useDataOptions from '../hooks/useDataOptions'
// import useUiStore from '../hooks/useUiStore'
// import {
//   isEmptyRoute,
//   isValidRoute,
//   getParamsFromPathname,
// } from '../selectors/router'
// import { useMapStore } from '../../map'

/**
 * Get a route parameters object based on the string
 * @param {string} path
 * @returns {object} e.g. { region: 'counties', metric: 'avg', ... }
 */
export const getParamsFromPathname = (
  path,
  routeVars = DEFAULT_ROUTEVARS,
) => {
  // strip starting "#" and "/" chars
  const route = path.replace(/^#\/+/g, '')
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

export const isValidRoute = (params, routeSet) => {
  // checks route params against valid options for each parameter
  return true
}

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

const RouteManager = props => {
  // track if initial route has loaded
  const isLoaded = useRef(false)
  // get the route params based on current view
  const route = props.getRouteFromState()

  // function to set options based on a route string
  // const setDataOptions = useDataOptions(
  //   state => state.setOptionsFromRoute,
  // )
  // // const addLocationsFromRoute = useAddLocationsByRoute()
  //
  // const setViewOptions = useUiStore(
  //   state => state.setViewFromRoute,
  // )
  // const setMapOptions = useMapStore(
  //   state => state.setViewportFromRoute,
  // )

  // debounce the route so it updates every 1 second max
  const debouncedRoute = useDebounce(route, 500)

  // update the hash when debounced route changes
  useEffect(() => {
    // only change the hash if the initial route has loaded
    if (isLoaded.current) {
      window.location.hash = '#/' + debouncedRoute
    }
  }, [debouncedRoute])

  // load the route when the application mounts
  useEffect(() => {
    async function loadRoute() {
      isLoaded.current = true
      const path = window.location.hash
      if (
        !isEmptyRoute(path) &&
        isValidRoute(path, props.routeSet)
      ) {
        // Get params from the path name
        const params = getParamsFromPathname(path)
        // Update state based on params
        props.setStateFromRoute(params)
        // setDataOptions(params)
        // setViewOptions(params)
        // setMapOptions(params)
        // if (params.locations)
        //   await addLocationsFromRoute(
        //     params.locations,
        //     false,
        //   )
      }
    }
    loadRoute()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // this component doesn't render anything
  return null
}

RouteManager.propTypes = {
  setStateFromRoute: PropTypes.func, // External function, sets state from route params.
  getRouteFromState: PropTypes.func, // External function, gets route params from state.
  routeSet: PropTypes.array, // Constants listing params and allowable options.
}

export default RouteManager
