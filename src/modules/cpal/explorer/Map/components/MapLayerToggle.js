import React, { useState } from 'react'
import i18n from '@pureartisan/simple-i18n'
import { Button, Label, Input, Tooltip } from 'reactstrap'
import { FiLayers } from 'react-icons/fi'
import clsx from 'clsx'
import { FiInfo } from 'react-icons/fi'

import { CoreButton } from './../../../../core'
import useStore from './../../store'
import { CPAL_LAYERS } from './../../../../../constants/layers'

/**
 * Provides toggle functionality for provided array of layer objects
 */
const MapLayerToggle = ({ ...props }) => {
  // Generic state updates for store.
  // Accepts an object of values to update.
  const setStoreValues = useStore(
    state => state.setStoreValues,
  )
  const activeLayers = useStore(state => state.activeLayers)
  // console.log('activeLayers, ', activeLayers)
  // const setActiveLayers = useStore(
  //   state => state.setActiveLayers,
  // )

  const getLayerLabel = id => {
    const layer = CPAL_LAYERS.find(gr => gr.id === id)
    return layer.label
  }

  const updateLayers = e => {
    // console.log('updateLayers, ', e.currentTarget)
    // If item is checked, if it's not in array, push it into array
    // If item is not checked, if it's in array, remove
    const index = Number(
      String(e.currentTarget.id).replace('layer_', ''),
    )
    // document.querySelector('[data-only_one="true"]')
    // If the element is an only-one element, reset other only-ones of same name.
    const el = document.getElementById(e.currentTarget.id)
    const dataset = el.dataset
    if (dataset.onlyOne === 'true') {
      // console.log('it is an only-one')
      const name = dataset.onlyOneName
      // Remove all the matching only-ones from the activeLayers array.
      CPAL_LAYERS.forEach((el, i) => {
        if (
          el.only_one === true &&
          el.only_one_name === name
        ) {
          activeLayers[i] = 0
        }
      })
    }
    // Reset activeLayers array.
    if (!!e.currentTarget.checked) {
      // Checked.
      activeLayers[index] = 1
      // setActiveLayers(activeLayers)
      setStoreValues({ activeLayers: activeLayers })
    } else {
      // Not checked.
      activeLayers[index] = 0
      // setActiveLayers(activeLayers)
      setStoreValues({ activeLayers: activeLayers })
    }
    // console.log('activeLayers, ', activeLayers)
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
        {CPAL_LAYERS.map((el, i) => {
          // to manage tooltip state
          const [tooltipOpen, setTooltipOpen] = useState(
            false,
          )
          const toggle = () => setTooltipOpen(!tooltipOpen)
          return (
            <div className="layer" key={`layer-${el.id}`}>
              <label
                key={`label-${el.id}`}
                id={`label-${el.id}`}
              >
                <input
                  type="checkbox"
                  id={'layer_' + i}
                  name="scales"
                  key={el.id}
                  data-only-one={el.only_one}
                  data-only-one-name={el.only_one_name}
                  checked={
                    activeLayers[i] === 1 ? true : false
                  }
                  readOnly={true}
                  onClick={e => {
                    updateLayers(e)
                  }}
                />
                <div className="checkmark"></div>
                {i18n.translate(getLayerLabel(el.id))}
                {!!el.tooltip && el.tooltip.length > 0 && (
                  <FiInfo id={'tip_prompt_' + el.id} />
                )}
              </label>
              {!!el.tooltip && el.tooltip.length > 0 && (
                <Tooltip
                  placement="top"
                  isOpen={tooltipOpen}
                  target={'tip_prompt_' + el.id}
                  toggle={toggle}
                  autohide={false}
                  className={'tip-prompt-layer'}
                  dangerouslySetInnerHTML={{
                    __html: i18n.translate(el.tooltip),
                  }}
                ></Tooltip>
              )}
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
