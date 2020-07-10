import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from 'react'
import useResizeAware from 'react-resize-aware'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl'
import ReactMapGL, {
  NavigationControl,
  Popup,
} from 'react-map-gl'
import { fromJS } from 'immutable'
import PropTypes from 'prop-types'
import usePrevious from './../../../../../shared/hooks/usePrevious'
import { defaultMapStyle } from '../selectors'
import { getClosest } from '../utils'
import { useMapViewport, useFlyToReset } from '../store'
// import ZoomToControl from './ZoomToControl'
import useMapStore from '../store'
/**
 * Returns an array of layer ids for layers that have the
 * interactive property set to true
 */
const getInteractiveLayerIds = layers => {
  // console.log('getInteractiveLayerIds', layers)
  layers
    .filter(l => l.style.get('interactive'))
    .map(l => l.style.get('id'))
}

const matchFeatureId = (layer, id) => {
  return
}

/**
 * Returns the map style with the provided layers inserted
 * @param {Map} style immutable Map of the base mapboxgl style
 * @param {array} layers list of layer objects containing style and z order
 */
const getUpdatedMapStyle = (
  style,
  layers,
  sources = fromJS({}),
) => {
  const updatedSources = style.get('sources').merge(sources)
  const updatedLayers = layers.reduce(
    (newLayers, layer) =>
      newLayers.splice(layer.z, 0, layer.style),
    style.get('layers'),
  )
  return style
    .set('sources', updatedSources)
    .set('layers', updatedLayers)
}

