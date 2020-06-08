import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'zustand'
import useStore from './../store.js'
import { CoreButton } from './../../../core'
import { FiMenu } from 'react-icons/fi'

/**
 * MenuButton Menu toggle for header
 */
const MenuButton = () => {
  const store = useStore()
  const label = store.menuButtonLabel
  const handleClick = e => {
    // console.log('Menu button clicked')
    e.preventDefault()
  }
  return (
    <CoreButton
      className="float-right"
      aria-label={label}
      onClick={handleClick}
    >
      <FiMenu />
    </CoreButton>
  )
}

MenuButton.propTypes = {}

export default MenuButton
