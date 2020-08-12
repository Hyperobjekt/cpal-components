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

const GATracking = props => {
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

GATracking.propTypes = {}

export default GATracking
