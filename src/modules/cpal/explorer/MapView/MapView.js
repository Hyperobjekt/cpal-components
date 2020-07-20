import React, { useMemo, useEffect, useRef } from 'react'
import shallow from 'zustand/shallow'
import { makeStyles } from '@material-ui/core'
import { getLayers, CPAL_SOURCES } from './selectors'
import {} from './selectors'
import MapBase, {
  useFlyToState,
  useFlyToFeature,
  useFlyToReset,
  useIdMap,
} from './../Map'
import MapLegend from './../Map'
import {
  getSelectedColors,
  getFeatureProperty,
  getLocationIdsForRegion,
} from './../selectors'
import { getLang } from './../selectors/lang'
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
import { REGION_TO_ID_LENGTH } from './../../../../constants/regions'
import useData from './../hooks/useData'
import useStore from './../store'

import './MapView.scss'

const selectedColors = getSelectedColors()

const useStyles = makeStyles(theme => ({
  legend: {
    position: 'absolute',
    bottom: 24,
    right: 16,
  },
}))

const MapView = props => {
  /** current options for the map */
  const [metric, demographic, region] = useActiveOptionIds()
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
    state => Object.values(state.activeLayers),
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
  /** memoized array of choropleth and dot layers */
  const layers = useMemo(() => {
    if (!metric || !demographic || !region) {
      return []
    }
    const context = { region, metric, demographic }
    return getLayers(context, activeLayers)
  }, [region, metric, demographic])

  /** aria label for screen readers */
  const ariaLabel = getLang('UI_MAP_SR', {
    metric: getLang('LABEL_' + metric),
    region: getLang('LABEL_' + region),
    demographic: getLang('LABEL_STUDENTS_' + demographic),
  })
  /** object with class names for styling the component */
  const classes = useStyles()

  /** handler for map hover */
  const handleHover = (feature, coords, geoCoords) => {
    // console.log('handleHover, ', feature, coords, geoCoords)
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
      // console.log('School circle hovered.')
      type = `schools`
      // console.log('handleHover, ', feature, coords)
      id = getFeatureProperty(feature, 'tea_id')
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
    addLocation(feature)
  }

  /** handler for map load */
  const handleLoad = () => {
    // inform global listener that map has loaded
    window.SEDA.trigger('map')
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

  const locationIds = getLocationIdsForRegion(
    region,
    locations,
  )

  return (
    <MapBase
      selectedColors={selectedColors}
      sources={CPAL_SOURCES}
      layers={layers}
      idMap={idMap}
      selectedIds={locationIds}
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
