import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import shallow from 'zustand/shallow'
import i18n from '@pureartisan/simple-i18n'
import clsx from 'clsx'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'

import useStore from './../store'
import FeederLegendContent from './FeederLegendContent'

/**
 * Layout sets up the basic layout for the explorer.
 * @param Object children Child elements
 * @param Object props    Props passed from parent
 */
const FeederMobileModal = ({ children, ...props }) => {
  const activeFeeder = useStore(state => state.activeFeeder)
  const feederLocked = useStore(state => state.feederLocked)
  const activeView = useStore(state => state.activeView)
  const breakpoint = useStore(state => state.breakpoint)
  // Track and update intro modal display
  const [showFeederModal, setShowFeederModal] = useState(
    !!activeFeeder &&
      !!feederLocked &&
      activeView === 'feeder' &&
      (breakpoint == 'xs' ||
        breakpoint == 'sm' ||
        breakpoint == 'md'),
  )
  const toggleFeederModal = () =>
    setShowFeederModal(!showFeederModal)

  useEffect(() => {
    if (
      !!activeFeeder &&
      !!feederLocked &&
      activeView === 'feeder' &&
      (breakpoint == 'xs' ||
        breakpoint == 'sm' ||
        breakpoint == 'md')
    ) {
      setShowFeederModal(true)
    } else {
      setShowFeederModal(false)
    }
  }, [activeFeeder, feederLocked])

  return (
    <Modal
      isOpen={showFeederModal}
      toggle={toggleFeederModal}
      className={'feeder-modal'}
      backdrop={true}
      keyboard={true}
      autoFocus={true}
      centered={true}
    >
      <ModalHeader toggle={toggleFeederModal}></ModalHeader>
      <ModalBody>
        <FeederLegendContent />
      </ModalBody>
    </Modal>
  )
}

FeederMobileModal.propTypes = {}

export default FeederMobileModal
