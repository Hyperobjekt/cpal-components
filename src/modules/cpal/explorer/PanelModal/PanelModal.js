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

import useStore from './../store'
import { CoreButton } from './../../../core'
import PanelFilterView from './../PanelFilterView/PanelFilterView'
import PanelLayersView from './../PanelLayersView/PanelLayersView'
import PanelInfoView from './../PanelInfoView/PanelInfoView'

const PanelModal = ({ children, ...props }) => {
  // Generic store value setter.
  const setStoreValues = useStore(
    state => state.setStoreValues,
  )
  // Track and update intro modal display
  const showPanelModal = useStore(
    state => state.showPanelModal,
  )
  // Toggle panel modal display state.
  const togglePanelModal = () => {
    setStoreValues({ showPanelModal: !showPanelModal })
  }

  const slideoutPanel = useStore(
    state => state.slideoutPanel,
  )
  return (
    <Modal
      isOpen={showPanelModal}
      toggle={togglePanelModal}
      className={clsx(
        'panel-modal',
        slideoutPanel.panel.length > 0
          ? 'panel-view-' + slideoutPanel.panel
          : 'panel-view-none',
      )}
      backdrop={true}
      keyboard={true}
      autoFocus={true}
      centered={true}
      height={'65vh'}
      width={'90%'}
    >
      <ModalHeader toggle={togglePanelModal}></ModalHeader>
      <ModalBody>
        <PanelFilterView />
        <PanelLayersView />
        <PanelInfoView />
      </ModalBody>
    </Modal>
  )
}

PanelModal.propTypes = {}

export default PanelModal
