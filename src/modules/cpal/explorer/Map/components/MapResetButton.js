import React, { useState } from 'react'
import i18n from '@pureartisan/simple-i18n'
import clsx from 'clsx'
import { MdRefresh } from 'react-icons/md'

import { CoreButton } from './../../../../core'

import './MapResetButton.scss'

/**
 * Button to reset zoom and pan to default viewport settings
 */
const MapResetButton = ({ ...props }) => {
  const resetViewport = props.resetViewport

  return (
    <CoreButton
      color="light"
      active={true}
      className={clsx(
        `map-reset-btn`,
        `mapboxgl-ctrl-icon`,
      )}
      onClick={e => {
        resetViewport(e)
      }}
      title={i18n.translate(`UI_MAP_RESET`)}
    >
      <MdRefresh className="icon" />
      <span className="sr-only">
        {i18n.translate(`UI_MAP_RESET`)}
      </span>
    </CoreButton>
  )
}

export default MapResetButton
