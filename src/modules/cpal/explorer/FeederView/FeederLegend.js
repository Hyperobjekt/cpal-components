import React from 'react'
import PropTypes from 'prop-types'
import ReactEcharts from 'echarts-for-react'
import clsx from 'clsx'
import i18n from '@pureartisan/simple-i18n'
import echarts from 'echarts/lib/echarts'
import { Col } from 'reactstrap'

import {
  CPAL_METRICS,
  CPAL_FEEDERS,
  CPAL_FEEDER_TIP_ITEMS,
} from './../../../../constants/metrics'
import {
  CRI_COLORS,
  ECON_COLORS,
  EDU_COLORS,
  FAM_COLORS,
  HEL_COLORS,
  COMM_COLORS,
} from './../../../../constants/colors'
import useStore from './../store'
import {
  getMetric,
  getRoundedValue,
  toTitleCase,
  getFeederAverage,
} from './../utils'

const FeederLegend = ({ ...props }) => {
  // Currently active (hovered) feeder
  // Stores the SLN of the feeder
  const activeFeeder = useStore(state => state.activeFeeder)
  console.log('activeFeeder, ', activeFeeder)
  // Array of feeder school objects
  const feederSchools = useStore(
    state => state.feederSchools,
  )
  /**
   * Gets label for the feeder
   * @param  String tea TEA id for school
   * @return String     Label for the feeder
   */
  const getFeederLabel = tea => {
    const school = feederSchools.find(item => {
      return item.TEA_ID === Number(tea)
    })
    return school.feeder
  }
  /**
   * Gets the set of schools that are in a feeder
   * @return Array Array of school data objects
   */
  const getSchoolSet = feeder => {
    // console.log('getSchoolSet, ', feeder)
    // console.log('feederSchools, ', feederSchools)
    return feederSchools.filter(el => {
      return Number(el.feeder_sln) === Number(feeder)
    })
  }

  return (
    <div className="feeder-chart-legend">
      {!!activeFeeder ? (
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
                  term: i18n.translate(
                    `TERM_INDEX_AVERAGE`,
                  ),
                }),
              )}
            </h4>
            {CPAL_FEEDER_TIP_ITEMS.map(el => {
              return (
                <span
                  id={'index_avg_' + el.id}
                  key={'index_avg_' + el.id}
                >
                  {i18n.translate(el.title)}:{' '}
                  {getRoundedValue(
                    getFeederAverage(
                      el.id,
                      getSchoolSet(activeFeeder),
                    ),
                    0,
                  )}
                </span>
              )
            })}
            <i>
              {i18n.translate(
                'UI_FEEDER_TOOLTIP_INDEX_DESC',
              )}
            </i>
          </div>
          <div className="feeder-legend-schools">
            <h3>
              {toTitleCase(
                i18n.translate('TERM_PLURAL', {
                  term: i18n.translate('TERM_SCHOOL'),
                }),
              )}
            </h3>
            {getSchoolSet(activeFeeder).map(el => {
              return (
                <span
                  className="school"
                  id={'school_' + el.TEA_ID}
                  key={'school_' + el.TEA_ID}
                >
                  {el.schoolname}
                </span>
              )
            })}
          </div>
        </>
      ) : (
        <>
          <h2>
            {i18n.translate('UI_FEEDER_TITLE_FEEDER_CHART')}
          </h2>
          <div
            className="feeder-desc"
            dangerouslySetInnerHTML={{
              __html: i18n.translate(
                `UI_FEEDER_TITLE_FEEDER_DESC`,
              ),
            }}
          ></div>
        </>
      )}
    </div>
  )
}

export default FeederLegend
