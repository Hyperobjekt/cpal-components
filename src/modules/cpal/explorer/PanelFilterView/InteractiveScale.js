import React, { useEffect, useRef } from 'react'
import clsx from 'clsx'
import i18n from '@pureartisan/simple-i18n'
import PropTypes from 'prop-types'

import useStore from './../store.js'
import {
  CRI_COLORS,
  ECON_COLORS,
  EDU_COLORS,
  FAM_COLORS,
  HEAL_COLORS,
  COMM_COLORS,
  DISABLED_COLORS,
} from './../../../../constants/colors'
import { getQuintileDesc } from './../utils'

const InteractiveScale = ({ ...props }) => {
  const isLoaded = useRef(false)
  // Generic state setter.
  const setStoreValues = useStore(
    state => state.setStoreValues,
  )
  // Active metric
  const activeMetric = useStore(state => state.activeMetric)
  // const setActiveMetric = useStore(
  //   state => state.setActiveMetric,
  // )
  // Active quintiles
  const activeQuintiles = useStore(
    state => state.activeQuintiles,
  )
  // const setActiveQuintiles = useStore(
  //   state => state.setActiveQuintiles,
  // )

  const getBgColor = (metric, quintile) => {
    // console.log('getBgColor')
    return metric.colors[quintile]
  }

  const getQuintileAriaLabel = quintile => {
    const quintileDesc = i18n.translate(
      getQuintileDesc(quintile),
    )
    if (
      props.metric.id === activeMetric &&
      activeQuintiles[quintile] == 1
    ) {
      return i18n.translate(
        'UI_MAP_PANEL_QUINTILE_DISABLE',
        { quintile: quintileDesc },
      )
    } else {
      return i18n.translate(
        'UI_MAP_PANEL_QUINTILE_ENABLE',
        { quintile: quintileDesc },
      )
    }
  }

  const handleScaleClick = e => {
    e.preventDefault()
    // console.log('handleScaleClick(), ', e.currentTarget)
    // If already active, just return
    if (e.currentTarget.classList.contains('active')) {
      return
    } else {
      // setActiveMetric
      const metric = String(e.currentTarget.id).replace(
        'metric_select_',
        '',
      )
      setStoreValues({
        activeMetric: metric,
        activeQuintiles: [1, 1, 1, 1, 1],
      })
      // setActiveMetric(metric)
      // setActiveQuintiles([1, 1, 1, 1, 1])
    }
  }

  const getElIndex = element =>
    Array.from(element.parentNode.children).indexOf(element)

  const handleQuintileClick = e => {
    e.preventDefault()
    // console.log('handleQuintileClick(), ', e.currentTarget)
    // If parent not active, just return
    if (
      !e.currentTarget.parentNode.classList.contains(
        'active',
      )
    ) {
      return
    }
    const quintile = getElIndex(e.currentTarget)
    let quintiles = activeQuintiles.slice()
    // If set was all enabled, knock other selections.
    if (
      quintiles[0] === 1 &&
      quintiles[1] === 1 &&
      quintiles[2] === 1 &&
      quintiles[3] === 1 &&
      quintiles[4] === 1
    ) {
      quintiles = [0, 0, 0, 0, 0]
      quintiles[quintile] = 1
    } else {
      quintiles[quintile] =
        Number(quintiles[quintile]) === 1 ? 0 : 1
    }
    // setActiveQuintiles(quintiles)
    setStoreValues({
      activeQuintiles: quintiles,
    })
  }

  const getScaleAriaLabel = () => {
    // console.log('getScaleAriaLabel()')
    const metricTitle = i18n.translate(props.metric.title)
    const prompt =
      activeMetric === props.metric.id
        ? 'UI_MAP_PANEL_METRIC_DISABLE'
        : 'UI_MAP_PANEL_METRIC_ENABLE'
    const label = i18n.translate(prompt, {
      metric: metricTitle,
    })
    // console.log('label, ', label)
    return label
  }

  return (
    <div
      className={clsx(
        'interactive-scale',
        'button-metric',
        activeMetric === props.metric.id ? 'active' : '',
        'button-' + props.metric.id,
      )}
      id={'metric_select_' + props.metric.id}
      onClick={handleScaleClick}
      aria-label={getScaleAriaLabel()}
    >
      {activeQuintiles.map((val, i) => {
        return (
          <div
            className={clsx(
              'quintile-button',
              props.metric.id === activeMetric &&
                Number(val) === 1
                ? 'active'
                : '',
              'quintile-' + i,
            )}
            style={{
              backgroundColor:
                props.metric.id === activeMetric &&
                Number(val) === 1
                  ? getBgColor(props.metric, i)
                  : DISABLED_COLORS[i],
            }}
            onClick={handleQuintileClick}
            key={'quintile_button_' + i}
            aria-label={getQuintileAriaLabel(i)}
          >
            <span className="sr-only">
              {getQuintileAriaLabel(i)}
            </span>
          </div>
        )
      })}
    </div>
  )
}

InteractiveScale.propTypes = {
  metric: PropTypes.object,
}

InteractiveScale.defaultProps = {
  metric: {},
}

export default InteractiveScale
