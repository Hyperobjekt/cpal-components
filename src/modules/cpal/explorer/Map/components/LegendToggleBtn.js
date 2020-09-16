import React, { useState } from 'react'
import i18n from '@pureartisan/simple-i18n'
import clsx from 'clsx'
import { MdRefresh } from 'react-icons/md'

import { CoreButton } from './../../../../core'
import useStore from './../../store'

/**
 * Button to toggle map legend display if legend is hidden.
 */
const LegendToggleBtn = ({ ...props }) => {
  const showMobileLegend = useStore(
    state => state.showMobileLegend,
  )
  const setShowMobileLegend = useStore(
    state => state.setShowMobileLegend,
  )
  // Current breakpoint.
  const breakpoint = useStore(state => state.breakpoint)

  const updateLegend = () => {
    console.log('updateLegend()')
    setShowMobileLegend(true)
  }

  if (
    !showMobileLegend &&
    (breakpoint === 'xs' || breakpoint === 'sm')
  ) {
    return (
      <CoreButton
        color=""
        active={true}
        id="map_legend_toggle"
        className={clsx(`map-legend-btn`)}
        onClick={() => {
          updateLegend()
        }}
        label={i18n.translate(`UI_MAP_SEE_LEGEND`)}
      >
        {i18n.translate(`UI_MAP_SEE_LEGEND`)}
      </CoreButton>
    )
  } else {
    return ''
  }
}

export default LegendToggleBtn
