import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'zustand'
import useStore from './../store.js'
import { Select } from './../../../core'

import './ViewSelect.css'

const ViewSelect = () => {
  const store = useStore()
  const parentClasses = `view-select`
  const label = store.viewSelectLabel
  const items = store.viewSelect
  const handleSelect = e => {
    console.log('View selected')
    e.preventDefault()
  }
  return (
    <Select
      color="primary"
      parentClasses={parentClasses}
      label={label}
      items={items}
      handleSelect={handleSelect}
    />
  )
}

ViewSelect.propTypes = {}

export default ViewSelect
