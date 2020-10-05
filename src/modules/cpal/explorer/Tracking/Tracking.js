import React from 'react'
import i18n from '@pureartisan/simple-i18n'
import { useEffect, useRef, useState } from 'react'

import useStore from './../store'
import { schools } from './../../../../data/schools'
import { CPAL_FEEDERS } from './../../../../constants/metrics'
import { CPAL_LAYERS } from './../../../../constants/layers'
import { DEFAULT_VIEWPORT } from './../../../../constants/map'
import { useDebounce } from './../utils'
import { constructShareLink } from './../Share/Share'

const Tracking = ({ ...props }) => {
  const shareHash = useStore(state => state.shareHash)
  const activeView = useStore(state => state.activeView)
  const activeMetric = useStore(state => state.activeMetric)
  const activeQuintiles = useStore(
    state => state.activeQuintiles,
  )
  const activeLayers = useStore(state => state.activeLayers)
  const hovered = useStore(state => state.hovered)
  const activeFeeder = useStore(state => state.activeFeeder)
  const viewport = useStore(state => state.viewport)
  const feederLocked = useStore(state => state.feederLocked)
  const highlightedSchool = useStore(
    state => state.highlightedSchool,
  )
  const eventShareTwitter = useStore(
    state => state.eventShareTwitter,
  )
  const eventShareFacebook = useStore(
    state => state.eventShareFacebook,
  )
  const eventShareEmail = useStore(
    state => state.eventShareEmail,
  )
  const eventShareLink = useStore(
    state => state.eventShareLink,
  )
  const eventMapReset = useStore(
    state => state.eventMapReset,
  )
  const eventMapCapture = useStore(
    state => state.eventMapCapture,
  )
  const eventSchoolSearch = useStore(
    state => state.eventSchoolSearch,
  )
  const eventSchoolPage = useStore(
    state => state.eventSchoolPage,
  )
  const flyToSchoolSLN = useStore(
    state => state.flyToSchoolSLN,
  )
  const accessedSchool = useStore(
    state => state.accessedSchool,
  )
  const eventError = useStore(state => state.eventError)
  // Tour is launched.
  const eventLaunchTour = useStore(
    state => state.eventLaunchTour,
  )
  // Tour is closed.
  const eventCloseTour = useStore(
    state => state.eventCloseTour,
  )
  // Step when tour is closed.
  const eventCloseTourStep = useStore(
    state => state.eventCloseTourStep,
  )
  const interactionsMobile = useStore(
    state => state.interactionsMobile,
  )
  // Overall boolean preventing event tracking before
  // the map is loaded.
  const doTrackEvents = useStore(
    state => state.doTrackEvents,
  )

  // Get school from schools collection.
  const getSchool = id => {
    return schools.filter(el => {
      return Number(el.TEA) === Number(id)
    })[0]
  }

  const trackCustomEvent = data => {
    // console.log('trackCustomEvent, ', data)
    if (typeof window !== 'undefined') {
      if (window.gtag) {
        window.gtag('event', 'explorer', { ...data })
      }
    }
  }

  // Construct tracking object and fire off.
  const trackEvent = params => {
    if (!doTrackEvents) return
    // Categories:
    // - Share
    // - Select view
    // - Configure map view
    // - Update feeder view
    // - Interact with school
    // - Use map controls

    let eventCategory = null
    let eventAction = null
    let eventLabel = null
    let eventValue = null

    switch (true) {
      case params.type === 'share_twitter':
        eventCategory = 'Share'
        eventAction = 'Share on Twitter'
        eventLabel = shareHash
        break
      case params.type === 'share_facebook':
        eventCategory = 'Share'
        eventAction = 'Share on Facebook'
        eventLabel = shareHash
        break
      case params.type === 'share_email':
        eventCategory = 'Share'
        eventAction = 'Share via email'
        eventLabel = shareHash
        break
      case params.type === 'share_link':
        eventCategory = 'Share'
        eventAction = 'Copy share link'
        eventLabel = shareHash
        break
      case params.type === 'select_view_map':
        eventCategory = 'Select view'
        eventAction = 'Select map view'
        eventLabel = 'map'
        break
      case params.type === 'select_view_feeder':
        eventCategory = 'Select view'
        eventAction = 'Select feeder view'
        eventLabel = 'feeder'
        break
      case params.type === 'select_active_metric':
        eventCategory = 'Configure map view'
        eventAction = 'Select active metric'
        eventLabel = activeMetric
        break
      case params.type === 'update_active_quintiles':
        eventCategory = 'Configure map view'
        eventAction = 'Update active standard deviations'
        eventLabel = activeQuintiles.toString()
        break
      case params.type === 'update_layers':
        eventCategory = 'Configure map view'
        eventAction = 'Update layers'
        eventLabel = activeLayers.toString()
        break
      case params.type === 'search_school':
        eventCategory = 'Interact with school'
        eventAction = 'Search for school'
        var id =
          activeView === 'map'
            ? flyToSchoolSLN
            : highlightedSchool
        if (!!id) {
          eventLabel = getSchool(id).SCHOOLNAME
            ? getSchool(id).SCHOOLNAME
            : null
          eventValue = id
        }
        break
      case params.type === 'select_feeder':
        eventCategory = 'Update feeder view'
        eventAction = 'Select a feeder'
        const feeder = CPAL_FEEDERS.filter(el => {
          return Number(el.id) === Number(activeFeeder)
        })[0]
        eventLabel = feeder.title
        eventValue = activeFeeder
        // code block
        break
      case params.type === 'view_school_details':
        eventCategory = 'Interact with school'
        eventAction = 'View school details (hover or touch)'
        var id = hovered ? hovered : false
        if (!!id) {
          eventLabel = getSchool(id).SCHOOLNAME
            ? getSchool(id).SCHOOLNAME
            : null
          eventValue = id
        }
        break
      case params.type === 'access_school_page':
        eventCategory = 'Interact with school'
        eventAction = 'Navigate to school page (click)'
        var id =
          activeView === 'map' ? hovered : accessedSchool
        if (!!id) {
          eventLabel = getSchool(id).SCHOOLNAME
            ? getSchool(id).SCHOOLNAME
            : null
          eventValue = id
        }
        break
      case params.type === 'map_zoom':
        eventCategory = 'Use map controls'
        eventAction = 'Zoom in or out'
        eventValue = viewport.zoom
        // code block
        break
      case params.type === 'map_pan':
        eventCategory = 'Use map controls'
        eventAction = 'Map pan ([lng,lat])'
        eventLabel = [
          viewport.longitude,
          viewport.latitude,
        ].toString()
        break
      case params.type === 'map_reset':
        eventCategory = 'Use map controls'
        eventAction = 'Map reset'
        // code block
        break
      case params.type === 'map_screencap':
        eventCategory = 'Use map controls'
        eventAction = 'Map screencap'
        eventLabel = shareHash ? shareHash : null
        break
      case params.type === 'error':
        eventCategory = 'Error'
        eventAction = 'Window error'
        eventLabel = eventError.message
        eventValue = navigator.userAgent
        break
      case params.type === 'tour_start':
        eventCategory = 'Use map controls'
        eventAction =
          'Launch tour, ' +
          (!!interactionsMobile ? 'mobile' : 'desktop')
        eventLabel = shareHash ? shareHash : null
        break
      case params.type === 'tour_stop':
        eventCategory = 'Use map controls'
        eventAction = eventAction =
          'Close tour, ' +
          (!!interactionsMobile ? 'mobile' : 'desktop')
        eventValue = eventCloseTourStep
          ? eventCloseTourStep
          : 0 // Step tour was on when closed.
        break
      default:
    }

    const eventObj = {
      // string - required - The object that was interacted with (e.g.video)
      event_category: eventCategory,
      // string - required - Type of interaction (e.g. 'play')
      event_action: eventAction,
    }
    if (!!eventLabel) {
      eventObj.event_label = eventLabel
    }
    if (!!eventValue) {
      eventObj.value = eventValue
    }

    trackCustomEvent(eventObj)
    // https://developers.google.com/analytics/devguides/collection/upgrade/analyticsjs
    // gtag.js parameters
    // - event_action
    // - event_category
    // - event_label
    // - value
  }
  // When twitter share counter changes, record the change.
  useEffect(() => {
    trackEvent({ type: 'share_twitter' })
  }, [eventShareTwitter])
  // When fb share counter changes, record the change.
  useEffect(() => {
    trackEvent({ type: 'share_facebook' })
  }, [eventShareFacebook])
  // When email share counter changes, record the change.
  useEffect(() => {
    trackEvent({ type: 'share_email' })
  }, [eventShareEmail])
  // When link share counter changes, record the change.
  useEffect(() => {
    trackEvent({ type: 'share_link' })
  }, [eventShareLink])
  // When activeView changes, record the change.
  useEffect(() => {
    trackEvent({ type: 'select_view_' + activeView })
  }, [activeView])
  // When activeMetric changes, record the change.
  useEffect(() => {
    trackEvent({ type: 'select_active_metric' })
  }, [activeMetric])
  const debouncedQuintiles = useDebounce(
    activeQuintiles,
    2000,
  )
  useEffect(() => {
    trackEvent({ type: 'update_active_quintiles' })
  }, [debouncedQuintiles])
  // When school hovered, record the changes.
  // TODO: Address edge cases where hovered is changed for another reason (search).
  useEffect(() => {
    if (!!hovered) {
      trackEvent({ type: 'view_school_details' })
    }
  }, [hovered])
  // When layers change, record the changes.
  useEffect(() => {
    trackEvent({ type: 'update_layers' })
  }, [activeLayers])
  // When feeder locked in, record the changes.
  useEffect(() => {
    if (!!feederLocked && highlightedSchool.length === 0) {
      trackEvent({ type: 'select_feeder' })
    }
  }, [activeFeeder])
  // When zoom changes, record the change.
  // Debounce the value to avoid recording every
  // minor transition during a zoom action.
  const debouncedZoom = useDebounce(viewport.zoom, 3000)
  useEffect(() => {
    if (viewport.zoom !== DEFAULT_VIEWPORT.zoom) {
      trackEvent({ type: 'map_zoom' })
    }
  }, [debouncedZoom])
  // When lat and lng changes, record the changes.
  // Only record every other one, since the event fires for both.
  // Debounce the values to avoid capturing resets and
  // every minor change during a pan action.
  const debouncedLat = useDebounce(viewport.latitude, 3000)
  const debouncedLng = useDebounce(viewport.longitude, 3000)
  // Counter for the event.
  const [latLngCounter, setLatLngCounter] = useState(0)
  useEffect(() => {
    // If not equal to default...
    setLatLngCounter(latLngCounter + 1)
    // Only execute if even (not twice per pan, once for lat & once for lng.)
    if (latLngCounter % 2 === 0) {
      // If not default...
      if (
        viewport.latitude !== DEFAULT_VIEWPORT.latitude ||
        viewport.longitude !== DEFAULT_VIEWPORT.longitude
      ) {
        trackEvent({ type: 'map_pan' })
      }
    }
  }, [debouncedLat, debouncedLng])
  // When map reset, record.
  useEffect(() => {
    if (eventMapReset > 0) {
      trackEvent({ type: 'map_reset' })
    }
  }, [eventMapReset])
  // When map captured, record.
  useEffect(() => {
    trackEvent({ type: 'map_screencap' })
  }, [eventMapCapture])
  // When school searched, record.
  useEffect(() => {
    trackEvent({ type: 'search_school' })
  }, [eventSchoolSearch])
  // When school page accessed, record.
  useEffect(() => {
    if (!!hovered || !!accessedSchool) {
      trackEvent({ type: 'access_school_page' })
    }
  }, [eventSchoolPage])
  // Detect and submit errors.
  useEffect(() => {
    trackEvent({ type: 'error' })
  }, [eventError])
  // Detect that tour has been launched.
  useEffect(() => {
    trackEvent({ type: 'tour_start' })
  }, [eventLaunchTour])
  // Detect that tour has been closed.
  useEffect(() => {
    trackEvent({ type: 'tour_stop' })
  }, [eventCloseTour])

  // Don't return anything. We just watch state for changes and
  // fire off events.
  return ''
}

export default Tracking