const MapBase = ({
  style,
  attributionControl,
  hovering,
  hoveredId,
  hoveredType,
  hoveredCoords,
  selectedIds,
  layers,
  sources,
  children,
  idMap,
  selectedColors,
  defaultViewport,
  ariaLabel,
  onHover,
  onClick,
  onLoad,
  schoolZonesAffix,
  ...rest
}) => {
  console.log('hoveredCoords, ', hoveredCoords)

  const [loaded, setLoaded] = useState(false)

  const [resizeListener, sizes] = useResizeAware()

  const [viewport, setViewport] = useMapViewport()

  const setResetViewport = useMapStore(
    state => state.setResetViewport,
  )

  const flyToReset = useFlyToReset()

  // reference to map container DOM element
  const mapEl = useRef(null)

  // refernce to the ReactMapGL instance
  const mapRef = useRef(null)

  const currentMap =
    mapRef &&
    mapRef.current &&
    mapRef.current.getMap &&
    mapRef.current.getMap()

  // canvas element
  const canvas =
    currentMap &&
    currentMap.getCanvas &&
    currentMap.getCanvas()

  // storing previous hover / selected IDs
  const prev = usePrevious({
    hoveredId,
    hoveredType,
    selectedIds,
  })

  const setFeatureState = useCallback(
    (featureId, type, state) => {
      if (
        !loaded ||
        !featureId ||
        !currentMap ||
        !currentMap.setFeatureState
      )
        return
      // console.log(
      //   'setFeatureStateNew',
      //   featureId,
      //   type,
      //   state,
      // )
      // console.log('layers = ', layers)
      const layer = layers.find(l => l.type === type)
      // console.log('layer = ', layer)
      const id = idMap[featureId]
        ? idMap[featureId]
        : featureId
      if (layer) {
        const source = {
          source: layer.style.get('source'),
          id,
        }
        currentMap.setFeatureState(source, state)
      }
    },
    [layers, idMap, currentMap, loaded],
  )

  /**
   * Sets the feature state for rendering styles
   * @param {string} featureId
   * @param {object} state
   */
  // const setFeatureState = useCallback(
  //   (featureId, type, state) => {
  //     if (
  //       !loaded ||
  //       !featureId ||
  //       !currentMap ||
  //       !currentMap.setFeatureState
  //     )
  //       return
  //     console.log('setFeatureState', featureId, type, state)
  //     const layer = layers.find(
  //       l => l.hasFeatureId && l.hasFeatureId(featureId),
  //     )
  //     console.log('layer = ', layer)
  //     const id = idMap[featureId]
  //       ? idMap[featureId]
  //       : featureId
  //     if (layer) {
  //       const source = {
  //         source: layer.style.get('source'),
  //         // sourceLayer: layer.style.get('source-layer'),
  //         id,
  //       }
  //       currentMap.setFeatureState(source, state)
  //     }
  //   },
  //   [layers, idMap, currentMap, loaded],
  // )

  // update map style layers when layers change
  const mapStyle = useMemo(
    () => getUpdatedMapStyle(style, layers, sources),
    [style, layers, sources],
  )

  // update list of interactive layer ids when layers change
  const interactiveLayerIds = useMemo(
    () => getInteractiveLayerIds(layers),
    [layers],
  )

  useEffect(() => {
    if (canvas) {
      canvas.setAttribute('aria-label', ariaLabel)
    }
  }, [ariaLabel, canvas])

  // handler for map load
  const handleLoad = e => {
    if (!loaded) {
      setLoaded(true)
      // HACK: remove tabindex from map div
      const tabindexEl = document.querySelector(
        '.map:first-child',
      )
      if (tabindexEl) {
        tabindexEl.children[0].removeAttribute('tabindex')
      }
      // add screen reader content for map
      if (canvas) {
        canvas.setAttribute('role', 'img')
        canvas.setAttribute('aria-label', ariaLabel)
      }
      // add geolocation
      const geolocateControl = new mapboxgl.GeolocateControl(
        {
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
        },
      )
      const controlContainer = document.querySelector(
        '.map__zoom:first-child',
      )
      if (controlContainer && currentMap) {
        controlContainer.appendChild(
          geolocateControl.onAdd(currentMap),
        )
      }
      // trigger load callback
      if (typeof onLoad === 'function') {
        onLoad(e)
      }
    }
  }

  // handler for viewport change, debounced to prevent
  // race errors
  const handleViewportChange = useCallback(
    (vp, options = {}) => {
      if (!loaded) return
      if (vp.zoom && vp.zoom < 2) return
      setViewport(vp)
    },
    [setViewport, loaded],
  )

  // handler for feature hover
  const handleHover = ({ features, point, srcEvent }) => {
    // console.log('handleHover, ', features, point)
    const newHoveredFeature =
      features && features.length > 0 ? features[0] : null
    const coords =
      srcEvent && srcEvent.pageX && srcEvent.pageY
        ? [
            Math.round(srcEvent.pageX),
            Math.round(srcEvent.pageY),
          ]
        : null
    const geoCoordinates =
      newHoveredFeature && newHoveredFeature.geometry
        ? newHoveredFeature.geometry.coordinates
        : null
    onHover(newHoveredFeature, coords, geoCoordinates)
  }

  // handler for feature click
  const handleClick = ({ features, srcEvent, ...rest }) => {
    // was the click on a control
    const isControl = getClosest(
      srcEvent.target,
      '.mapboxgl-ctrl-group',
    )
    // activate feature if one was clicked and this isn't a control click
    features &&
      features.length > 0 &&
      !isControl &&
      onClick(features[0])
  }

  // set the default / reset viewport when it changes
  useEffect(() => {
    setResetViewport(defaultViewport)
  }, [defaultViewport, setResetViewport])

  // set the default viewport on mount
  useEffect(() => {
    defaultViewport && setViewport(defaultViewport)
  }, [])

  // set the map dimensions when the size changes
  useEffect(() => {
    setViewport({
      width: sizes.width,
      height: sizes.height,
    })
  }, [sizes, setViewport])

  // set hovered feature state when hoveredId changes
  useEffect(() => {
    // console.log('hoveredId changed, hoveredId', hoveredId)
    if (prev && prev.hoveredId && prev.hoveredType) {
      // Set state for unhovered school.
      setFeatureState(prev.hoveredId, prev.hoveredType, {
        hover: false,
      })
      // Set state for unhovered school zone.
      setFeatureState(
        schoolZonesAffix + prev.hoveredId,
        'schoolzones',
        {
          hover: false,
        },
      )
    }
    if (hoveredId) {
      // Set state for hovered school.
      setFeatureState(hoveredId, hoveredType, {
        hover: true,
      })
      // Set state for hovered school zone.
      setFeatureState(
        schoolZonesAffix + hoveredId,
        'schoolzones',
        {
          hover: true,
        },
      )
    }
    // eslint-disable-next-line
  }, [hoveredId, loaded]) // update only when hovered id changes

  // set selected outlines when selected IDs change
  // useEffect(() => {
  //   prev &&
  //     prev.selectedIds &&
  //     prev.selectedIds.forEach(id =>
  //       setFeatureState(id, { selected: false }),
  //     )
  //   selectedIds.forEach((id, i) =>
  //     setFeatureState(id, {
  //       selected: selectedColors[i % selectedColors.length],
  //     }),
  //   )
  //   // eslint-disable-next-line
  // }, [selectedIds, loaded]) // update only when selected ids change

  /** handler for resetting the viewport */
  const handleResetViewport = e => {
    e.preventDefault()
    flyToReset()
  }

  const getCursor = () => {
    return !!hoveredId ? 'pointer' : 'grab'
  }

  return (
    <>
      <div
        id="map"
        className="map"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
        ref={mapEl}
        onMouseLeave={() =>
          handleHover({
            features: null,
            point: [null, null],
          })
        }
      >
        {resizeListener}
        <ReactMapGL
          ref={mapRef}
          attributionControl={attributionControl}
          mapStyle={mapStyle}
          dragRotate={false}
          touchRotate={false}
          dragPan={true}
          touchZoom={true}
          interactiveLayerIds={interactiveLayerIds}
          onViewportChange={handleViewportChange}
          onHover={handleHover}
          getCursor={getCursor}
          onClick={handleClick}
          onLoad={handleLoad}
          {...viewport}
          {...rest}
        >
          {!!hoveredId && (
            <Popup
              latitude={hoveredCoords[1]}
              longitude={hoveredCoords[0]}
              offsetTop={15}
              closeButton={true}
              closeOnClick={false}
              onClose={() =>
                this.setState({ showPopup: false })
              }
              anchor="top"
            >
              <div>You are here</div>
              <PopupContent />
            </Popup>
          )}
          <div className="map__zoom">
            <NavigationControl
              showCompass={false}
              onViewportChange={setViewport}
            />
          </div>
          {children}
        </ReactMapGL>
      </div>
    </>
  )
}

MapBase.defaultProps = {
  style: defaultMapStyle,
  idMap: {},
  layers: [],
  attributionControl: true,
  selectedColors: ['#00ff00'],
}

MapBase.propTypes = {
  style: PropTypes.object,
  layers: PropTypes.array,
  selectedIds: PropTypes.arrayOf(PropTypes.string),
  hoveredId: PropTypes.number,
  idMap: PropTypes.object,
  selectedColors: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node,
  onHover: PropTypes.func,
  onClick: PropTypes.func,
  onLoad: PropTypes.func,
}

export default MapBase
