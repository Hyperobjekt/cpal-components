import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import shallow from 'zustand/shallow'
import i18n from '@pureartisan/simple-i18n'

import useStore from './../store'
import {
  DEMO_MAX_PERCENTS,
  CPAL_LAYERS,
} from './../../../../constants/layers'
import { getRoundedValue } from './../utils'

const CensusScale = ({ ...props }) => {
  // Max for the scale.
  const [scaleMax, setScaleMax] = useState(100)
  // Active layers
  const activeLayers = useStore(
    state => [...state.activeLayers],
    shallow,
  )
  // Update scale max when the active layer changes.
  useEffect(() => {
    // console.log(
    //   'activelayers changed, updating max scale value in legend',
    // )
    let newMax = null
    switch (true) {
      case !!activeLayers[2]:
        setScaleMax(
          getRoundedValue(
            DEMO_MAX_PERCENTS[CPAL_LAYERS[2].metric] * 100,
            2,
            false,
          ),
        )
        break
      case !!activeLayers[3]:
        setScaleMax(
          getRoundedValue(
            DEMO_MAX_PERCENTS[CPAL_LAYERS[3].metric] * 100,
            2,
            false,
          ),
        )
        break
      case !!activeLayers[4]:
        setScaleMax(
          getRoundedValue(
            DEMO_MAX_PERCENTS[CPAL_LAYERS[4].metric] * 100,
            2,
            false,
          ),
        )
        break
      case !!activeLayers[5]:
        setScaleMax(
          getRoundedValue(
            DEMO_MAX_PERCENTS[CPAL_LAYERS[5].metric] * 100,
            2,
            false,
          ),
        )
        break
      default:
      // code block
    }
  }, [activeLayers])

  return (
    <div className="census-scale">
      <h5>{i18n.translate('UI_MAP_LAYER_1_TITLE')}</h5>
      <div className="scale-parent">
        <div className="scale-block scale-block-0"></div>
        <div className="scale-block scale-block-1"></div>
        <div className="scale-block scale-block-2"></div>
        <div className="scale-block scale-block-3"></div>
        <div className="scale-block scale-block-4"></div>
        <div className="scale-block scale-block-5"></div>
      </div>
      <div className="scale-range">
        <div className="scale-range-minmax min">0%</div>
        <div className="scale-range-minmax max">
          {scaleMax}%
        </div>
      </div>
    </div>
  )
}

export default CensusScale
