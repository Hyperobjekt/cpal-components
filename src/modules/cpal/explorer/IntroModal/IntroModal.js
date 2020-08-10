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
import SchoolSearch from './../SchoolSearch/SchoolSearch'

/**
 * Layout sets up the basic layout for the explorer.
 * @param Object children Child elements
 * @param Object props    Props passed from parent
 */
const IntroModal = ({ children, ...props }) => {
  // Track and update intro modal display
  const showIntroModal = useStore(
    state => state.showIntroModal,
  )
  const setShowIntroModal = useStore(
    state => state.setShowIntroModal,
  )
  const toggleIntroModal = () =>
    setShowIntroModal(!showIntroModal)

  /**
   * Close the intro panel and start the tour
   */
  const handleStartTour = () => {
    console.log('handleStartTour()')
  }

  /**
   * Navigate to FAQ page.
   */
  const handleGoToFAQ = () => {
    if (!!window) {
      const href = window.location.origin + '/faq/'
      window.location.href = href
    }
  }

  return (
    <Modal
      isOpen={showIntroModal}
      toggle={toggleIntroModal}
      className={'intro-modal'}
      backdrop={true}
      keyboard={true}
      autoFocus={true}
      centered={true}
    >
      <ModalHeader toggle={toggleIntroModal}></ModalHeader>
      <ModalBody>
        <h2>
          {i18n.translate('UI_MAP_INTRO_MODAL_HEADER')}
        </h2>
        <p>{i18n.translate('UI_MAP_INTRO_MODAL_INTRO')}</p>
        <div className="intro-modal-option">
          <p>{i18n.translate('UI_MAP_INTRO_MODAL_TOUR')}</p>
          <CoreButton
            color="light"
            label={i18n.translate(
              'UI_MAP_INTRO_MODAL_TOUR_BTN',
            )}
            onClick={handleStartTour}
          >
            <GiJourney />
            {i18n.translate('UI_MAP_INTRO_MODAL_TOUR_BTN')}
          </CoreButton>
        </div>
        <div className="intro-modal-option">
          <p>
            {i18n.translate('UI_MAP_INTRO_MODAL_SEARCH')}
          </p>
          <SchoolSearch />
        </div>
        <div className="intro-modal-option">
          <p>{i18n.translate('UI_MAP_INTRO_MODAL_FAQ')}</p>
          <CoreButton
            color="light"
            label={i18n.translate(
              'UI_MAP_INTRO_MODAL_TOUR_BTN',
            )}
            onClick={handleGoToFAQ}
          >
            <FaQuestion />
            {i18n.translate('UI_MAP_INTRO_MODAL_FAQ_BTN')}
          </CoreButton>
        </div>
        <div className="intro-modal-option">
          <p>{i18n.translate('UI_MAP_INTRO_MODAL_MAP')}</p>
          <CoreButton
            color="light"
            label={i18n.translate(
              'UI_MAP_INTRO_MODAL_MAP_BTN',
            )}
            onClick={toggleIntroModal}
          >
            <FiMap />
            {i18n.translate('UI_MAP_INTRO_MODAL_MAP_BTN')}
          </CoreButton>
        </div>
      </ModalBody>
    </Modal>
  )
}

IntroModal.propTypes = {}

export default IntroModal
