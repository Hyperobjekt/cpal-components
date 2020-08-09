import React, { useMemo, useEffect, useRef } from 'react'
import i18n from '@pureartisan/simple-i18n'
import shallow from 'zustand/shallow'
import { getLayers, CPAL_SOURCES } from './selectors'
// import {} from './selectors'
import MapBase, {
  useFlyToState,
  useFlyToFeature,
  useFlyToReset,
  useIdMap,
} from './../Map'
import MapLegend from './../Map'
import {
  // getSelectedColors,
  getFeatureProperty,
  // getLocationIdsForRegion,
} from './../selectors'
// import { getLang } from './../selectors/lang'
import {
  useActiveOptionIds,
  useFilters,
  useLocations,
  useHovered,
  useHoveredZone,
  useMarkersVisibility,
  useAddLocation,
  useActiveLocationFeature,
} from './../hooks'
// import { REGION_TO_ID_LENGTH } from './../../../../constants/regions'
import { CPAL_METRICS } from './../../../../constants/metrics'
import useData from './../hooks/useData'
import { getMetric, getQuintilesPhrase } from './../utils'
import useStore from './../store'

// const selectedColors = getSelectedColors()

// const useStyles = makeStyles(theme => ({
//   legend: {
//     position: 'absolute',
//     bottom: 24,
//     right: 16,
//   },
// }))

const MapView = props => {
  /** current options for the map */
  // const [demographic, region] = useActiveOptionIds()
  // Currently active metric
  const metric = useStore(state => state.activeMetric)
  // Active quintiles
  const activeQuintiles = useStore(
    state => [...state.activeQuintiles],
    shallow,
  )
  /** currently active data filters */
  const [{ prefix }] = useFilters()
  /** currently selected location ids */
  const [locations] = useLocations()
  /** id of the currently hovered location */
  const [
    hoveredId,
    hoveredType,
    coords,
    feature,
    setHovered,
  ] = useHovered()

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
  /** id of the active location */
  const activeFeature = useActiveLocationFeature()
  /** boolean determining if the hovered location should show */
  const [showHovered] = useMarkersVisibility()
  /** function to add a location to the selected locations */
  const addLocation = useAddLocation()
  const addFeatureData = useData(state => state.addData)
  const [idMap, addToIdMap] = useIdMap()
  const flyToState = useFlyToState()
  const flyToFeature = useFlyToFeature()
  const flyToReset = useFlyToReset()
  const isLoaded = useRef(false)

  /** memoized array of shape and point layers */
  const layers = useMemo(() => {
    console.log('updating layers')
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
  /** object with class names for styling the component */
  // const classes = useStyles()

  /** handler for map hover */
  const handleHover = (feature, coords, geoCoords) => {
    // console.log(
    //   'handleHover in mapview, ',
    //   feature,
    //   coords,
    //   geoCoords,
    // )
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
    // if (id && id !== hoveredId) {
    //   addFeatureData(feature.properties)
    //   // add schools to the ID map
    //   // id.length === REGION_TO_ID_LENGTH['schools'] &&
    //   //   addToIdMap(feature.id, id)
    // }
    // setHovered(id, type, coords)
    setHovered(id, type, geoCoords, feature)
  }

  /** handler for map click */
  const handleClick = feature => {
    console.log('handle click, ', feature)
    // addLocation(feature)
    if (feature.source === 'schools') {
      console.log('school clicked, ', feature)
      window.location.href =
        window.location.origin +
        '/schools/' +
        feature.properties.SLN +
        '/'
    }
  }

  /** handler for map load */
  const handleLoad = () => {
    // inform global listener that map has loaded
    window.CPAL.trigger('map')
    // zoom to US if needed once cover is shown
    // setTimeout(() => {
    //   flyToReset()
    // }, 1000)
    isLoaded.current = true
  }

  /** zoom to filtered location when filter is selected */
  useEffect(() => {
    if (!prefix || prefix.length !== 2 || !isLoaded.current)
      return
    flyToState(prefix)
  }, [prefix, flyToState])

  /** zoom to activated location */
  useEffect(() => {
    if (activeFeature && isLoaded.current) {
      flyToFeature(activeFeature)
    }
  }, [activeFeature, flyToFeature])

  // const locationIds = getLocationIdsForRegion(
  //   region,
  //   locations,
  // )
  // selectedIds={locationIds}
  // selectedColors={selectedColors}

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
      defaultViewport={viewport}
      schoolZonesAffix={schoolZonesAffix}
    ></MapBase>
  )
}

export default MapView
