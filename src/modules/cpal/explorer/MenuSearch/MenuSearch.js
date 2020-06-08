import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'zustand'
import useStore from './../store.js'
import { Search } from './../../../core'

import './MenuSearch.css'

/**
 * MenuButton Menu toggle for header
 */
const MenuSearch = () => {
  const store = useStore()
  const label = store.menuButtonLabel
  const classes = `menu-search`
  const colorClass = `secondary`
  const handleSearch = e => {
    console.log('Search button clicked')
    e.preventDefault()
  }
  return (
    <Search
      parentClasses={classes}
      colorClass={colorClass}
      label={label}
      handleSearch={handleSearch}
    />
  )
}

MenuSearch.propTypes = {}

export default MenuSearch
