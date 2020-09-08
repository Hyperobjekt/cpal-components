import React from 'react'
import PropTypes from 'prop-types'
import ReactEcharts from 'echarts-for-react'
import clsx from 'clsx'
import i18n from '@pureartisan/simple-i18n'
import echarts from 'echarts/lib/echarts'
// import { Col } from 'reactstrap'
import { FaExternalLinkSquareAlt } from 'react-icons/fa'

import {
  // CPAL_METRICS,
  // CPAL_FEEDERS,
  CPAL_FEEDER_TIP_ITEMS,
} from './../../../../constants/metrics'
// import {
//   CRI_COLORS,
//   ECON_COLORS,
//   EDU_COLORS,
//   FAM_COLORS,
//   HEL_COLORS,
//   COMM_COLORS,
// } from './../../../../constants/colors'
import useStore from './../store'
import {
  // getMetric,
  getRoundedValue,
  toTitleCase,
  getFeederAverage,
  getFeederLabel,
  getSchoolSet,
} from './../utils'
// import { schools } from './../../../../data/schools'

const FeederLegendContent = ({ ...props }) => {
  // Currently active (hovered) feeder
  // Stores the SLN of the feeder
  const activeFeeder = useStore(state => state.activeFeeder)
  const feederLocked = useStore(state => state.feederLocked)
  const breakpoint = useStore(state => state.breakpoint)
  // console.log('breakpoint, ', breakpoint)

  return (
    <>
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
              <a
                href={'/schools/' + el.TEA + '/'}
                target="_blank"
                rel="noreferrer"
              >
                <FaExternalLinkSquareAlt />
              </a>
            </span>
          )
        })}
      </div>
    </>
  )
}

export default FeederLegendContent
