import React, { useState } from 'react'
import i18n from '@pureartisan/simple-i18n'
import { Button } from 'reactstrap'
import clsx from 'clsx'
import { FaRedo } from 'react-icons/fa'

import en_US from './../../../../../constants/en_US'
import './MapResetButton.scss'

const MapResetButton = ({ ...props }) => {
  i18n.init({
    locale: 'en_US',
    languages: {
      en_US: en_US,
    },
  })
  //mapboxgl-ctrl-icon

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
    >
      <FaRedo className="icon" />
      <span className="sr-only">
        {i18n.translate(`UI_MAP_RESET`)}
      </span>
    </Button>
  )
}

export default MapResetButton
