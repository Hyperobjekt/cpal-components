import React, { useState } from 'react'
import i18n from '@pureartisan/simple-i18n'
import { Button } from 'reactstrap'
import clsx from 'clsx'
import { FaRedo } from 'react-icons/fa'

import './MapResetButton.scss'

const MapResetButton = ({ ...props }) => {
  const resetViewport = props.resetViewport

  return (
    <Button
      color="secondary"
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
      <FaRedo className="icon" />
      <span className="sr-only">
        {i18n.translate(`UI_MAP_RESET`)}
      </span>
    </Button>
  )
}

export default MapResetButton
