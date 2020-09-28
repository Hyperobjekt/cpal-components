import React, { useState } from 'react'
import i18n from '@pureartisan/simple-i18n'
import clsx from 'clsx'
import { MdRefresh } from 'react-icons/md'

import { DEFAULT_VIEWPORT } from './../../../../../constants/map'
import { CoreButton } from './../../../../core'
import useStore from './../../store'

/**
 * Button to reset zoom and pan to default viewport settings
 */
const MapResetButton = ({ ...props }) => {
  // Generic state updates for store.
  // Accepts an object of values to update.
  const setStoreValues = useStore(
    state => state.setStoreValues,
  )
  const resetViewport = props.resetViewport
  const viewport = useStore(state => state.viewport)
  const interactionsMobile = useStore(
    state => state.interactionsMobile,
  )
  const eventMapReset = useStore(
    state => state.eventMapReset,
  )

  const handleReset = e => {
    if (
      viewport.zoom !== DEFAULT_VIEWPORT.zoom ||
      viewport.latitude !== DEFAULT_VIEWPORT.latitude ||
      viewport.longitude !== DEFAULT_VIEWPORT.longitude
    ) {
      resetViewport(e)
      setStoreValues({ eventMapReset: eventMapReset + 1 })
    }
  }

  return (
    <CoreButton
      color="none"
      active={true}
      id="map_reset_button"
      className={clsx(
        `map-reset-btn`,
        `mapboxgl-ctrl-icon`,
      )}
      onClick={e => {
        handleReset(e)
      }}
      label={i18n.translate(`UI_MAP_RESET`)}
      tooltip={!!interactionsMobile ? '' : 'left'}
    >
      <MdRefresh className="icon" />
      <span className="sr-only">
        {i18n.translate(`UI_MAP_RESET`)}
      </span>
    </CoreButton>
  )
}

export default MapResetButton
