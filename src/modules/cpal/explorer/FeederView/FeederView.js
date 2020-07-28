import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ReactEcharts from 'echarts-for-react'
import { Row, Col } from 'reactstrap'
import clsx from 'clsx'
import i18n from '@pureartisan/simple-i18n'

import {
  CPAL_METRICS,
  CPAL_FEEDERS,
  CPAL_FEEDER_TIP_ITEMS,
} from './../../../../constants/metrics'
import { feeders } from './../../../../data/feeders'
import { schools } from './../../../../data/schools'
import {
  CRI_COLORS,
  ECON_COLORS,
  EDU_COLORS,
  FAM_COLORS,
  HEL_COLORS,
  COMM_COLORS,
} from './../../../../constants/colors'
import useStore from './../store'
import { getFeederSchools } from './../utils'
import FeederChart from './FeederChart'
import FeederSchoolsChart from './FeederSchoolsChart'

import './FeederView.scss'

/**
 * FeederView contains the feeder schools view.
 */
const FeederView = () => {
  const isLoaded = useRef(false)

  // Array of feeder school objects
  const feederSchools = useStore(
    state => state.feederSchools,
  )
  const setFeederSchools = useStore(
    state => state.setFeederSchools,
  )
  /**
   * On load, set feeder schools array of objects
   * @param  {[type]} console [description]
   * @return {[type]}         [description]
   */
  useEffect(() => {
    // console.log('loaded changed')
    // If feeder schools is empty, fetch the feeder schools (one time)
    if (feederSchools.length <= 0) {
      // console.log('fetching feeder schools')
      // const feederSchools = getFeederSchools()
      setFeederSchools(getFeederSchools())
    }
  }, [isLoaded])

  return (
    <Row className="layout-view-feeder">
      <Col
        xs="12"
        md="12"
        className="feeders-bar-chart"
        aria-label={i18n.translate(
          'UI_FEEDER_FEEDER_CHART_DESC',
        )}
      >
        <FeederChart />
      </Col>
      <Col
        xs="12"
        md="12"
        className="feeders-schools-scatter"
        aria-label={i18n.translate(
          'UI_FEEDER_SCHOOL_CHART_DESC',
        )}
      >
        <FeederSchoolsChart />
      </Col>
    </Row>
  )
}

FeederView.propTypes = {}

export default FeederView
