import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import shallow from 'zustand/shallow'
import i18n from '@pureartisan/simple-i18n'
import clsx from 'clsx'
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
} from 'reactstrap'
import { FiMap } from 'react-icons/fi'
import { FaQuestion } from 'react-icons/fa'
import { GiJourney } from 'react-icons/gi'

import {
  getMetric,
  getRoundedValue,
  toTitleCase,
  getFeederAverage,
  getFeederLabel,
  getSchoolSet,
} from './../utils'
import useStore from './../../store'
import PopupContent from './PopupContent'

/**
 * Layout sets up the basic layout for the explorer.
 * @param Object children Child elements
 * @param Object props    Props passed from parent
 */
const MapMobileModal = ({ children, ...props }) => {
  // const breakpoint = useStore(state => state.breakpoint)
  // Tracks whether or not to display map mobile modal
  const showMapModal = useStore(state => state.showMapModal)
  const setShowMapModal = useStore(
    state => state.setShowMapModal,
  )
  const toggleMapModal = () => {
    setShowMapModal(!showMapModal)
  }

  return (
    <Modal
      isOpen={showMapModal}
      toggle={toggleMapModal}
      className={'map-modal'}
      backdrop={true}
      keyboard={true}
      autoFocus={true}
      centered={true}
    >
      <ModalHeader toggle={toggleMapModal}></ModalHeader>
      <ModalBody>
        <PopupContent feature={props.hoveredFeature} />
      </ModalBody>
    </Modal>
  )
}

MapMobileModal.propTypes = {}

export default MapMobileModal
