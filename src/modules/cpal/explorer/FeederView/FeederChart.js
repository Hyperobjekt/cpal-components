import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ReactEcharts from 'echarts-for-react'
import clsx from 'clsx'
import i18n from '@pureartisan/simple-i18n'

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
  getFeederSchools,
  getSchoolZones,
  getMetric,
  getRoundedValue,
} from './../utils'

const FeederChart = ({ ...props }) => {
  // Currently active (hovered) feeder
  // Stores the SLN of the feeder
  // const activeFeeder = useStore(state => state.activeFeeder)
  const setActiveFeeder = useStore(
    state => state.setActiveFeeder,
  )
  const onFeederMouseover = e => {
    // console.log('onFeederMouseover, ', e)
    // If the hover event is for a bar, set activeFeeder
    if (e.componentSubType === 'bar') {
      setActiveFeeder(e.data.name)
    } else {
      setActiveFeeder(null)
    }
    // console.log('set activeFeeder to ', activeFeeder)
  }
  const onFeederMouseout = e => {
    // console.log('onFeederMouseout, ', e)
    setActiveFeeder(null)
  }
  const feederChartReady = e => {
    // console.log('feeder chart ready')
  }
  let feederEvents = {
    mouseover: onFeederMouseover,
    mouseout: onFeederMouseout,
  }
  return (
    <ReactEcharts
      onEvents={feederEvents}
      onChartReady={feederChartReady}
      {...props}
    />
  )
}

export default FeederChart
