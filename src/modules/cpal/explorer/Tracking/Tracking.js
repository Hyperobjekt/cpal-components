import React from 'react'
import i18n from '@pureartisan/simple-i18n'
import { useEffect, useRef } from 'react'

import useStore from './../store.js'
import { schools } from './../../../../data/schools'
import { CPAL_FEEDERS } from './../../../../constants/metrics'
import { CPAL_LAYERS } from './../../../../constants/layers'
import { DEFAULT_VIEWPORT } from './../../../../constants/map'

const Tracking = ({ ...props }) => {
  const trackCustomEvent = useStore(
    state => state.trackCustomEvent,
  )
  const shareHash = useStore(state => state.shareHash)
  const activeView = useStore(state => state.activeView)
  const activeMetric = useStore(state => state.activeMetric)
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

  // Get school from schools collection.
  const getSchool = id => {
    return schools.filter(el => {
      return Number(el.TEA) === Number(id)
    })
  }

  // Construct tracking object and fire off.
  const trackEvent = params => {
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
        eventCategory = 'share'
        eventAction = 'Share on Twitter'
        eventLabel = shareHash
        // code block
        break
      case params.type === 'share_facebook':
        eventCategory = 'share'
        eventAction = 'Share on Facebook'
        eventLabel = shareHash
        // code block
        break
      case params.type === 'share_email':
        eventCategory = 'share'
        eventAction = 'Share via email'
        eventLabel = shareHash
        // code block
        break
      case params.type === 'share_link':
        eventCategory = 'share'
        eventAction = 'Copy share link'
        eventLabel = shareHash
        // code block
        break
      case params.type === 'select_view_map':
        eventCategory = 'Select view'
        eventAction = 'Select map view'
        eventLabel = 'map'
        // code block
        break
      case params.type === 'select_view_feeder':
        eventCategory = 'Select view'
        eventAction = 'Select feeder view'
        eventLabel = 'feeder'
        // code block
        break
      case params.type === 'select_active_metric':
        eventCategory = 'Configure map view'
        eventAction = 'Select active metric'
        eventLabel = activeMetric
        // code block
        break
      case params.type === 'update_layers':
        eventCategory = 'Configure map view'
        eventAction = 'Update layers'
        eventLabel = activeLayers.toString()
        // code block
        break
      case params.type === 'search_school':
        eventCategory = 'Interact with school'
        eventAction = 'Search for school'
        eventLabel = getSchool(hovered).SCHOOLNAME
        eventValue = hovered
        // code block
        break
      case params.type === 'select_feeder':
        eventCategory = 'Update feeder view'
        eventAction = 'Select a feeder'
        const feeder = CPAL_FEEDERS.filter(el => {
          return Number(el.id) === Number(activeFeeder)
        })
        eventLabel = feeder.title
        eventValue = activeFeeder
        // code block
        break
      case params.type === 'view_school_details':
        eventCategory = 'Interact with school'
        eventAction = 'View school details (hover or touch)'
        eventLabel = getSchool(hovered).SCHOOLNAME
        eventValue = hovered
        // code block
        break
      case params.type === 'access_school_page':
        eventCategory = 'Interact with school'
        eventAction = 'Navigate to school page (click)'
        eventLabel = getSchool(hovered).SCHOOLNAME
        eventValue = hovered
        // code block
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
        eventLabel = toString([
          viewport.longitude,
          viewport.latitude,
        ])
        // code block
        break
      case params.type === 'map_reset':
        eventCategory = 'Use map controls'
        eventAction = 'Map reset'
        // code block
        break
      case params.type === 'map_screencap':
        eventCategory = 'Use map controls'
        eventAction = 'Map screencap'
        eventLabel = shareHash
        // code block
        break
      default:
      // code block
    }

    const eventObj = {
      // string - required - The object that was interacted with (e.g.video)
      category: eventCategory,
      // string - required - Type of interaction (e.g. 'play')
      action: eventAction,
    }
    if (!!eventLabel) {
      eventObj.label = eventLabel
    }
    if (!!eventValue) {
      eventObj.value = eventValue
    }

    trackCustomEvent(eventObj)

    // trackCustomEvent({
    //         // string - required - The object that was interacted with (e.g.video)
    //         category: "Special Button",
    //         // string - required - Type of interaction (e.g. 'play')
    //         action: "Click",
    //         // string - optional - Useful for categorizing events (e.g. 'Spring Campaign')
    //         label: "Gatsby Plugin Example Campaign",
    //         // number - optional - Numeric value associated with the event. (e.g. A product ID)
    //         value: 43
    //       })
  }
  // When twitter share counter changes, record the change.
  useEffect(() => {
    trackEvent('share_twitter')
  }, [eventShareTwitter])
  // When fb share counter changes, record the change.
  useEffect(() => {
    trackEvent('share_facebook')
  }, [eventShareFacebook])
  // When email share counter changes, record the change.
  useEffect(() => {
    trackEvent('share_email')
  }, [eventShareEmail])
  // When link share counter changes, record the change.
  useEffect(() => {
    trackEvent('share_link')
  }, [eventShareLink])
  // When activeView changes, record the change.
  useEffect(() => {
    trackEvent('select_view_' + activeView)
  }, [activeView])
  // When activeMetric changes, record the change.
  useEffect(() => {
    trackEvent('select_active_metric')
  }, [activeMetric])
  // When school hovered, record the changes.
  // TODO: Address edge cases where hovered is changed for another reason (search).
  useEffect(() => {
    trackEvent('view_school_details')
  }, [hovered])
  // When layers change, record the changes.
  useEffect(() => {
    trackEvent('update_layers')
  }, [activeLayers])
  // When feeder locked in, record the changes.
  useEffect(() => {
    if (!!feederLocked && highlightedSchool.length === 0) {
      trackEvent('select_feeder')
    }
  }, [feederLocked])

  // When zoom changes, record the change.
  useEffect(() => {
    if (viewport.zoom !== DEFAULT_VIEWPORT.zoom) {
      trackEvent('map_zoom')
    }
  }, [viewport.zoom])
  // When lat or lng changes, record the changes.
  useEffect(() => {
    // If not equal to default...
    if (
      viewport.latitude !== DEFAULT_VIEWPORT.latitude ||
      viewport.longitude !== DEFAULT_VIEWPORT.longitude
    ) {
      trackEvent('map_pan')
    }
  }, [viewport.latitude, viewport.longitude])
  // When map reset, record.
  useEffect(() => {
    if (eventMapReset > 0) {
      console.log('map reset detected')
      trackEvent('map_reset')
    }
  }, [eventMapReset])
  // When map captured, record.
  useEffect(() => {
    trackEvent('map_screencap')
  }, [eventMapCapture])
  // When school searched, record.
  useEffect(() => {
    trackEvent('search_school')
  }, [eventSchoolSearch])
  // When school page accessed, record.
  useEffect(() => {
    trackEvent('access_school_page')
  }, [eventSchoolPage])

  // Don't return anything. We just watch state for changes and
  // fire off events.
  return ''
}

export default Tracking
