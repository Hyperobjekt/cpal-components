import React, { useState } from 'react'
import PropTypes from 'prop-types'
import i18n from '@pureartisan/simple-i18n'
import { Button, Label, Input, Tooltip } from 'reactstrap'
import clsx from 'clsx'
import {
  FiFilter,
  FiMap,
  FiList,
  FiMenu,
  FiInfo,
} from 'react-icons/fi'
import { MdCallSplit } from 'react-icons/md'

import useStore from './../store'
import {
  CPAL_LAYERS,
  CPAL_LAYER_GROUPS,
} from './../../../../constants/layers'

const PanelLayersView = ({ ...props }) => {
  const activeLayers = useStore(state => state.activeLayers)
  const setActiveLayers = useStore(
    state => state.setActiveLayers,
  )

  const getLayerLabel = id => {
    const layer = CPAL_LAYERS.find(gr => gr.id === id)
    return layer.label
  }

  const updateLayers = e => {
    console.log(
      'updateLayers, ',
      e.currentTarget,
      e.currentTarget.checked,
    )
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
          activeLayers[el.index] = 0
        }
      })
    }
    // Reset activeLayers array.
    // if (!!e.currentTarget.checked) {
    //   console.log('is checked')
    //   // Checked.
    //   activeLayers[index] = 1
    //   setActiveLayers(activeLayers)
    // } else {
    //   console.log('not checked')
    //   // Not checked.
    //   activeLayers[index] = 0
    //   setActiveLayers(activeLayers)
    // }
    activeLayers[index] = activeLayers[index] === 1 ? 0 : 1
    setActiveLayers(activeLayers)
    console.log('activeLayers, ', activeLayers)
  }

  // const getContents = () => {
  //   // Right now, just check for feeder OR map.
  //   // if (activeView === 'feeder') {
  //   //   return i18n.translate('UI_PANEL_INFO_FEEDER')
  //   // } else {
  //   //   return i18n.translate('UI_PANEL_INFO_MAP')
  //   // }
  // }
  return (
    <div className="map-panel-slideout-layers">
      <div className={clsx(`map-layer-toggle-pane`)}>
        {CPAL_LAYER_GROUPS.map((el, i) => {
          return (
            <div
              className={clsx(
                'layer-group',
                'layer-group-' + i,
              )}
              key={'layer-group-' + i}
            >
              <h5 key={'layer-group-header-' + i}>
                {i18n.translate(el.title)}
              </h5>
              <div
                key={'layer-group-desc-' + i}
                className="layer-group-desc"
                dangerouslySetInnerHTML={{
                  __html: i18n.translate(el.desc),
                }}
              ></div>
              <div
                className={clsx(
                  'layer-group',
                  'layer-group-layers-' + i,
                )}
                key={'layer-group-layers-' + i}
              >
                {CPAL_LAYERS.filter(item => {
                  return item.group === el.id
                }).map((layer, i) => {
                  // to manage tooltip state
                  const [
                    tooltipOpen,
                    setTooltipOpen,
                  ] = useState(false)
                  const toggle = () =>
                    setTooltipOpen(!tooltipOpen)
                  return (
                    <div
                      className="layer"
                      key={`layer-${layer.id}`}
                      id={`layer-${layer.id}`}
                    >
                      <label
                        key={`label-${layer.id}`}
                        id={`label-${layer.id}`}
                      >
                        <input
                          type="checkbox"
                          id={'layer_' + layer.index}
                          name="scales"
                          key={'layer-input-' + layer.id}
                          data-only-one={layer.only_one}
                          data-only-one-name={
                            layer.only_one_name
                          }
                          checked={
                            activeLayers[
                              Number(layer.index)
                            ] === 1
                              ? true
                              : false
                          }
                          readOnly={true}
                          onClick={e => {
                            updateLayers(e)
                          }}
                        />
                        <div className="checkmark"></div>
                        {i18n.translate(
                          getLayerLabel(layer.id),
                        )}
                        {!!el.tooltip &&
                          el.tooltip.length > 0 && (
                            <FiInfo
                              id={'tip_prompt_' + layer.id}
                            />
                          )}
                      </label>
                      {!!el.tooltip &&
                        el.tooltip.length > 0 && (
                          <Tooltip
                            placement="top"
                            isOpen={tooltipOpen}
                            target={
                              'tip_prompt_' + layer.id
                            }
                            toggle={toggle}
                            autohide={false}
                            className={'tip-prompt-layer'}
                            dangerouslySetInnerHTML={{
                              __html: i18n.translate(
                                layer.tooltip,
                              ),
                            }}
                          ></Tooltip>
                        )}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PanelLayersView
