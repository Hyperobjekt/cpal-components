import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'zustand'
import useStore from './../store.js'
import { CoreButton } from './../../../core'
import { FiMap } from 'react-icons/fi'

import './MapViewButton.css'

/**
 * MapViewButton Toggles map view
 */
const MapViewButton = ({ parentClasses }) => {
  const store = useStore()
  const label = store.mapViewButtonLabel
  const handleClick = e => {
    console.log('MapView button clicked')
    e.preventDefault()
  }
  return (
    <CoreButton
      aria-label={label}
      onClick={handleClick}
      bsColor="light"
      parentClasses="button-view-map"
    >
      <FiMap />
    </CoreButton>
  )
}

MapViewButton.propTypes = {}

export default MapViewButton
