import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ReactEcharts from 'echarts-for-react'
import clsx from 'clsx'
import i18n from '@pureartisan/simple-i18n'
// import echarts from 'echarts/lib/echarts'

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
  getMetric,
  getRoundedValue,
  toTitleCase,
} from './../utils'

const FeederChart = ({ ...props }) => {
  // Currently active (hovered) feeder
  // Stores the SLN of the feeder
  const activeFeeder = useStore(state => state.activeFeeder)
  const setActiveFeeder = useStore(
    state => state.setActiveFeeder,
  )
  // Whether feeder is "locked" by click
  const feederLocked = useStore(state => state.feederLocked)
  const setFeederLocked = useStore(
    state => state.setFeederLocked,
  )
  // Array of feeder school objects
  const feederSchools = useStore(
    state => state.feederSchools,
  )
  /**
   * Gets the set of schools that are in a feeder
   * @return Array Array of school data objects
   */
  const getSchoolSet = feeder => {
    return feederSchools.filter(el => {
      return el.feeder_sln === feeder
    })
  }

  const getFeederAverage = (metric, schoolSet) => {
    // Get all the schools that are in that
    // console.log('getFeederAverage, ', schoolSet)
    const values = []
    schoolSet.forEach(el => {
      values.push(el[metric])
    })
    let total = 0
    values.forEach(v => (total = total + v))
    return total / values.length
  }

  /**
   * Builds feeder bar chart data set.
   * @return Array Array of objects
   */
  const buildFeederData = () => {
    const feederData = []
    CPAL_FEEDERS.forEach(el => {
      feederData.push({
        name: el.title,
        id: el.id,
        label: el.title,
        value: getFeederAverage('cri', getSchoolSet(el.id)),
      })
    })
    // Sort ascending by cri average
    feederData.sort((a, b) => a.value - b.value)
    return feederData
  }

  const onFeederMouseover = e => {
    // console.log('onFeederMouseover, ', e.currentTarget.id)
    const feeder = String(e.currentTarget.id).replace(
      'feeder_bar_',
      '',
    )
    if (!feederLocked) {
      setActiveFeeder(feeder)
      // e.currentTarget.classList.add('active')
    }
  }
  const onFeederMouseout = e => {
    // console.log('onFeederMouseout, ', e.currentTarget.id)
    if (!feederLocked) {
      setActiveFeeder(null)
      // e.currentTarget.classList.remove('active')
    }
  }
  const onFeederClick = e => {
    // console.log('onFeederClick, ', e.currentTarget.id)
    const feeder = String(e.currentTarget.id).replace(
      'feeder_bar_',
      '',
    )
    if (
      !!feederLocked &&
      Number(activeFeeder) === Number(feeder)
    ) {
      setActiveFeeder(null)
      setFeederLocked(false)
      // e.currentTarget.classList.remove('active')
    } else {
      setActiveFeeder(feeder)
      setFeederLocked(true)
      // Remove active class from previous
      // const former = document.getElementsByClassName(
      //   'feeder-bar-button active',
      // )
      // former[0].classList.remove('active')
      // // Add active class to new
      // e.currentTarget.classList.add('active')
    }
  }
  const feederChartReady = e => {
    // console.log('feeder chart ready')
  }
  let feederEvents = {
    mouseover: onFeederMouseover,
    mouseout: onFeederMouseout,
    click: onFeederClick,
  }
  // For each bar, a button. Includes the name and value.
  return (
    <div
      className="feeder-chart-bar"
      aria-label={i18n.translate(
        'UI_FEEDER_FEEDER_CHART_DESC',
      )}
    >
      {buildFeederData().map(el => {
        return (
          <button
            id={'feeder_bar_' + el.id}
            key={'feeder_bar_' + el.id}
            className={clsx(
              'feeder-bar-button',
              Number(el.id) === Number(activeFeeder)
                ? 'active'
                : '',
            )}
            onClick={onFeederClick}
            onMouseOver={onFeederMouseover}
            onMouseOut={onFeederMouseout}
          >
            <div
              className="bar"
              style={{
                width: el.value + '%',
              }}
              aria-hidden="true"
            ></div>
            <span className="data">
              {el.label}, {getRoundedValue(el.value, 0)}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export default FeederChart
