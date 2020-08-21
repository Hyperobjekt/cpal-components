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
} from './../utils'

import useStore from './../store'
import { CoreButton } from './../../../core'
import SchoolSearch from './../SchoolSearch/SchoolSearch'
import {
  CPAL_FEEDERS,
  CPAL_FEEDER_TIP_ITEMS,
} from './../../../../constants/metrics'
import { schools } from './../../../../data/schools'

/**
 * Layout sets up the basic layout for the explorer.
 * @param Object children Child elements
 * @param Object props    Props passed from parent
 */
const FeederMobileModal = ({ children, ...props }) => {
  const activeFeeder = useStore(state => state.activeFeeder)
  const feederLocked = useStore(state => state.feederLocked)
  const breakpoint = useStore(state => state.breakpoint)
  // Track and update intro modal display
  const [showFeederModal, setShowFeederModal] = useState(
    !!activeFeeder &&
      !!feederLocked &&
      (breakpoint == 'xs' || breakpoint == 'sm'),
  )
  const toggleFeederModal = () =>
    setShowFeederModal(!showFeederModal)

  useEffect(() => {
    if (
      !!activeFeeder &&
      !!feederLocked &&
      (breakpoint == 'xs' || breakpoint == 'sm')
    ) {
      setShowFeederModal(true)
    } else {
      setShowFeederModal(false)
    }
  }, [activeFeeder, feederLocked])

  const feeders = CPAL_FEEDERS.slice()

  /**
   * Gets label for the feeder
   * @param  String tea TEA id for school
   * @return String     Label for the feeder
   */
  const getFeederLabel = tea => {
    // console.log('getFeederLabel()', tea, feeders)
    const feeder = feeders.find(el => {
      return Number(el.id) === Number(tea)
    })
    return feeder && feeder.title ? feeder.title : ''
  }

  /**
   * Gets the set of schools that are in a feeder
   * @return Array Array of school data objects
   */
  const getSchoolSet = feeder => {
    return schools.filter(el => {
      return Number(el.HIGH_SLN) === Number(feeder)
    })
  }

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
        <h2>
          {i18n.translate('UI_FEEDER_TITLE_FEEDER_CHART')}
        </h2>
        <h3>
          {getFeederLabel(activeFeeder) +
            ' ' +
            toTitleCase(
              i18n.translate('TERM_PLURAL', {
                term: i18n.translate('TERM_SCHOOL'),
              }),
            )}
        </h3>

        <div
          className="feeder-legend-metrics"
          aria-live="assertive"
        >
          <h4>
            {toTitleCase(
              i18n.translate('TERM_PLURAL', {
                term: i18n.translate(`TERM_INDEX_AVERAGE`),
              }),
            )}
          </h4>
          {CPAL_FEEDER_TIP_ITEMS.map(el => {
            return (
              <span
                id={'index_avg_' + el.id}
                key={'index_avg_' + el.id}
                className="feeder-index"
              >
                {i18n.translate(el.title)}:
                <span className="index-value">
                  {'   '}
                  {getRoundedValue(
                    getFeederAverage(
                      el.id,
                      getSchoolSet(activeFeeder),
                    ),
                    0,
                  )}
                </span>
              </span>
            )
          })}
          <i>
            {i18n.translate('UI_FEEDER_TOOLTIP_INDEX_DESC')}
          </i>
        </div>
        <div className="feeder-legend-schools">
          <h4>
            {toTitleCase(
              i18n.translate('TERM_PLURAL', {
                term: i18n.translate('TERM_SCHOOL'),
              }),
            )}
          </h4>
          {getSchoolSet(activeFeeder).map(el => {
            return (
              <span
                className="school"
                id={'school_' + el.TEA}
                key={'school_' + el.TEA}
              >
                {el.SCHOOLNAME}
              </span>
            )
          })}
        </div>
      </ModalBody>
    </Modal>
  )
}

FeederMobileModal.propTypes = {}

export default FeederMobileModal
