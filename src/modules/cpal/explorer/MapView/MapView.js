import React, { useMemo, useEffect, useRef } from 'react'
import i18n from '@pureartisan/simple-i18n'
import shallow from 'zustand/shallow'
import { getLayers, CPAL_SOURCES } from './selectors'
import MapBase, { useIdMap } from './../Map'

import { CPAL_METRICS } from './../../../../constants/metrics'
import {
  getMetric,
  getQuintilesPhrase,
  getFeatureProperty,
} from './../utils'
import useStore from './../store'

const MapView = props => {
  // Generic state updates for store.
  // Accepts an object of values to update.
  const setStoreValues = useStore(
    state => state.setStoreValues,
  )
  // Currently active metric
  const metric = useStore(state => state.activeMetric)
  // Active quintiles
  const activeQuintiles = useStore(
    state => [...state.activeQuintiles],
    shallow,
  )
  // Explorer breakpoint stored in state
  const breakpoint = useStore(state => state.breakpoint)
  // Manage display of map modal
  const showMapModal = useStore(state => state.showMapModal)
  // Tracks whether to handle interactions as mobile
  const interactionsMobile = useStore(
    state => state.interactionsMobile,
  )

  // All items to be passed into map from state.
  const hoveredId = useStore(state => state.hovered)
  const hoveredType = useStore(state => state.type)
  const feature = useStore(state => state.feature)
  const coords = useStore(state => state.coords)
  const setHovered = useStore(state => state.setHovered)

  // Default affix for features in school zones layer
  const schoolZonesAffix = useStore(
    state => state.schoolZonesAffix,
  )
  // Default viewport
  const viewport = useStore(state => state.viewport)
  // Active layers
  const activeLayers = useStore(
    state => [...state.activeLayers],
    shallow,
  )
  // Active view
  const activeView = useStore(state => state.activeView)

  const [idMap, addToIdMap] = useIdMap()
  const isLoaded = useRef(false)

  /** memoized array of shape and point layers */
  const layers = useMemo(() => {
    if (!metric || !activeQuintiles || !activeLayers) {
      return []
    }
    const context = { metric, activeQuintiles }
    return getLayers(context, activeLayers)
  }, [metric, activeQuintiles, activeLayers])

  /** aria label for screen readers */
  const ariaLabel = i18n.translate('UI_MAP_SR', {
    metric: i18n.translate(
      getMetric(metric, CPAL_METRICS).title,
    ),
    quintiles: getQuintilesPhrase(activeQuintiles),
  })

  /** handler for map hover */
  const handleHover = (feature, coords, geoCoords) => {
    // console.log(
    //   'handleHover in mapview, ',
    //   feature,
    //   coords,
    //   geoCoords,
    // )
    if (!!interactionsMobile) return
    let type = null
    let id = null
    if (
      feature &&
      feature.layer &&
      feature.layer.id === 'schools-districts-outline'
    ) {
      // console.log('District border hovered.')
      type = `district`
    }
    if (
      feature &&
      feature.layer &&
      feature.layer.id === 'schools-circle'
    ) {
      // console.log('School circle hovered.', feature)
      type = `schools`
      // console.log('handleHover, ', feature, coords)
      id = getFeatureProperty(feature, 'TEA')
      // setHovered(id, type, geoCoords, feature)
    }
    // console.log('handleHover, ', id)
    setHovered(id, type, geoCoords, feature)
  }

  /** handler for map click */
  const eventSchoolPage = useStore(
    state => state.eventSchoolPage,
  )
  const handleClick = (feature, coords, geoCoords) => {
    // console.log('handle click, ', feature)
    // If the item is hovered, navigate to the school.
    // If the item is not hovered, set it as hovered.
    // setHovered(id, type, geoCoords, feature)
    if (feature.source === 'schools') {
      // console.log('school clicked, ', feature)
      if (!!interactionsMobile) {
        // If it's not yet hovered, set it as hovered.
        // console.log('Small screen, setting up modal.')
        // console.log('showMapModal, ', showMapModal)
        const type = `schools`
        const id = getFeatureProperty(feature, 'TEA')
        setHovered(id, type, geoCoords, feature)
        // Launch the map modal
        // setShowMapModal(true)
        setStoreValues({ showMapModal: true })
        // console.log('showMapModal, ', showMapModal)
      } else {
        // If it is hovered, then navigate to new window.
        if (!!window) {
          const href =
            window.location.origin +
            '/schools/' +
            feature.properties.SLN +
            '/'
          window.open(href, '_blank')
        }
        // setEventSchoolPage(eventSchoolPage + 1)
        setStoreValues({
          eventSchoolPage: eventSchoolPage + 1,
        })
      }
    }
  }

  // If touch events are happening, flag the device as touch.
  const handleTouch = () => {}

  /** handler for map load */
  const handleLoad = () => {
    // inform global listener that map has loaded
    // window.CPAL.trigger('map')
    isLoaded.current = true
  }

  return (
    <MapBase
      sources={CPAL_SOURCES}
      layers={layers}
      idMap={idMap}
      hoveredId={hoveredId ? hoveredId : undefined}
      hoveredType={hoveredType ? hoveredType : undefined}
      hoveredCoords={coords ? coords : undefined}
      hoveredFeature={feature ? feature : undefined}
      ariaLabel={ariaLabel}
      onHover={handleHover}
      onLoad={handleLoad}
      onClick={handleClick}
      onTouch={handleTouch}
      defaultViewport={viewport}
      schoolZonesAffix={schoolZonesAffix}
    ></MapBase>
  )
}

export default MapView
