import React, { useState } from 'react'
import i18n from '@pureartisan/simple-i18n'
import { Button, Label, Input } from 'reactstrap'
import { FiLayers } from 'react-icons/fi'
import clsx from 'clsx'

import useStore from './../../store'
import { CPAL_LAYER_GROUPS } from './../../../../../constants/layers'
import './MapLayerToggle.scss'

/**
 * Provides toggle functionality for provided array of layer objects
 */
const MapLayerToggle = ({ ...props }) => {
  // if (!props.layers) {
  //   return
  // } else {
  //   console.log('MapLayerToggle layers: ', props.layers)
  // }

  const activeLayers = useStore(state => state.activeLayers)
  // console.log('activeLayers, ', activeLayers)
  const setActiveLayers = useStore(
    state => state.setActiveLayers,
  )

  const getLayerLabel = id => {
    const layer = CPAL_LAYER_GROUPS.find(gr => gr.id === id)
    return layer.label
  }

  const updateLayers = e => {
    // console.log('updateLayers, ', e.currentTarget)
    // If item is checked, if it's not in array, push it into array
    // If item is not checked, if it's in array, remove
    if (!!e.currentTarget.checked) {
      // Checked.
      if (
        activeLayers &&
        activeLayers.indexOf(e.currentTarget.id) <= -1
      ) {
        activeLayers.push(e.currentTarget.id)
        setActiveLayers(activeLayers)
      }
    } else {
      // Not checked.
      const index = activeLayers.indexOf(e.currentTarget.id)
      if (index > -1) {
        activeLayers.splice(index, 1)
        setActiveLayers(activeLayers)
      }
    }

    // Get map layer.
    const layer = CPAL_LAYER_GROUPS.find(
      el => el.id === e.currentTarget.id,
    )
    // Get current visibility for each type in the map layer.
    layer.types.forEach(el => {
      const visibility = props.currentMap.getLayoutProperty(
        el,
        'visibility',
      )
      // toggle layer visibility by changing the layout object's visibility property
      props.currentMap.setLayoutProperty(
        el,
        'visibility',
        !!e.currentTarget.checked ? 'visible' : 'none',
      )
    })
  }

  const [showPanel, setShowPanel] = useState(false)

  return (
    <div className="map-layer-toggle">
      <div
        className={clsx(
          `map-layer-toggle-pane`,
          showPanel ? 'panel-show' : 'panel-hide',
        )}
      >
        {CPAL_LAYER_GROUPS.map(el => {
          return (
            <div className="layer" key={`layer-${el.id}`}>
              <label key={`label-${el.id}`}>
                <input
                  type="checkbox"
                  id={el.id}
                  name="scales"
                  key={el.id}
                  defaultChecked={
                    activeLayers &&
                    activeLayers.indexOf(el.id) > -1
                      ? true
                      : false
                  }
                  onChange={e => {
                    updateLayers(e)
                  }}
                />
                {i18n.translate(getLayerLabel(el.id))}
              </label>
            </div>
          )
        })}
      </div>
      <Button
        color="primary"
        className="map-layer-toggle-btn"
        onClick={() => setShowPanel(!showPanel)}
      >
        <FiLayers className="icon" />
        {i18n.translate(`UI_MAP_TOGGLE_LAYERS`)}
      </Button>
    </div>
  )
}

export default MapLayerToggle
