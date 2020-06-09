import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'zustand'
import useStore from './../store.js'
import { CoreButton } from './../../../core'
import { FiFilter } from 'react-icons/fi'

import './FiltersButton.css'

/**
 * FiltersButton toggles filter options
 */
const FiltersButton = () => {
  const store = useStore()
  const label = store.filtersButtonLabel
  const handleClick = e => {
    console.log('Filters button clicked')
    e.preventDefault()
  }
  return (
    <CoreButton
      className="float-right"
      aria-label={label}
      onClick={handleClick}
      bsColor="light"
    >
      <FiFilter />
    </CoreButton>
  )
}

FiltersButton.propTypes = {}

export default FiltersButton
