import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'zustand'
import useStore from './../store.js'
import { CoreButton } from './../../../core'
import { FiMenu } from 'react-icons/fi'

import './MenuButton.css'

/**
 * MenuButton toggles the menu.
 */
const MenuButton = () => {
  const store = useStore()
  const label = store.menuButtonLabel
  const handleClick = e => {
    console.log('Menu button clicked')
    e.preventDefault()
  }
  return (
    <CoreButton
      aria-label={label}
      onClick={handleClick}
      parentClasses="button-toggle-menu"
    >
      <FiMenu />
    </CoreButton>
  )
}

MenuButton.propTypes = {}

export default MenuButton
