import React from 'react'
import PropTypes from 'prop-types'
import ReactEcharts from 'echarts-for-react'
import clsx from 'clsx'
import i18n from '@pureartisan/simple-i18n'
import echarts from 'echarts/lib/echarts'
import { FaExternalLinkSquareAlt } from 'react-icons/fa'

import { CPAL_FEEDER_TIP_ITEMS } from './../../../../constants/metrics'
import useStore from './../store'
import {
  getRoundedValue,
  toTitleCase,
  getFeederAverage,
  getFeederLabel,
  getSchoolSet,
} from './../utils'

const FeederLegendContent = ({ ...props }) => {
  // Generic state updates for store.
  // Accepts an object of values to update.
  const setStoreValues = useStore(
    state => state.setStoreValues,
  )
  // Currently active (hovered) feeder
  // Stores the SLN of the feeder
  const activeFeeder = useStore(state => state.activeFeeder)
  const feederLocked = useStore(state => state.feederLocked)
  const breakpoint = useStore(state => state.breakpoint)
  // Track events for access of school page.
  const eventSchoolPage = useStore(
    state => state.eventSchoolPage,
  )
  // Track event when a school is accessed.
  const handleSchoolAccess = e => {
    const id = String(e.currentTarget.id).replace(
      'school_',
      '',
    )
    setStoreValues({
      accessedSchool: id,
      eventSchoolPage: eventSchoolPage + 1,
    })
  }

  return (
    <>
      <h2>
        {i18n.translate('UI_FEEDER_TITLE_FEEDER_CHART')}
      </h2>
      <hr />
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
              {i18n.translate(el.title)}
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
            <a
              href={'/schools/' + el.TEA + '/'}
              target="_blank"
              rel="noreferrer"
              className="school"
              id={'school_' + el.TEA}
              key={'school_' + el.TEA}
              onClick={e => handleSchoolAccess(e)}
            >
              <span>
                <FaExternalLinkSquareAlt /> {el.SCHOOLNAME}
              </span>
            </a>
          )
        })}
      </div>
    </>
  )
}

export default FeederLegendContent
