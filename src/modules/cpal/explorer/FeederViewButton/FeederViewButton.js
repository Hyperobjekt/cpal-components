import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'zustand'
import useStore from './../store.js'
import { CoreButton } from './../../../core'
import { FiList } from 'react-icons/fi'

import './FeederViewButton.css'

/**
 * FeederViewButton Toggles feeder view.
 */
const FeederViewButton = () => {
  const store = useStore()
  const label = store.feederViewButtonLabel
  const handleClick = e => {
    e.preventDefault()
    console.log('Feeder button clicked')
  }
  return (
    <CoreButton
      aria-label={label}
      onClick={handleClick}
      bsColor="light"
      parentClasses="button-view-feeder"
    >
      <FiList />
    </CoreButton>
  )
}

FeederViewButton.propTypes = {}

export default FeederViewButton
