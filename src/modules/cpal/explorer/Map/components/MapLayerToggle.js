import React, { useState } from 'react'
import i18n from '@pureartisan/simple-i18n'
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from 'reactstrap'
import { FiLayers } from 'react-icons/fi'
import clsx from 'clsx'

import en_US from './../../../../../constants/en_US'
import useStore from './../../store'
import { CPAL_LAYER_GROUPS } from './../../../../../constants/layers'
import './MapLayerToggle.scss'

const MapLayerToggle = ({ ...props }) => {
  // if (!props.layers) {
  //   return
  // } else {
  //   console.log('MapLayerToggle layers: ', props.layers)
  // }
  i18n.init({
    locale: 'en_US',
    languages: {
      en_US: en_US,
    },
  })

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
    // console.log(
    //   'updateLayers, ',
    //   e.currentTarget,
    // )
    const index = activeLayers.findIndex(
      el => el.id === e.currentTarget.id,
    )
    activeLayers[index].active = e.currentTarget.checked
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
        {activeLayers.map(el => {
          return (
            <div className="layer" key={`layer-${el.id}`}>
              <label key={`label-${el.id}`}>
                <input
                  type="checkbox"
                  id={el.id}
                  name="scales"
                  key={el.id}
                  defaultChecked={el.active ? true : false}
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
        active={activeLayers.length > 0 ? true : false}
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
