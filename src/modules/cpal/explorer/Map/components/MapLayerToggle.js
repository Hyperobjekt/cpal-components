import React, { useState } from 'react'
import i18n from '@pureartisan/simple-i18n'
import { Button, Label, Input, Tooltip } from 'reactstrap'
import { FiLayers } from 'react-icons/fi'
import clsx from 'clsx'
import { FiInfo } from 'react-icons/fi'

import { CoreButton } from './../../../../core'
import useStore from './../../store'
import { CPAL_LAYER_GROUPS } from './../../../../../constants/layers'

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

  // to manage tooltip state
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const toggle = () => setTooltipOpen(!tooltipOpen)

  const getLayerLabel = id => {
    const layer = CPAL_LAYER_GROUPS.find(gr => gr.id === id)
    return layer.label
  }

  const updateLayers = e => {
    // console.log('updateLayers, ', e.currentTarget)
    // If item is checked, if it's not in array, push it into array
    // If item is not checked, if it's in array, remove
    const index = Number(
      String(e.currentTarget.id).replace('layer_', ''),
    )
    if (!!e.currentTarget.checked) {
      // Checked.
      activeLayers[index] = 1
      setActiveLayers(activeLayers)
    } else {
      // Not checked.
      activeLayers[index] = 0
      setActiveLayers(activeLayers)
    }
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
        {CPAL_LAYER_GROUPS.map((el, i) => {
          // console.log(
          //   'CPAL_LAYER_GROUPS, ',
          //   el,
          //   activeLayers &&
          //     activeLayers.indexOf(el.id) > -1,
          // )
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

// <CoreButton
//   id={'button_toggle_layer_info_' + el.id}
//   label={i18n.translate(el.tooltip)}
//   tooltip="top"
//   tooltipAutoHide="false"
//   onClick={null}
//   color="none"
//   styles={{ display: 'none' }}
//   className={clsx('button-layer-info')}
// >
//   <FiInfo />
//   <span className="sr-only">
//     {i18n.translate(el.tooltip)}
//   </span>
// </CoreButton>
//
