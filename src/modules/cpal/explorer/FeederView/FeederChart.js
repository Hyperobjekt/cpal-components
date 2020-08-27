import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ReactEcharts from 'echarts-for-react'
import clsx from 'clsx'
import i18n from '@pureartisan/simple-i18n'
import { Tooltip } from 'reactstrap'

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
  FEEDER_ACTIVE,
} from './../../../../constants/colors'
import useStore from './../store'
import {
  getMetric,
  getRoundedValue,
  toTitleCase,
} from './../utils'
import { schools } from './../../../../data/schools'

const FeederChart = ({ children, ...props }) => {
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
  // To clear highlighted school when a feeder bar is clicked
  const setHighlightedSchool = useStore(
    state => state.setHighlightedSchool,
  )

  const getBarBgColor = el => {
    // console.log('getBarBgColor', el)
    // If active feeder, return that color
    if (Number(activeFeeder) === Number(el.id)) {
      return FEEDER_ACTIVE
    } else {
      // Else return the color for the standard deviation
      return CRI_COLORS[el.sd]
    }
  }

  /**
   * Gets the set of schools that are in a feeder
   * @return Array Array of school data objects
   */
  const getSchoolSet = feeder => {
    return schools.filter(el => {
      return el.HIGH_SLN === feeder
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

  const getFeederSDAverage = (metric, schoolSet) => {
    // Get all the schools that are in that
    // console.log('getFeederAverage, ', schoolSet)
    const values = []
    schoolSet.forEach(el => {
      values.push(el[metric + '_sd'])
    })
    let total = 0
    values.forEach(v => (total = total + v))
    return Math.round(total / values.length)
  }

  /**
   * Builds feeder bar chart data set.
   * @return Array Array of objects
   */
  const buildFeederData = () => {
    // console.log('buildFeederData, ', CPAL_FEEDERS)
    const feederData = []
    CPAL_FEEDERS.forEach(el => {
      feederData.push({
        name: el.title,
        id: el.id,
        label: el.title,
        value: getFeederAverage(
          'cri_weight',
          getSchoolSet(el.id),
        ),
        sd: getFeederSDAverage(
          'cri_weight',
          getSchoolSet(el.id),
        ),
      })
    })
    // Sort ascending by cri average
    feederData.sort((a, b) => a.value - b.value)
    return feederData
  }
  // buildFeederData()

  const onFeederMouseover = e => {
    // console.log('onFeederMouseover, ', e.currentTarget.id)
    const feeder = String(e.currentTarget.id).replace(
      'feeder_bar_',
      '',
    )
    if (!feederLocked) {
      setActiveFeeder(feeder)
    }
  }
  const onFeederMouseout = e => {
    // console.log('onFeederMouseout, ', e.currentTarget.id)
    if (!feederLocked) {
      setActiveFeeder(null)
    }
  }
  const onFeederClick = e => {
    // console.log('onFeederClick, ', e.currentTarget.id)
    setHighlightedSchool('')
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
    } else {
      setActiveFeeder(feeder)
      setFeederLocked(true)
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
      <div className="feeder-chart-header">
        <h2>Dallas ISD School Feeder Patterns</h2>
      </div>

      {children}

      {buildFeederData().map(el => {
        // console.log('building feeder data, ', el)
        // to manage tooltip state
        const [tooltipOpen, setTooltipOpen] = useState(
          false,
        )
        const toggle = () => setTooltipOpen(!tooltipOpen)
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
            <span className="label">{el.label}</span>
            <div
              id={'bar_' + el.id}
              className="bar"
              style={{
                width: el.value + '%',
                backgroundColor: getBarBgColor(el), // conditional based on
              }}
              aria-hidden="true"
            >
              <Tooltip
                key={'feeder_bar_tip_' + el.id}
                placement="auto"
                isOpen={tooltipOpen}
                target={'bar_' + el.id}
                toggle={toggle}
              >
                Click for additional information
              </Tooltip>
            </div>
            <span className="data">
              {getRoundedValue(el.value, 1, 1)}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export default FeederChart
