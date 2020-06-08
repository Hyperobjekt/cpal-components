import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'zustand'
import useStore from './../store.js'
import { Button } from 'reactstrap'

const MenuButton = () => {
  const store = useStore()
  // const buttonProps = {
  //   label: store.menuButtonLabel,
  // }
  const label = store.menuButtonLabel
  return <Button>{label}</Button>
}

MenuButton.propTypes = {}

export default MenuButton
