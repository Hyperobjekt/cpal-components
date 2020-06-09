import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'zustand'
import useStore from './../store.js'
import { CoreButton } from './../../../core'
import { MdCallSplit } from 'react-icons/md'

import './WeightButton.css'

/**
 * WeightButton toggles weighting options panel.
 */
const WeightButton = () => {
  const store = useStore()
  const label = store.weightButtonLabel
  const handleClick = e => {
    console.log('Weight button clicked')
    e.preventDefault()
  }
  return (
    <CoreButton
      className="float-right"
      aria-label={label}
      onClick={handleClick}
      bsColor="light"
    >
      <MdCallSplit />
    </CoreButton>
  )
}

WeightButton.propTypes = {}

export default WeightButton
