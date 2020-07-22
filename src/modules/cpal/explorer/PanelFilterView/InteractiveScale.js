import React from 'react'
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

import './InteractiveScale.scss'

const InteractiveScale = ({ ...props }) => {
  // Active metric
  const activeMetric = useStore(state => state.activeMetric)
  const setActiveMetric = useStore(
    state => state.setActiveMetric,
  )
  // Active quintiles
  const activeQuintiles = useStore(
    state => state.activeQuintiles,
  )
  const setActiveQuintiles = useStore(
    state => state.setActiveQuintiles,
  )

  const getBgColor = (metric, quintile) => {
    // console.log('getBgColor')
    return metric.colors[quintile]
  }

  const quintileButtons = [
    {
      classes: clsx(
        'quintile-button',
        props.metric.id === activeMetric ? 'active' : '',
        'quintile-0',
      ),
      // disabled:
      //   props.metric.id !== activeMetric ||
      //   !activeQuintiles[0]
      //     ? true
      //     : false,
      styles: {
        backgroundColor:
          props.metric.id === activeMetric &&
          !!activeQuintiles[0]
            ? getBgColor(props.metric, 0)
            : DISABLED_COLORS[0],
      },
      key: 'quintile_button_0',
    },
    {
      classes: clsx(
        'quintile-button',
        props.metric.id === activeMetric ? 'active' : '',
        'quintile-1',
      ),
      // disabled:
      //   props.metric.id !== activeMetric ||
      //   !activeQuintiles[1]
      //     ? true
      //     : false,
      styles: {
        backgroundColor:
          props.metric.id === activeMetric &&
          !!activeQuintiles[1]
            ? getBgColor(props.metric, 1)
            : DISABLED_COLORS[1],
      },
      key: 'quintile_button_1',
    },
    {
      classes: clsx(
        'quintile-button',
        props.metric.id === activeMetric ? 'active' : '',
        'quintile-2',
      ),
      // disabled:
      //   props.metric.id !== activeMetric ||
      //   !activeQuintiles[2]
      //     ? true
      //     : false,
      styles: {
        backgroundColor:
          props.metric.id === activeMetric &&
          !!activeQuintiles[2]
            ? getBgColor(props.metric, 2)
            : DISABLED_COLORS[2],
      },
      key: 'quintile_button_2',
    },
    {
      classes: clsx(
        'quintile-button',
        props.metric.id === activeMetric ? 'active' : '',
        'quintile-3',
      ),
      // disabled:
      //   props.metric.id !== activeMetric ||
      //   !activeQuintiles[3]
      //     ? true
      //     : false,
      styles: {
        backgroundColor:
          props.metric.id === activeMetric &&
          !!activeQuintiles[3]
            ? getBgColor(props.metric, 3)
            : DISABLED_COLORS[3],
      },
      key: 'quintile_button_3',
    },
    {
      classes: clsx(
        'quintile-button',
        props.metric.id === activeMetric ? 'active' : '',
        'quintile-4',
      ),
      // disabled:
      //   props.metric.id !== activeMetric ||
      //   !activeQuintiles[4]
      //     ? true
      //     : false,
      styles: {
        backgroundColor:
          props.metric.id === activeMetric &&
          !!activeQuintiles[4]
            ? getBgColor(props.metric, 4)
            : DISABLED_COLORS[4],
      },
      key: 'quintile_button_4',
    },
  ]

  const handleScaleClick = e => {
    e.preventDefault()
    console.log('handleScaleClick(), ', e.currentTarget)
    // If already active, just return
    if (e.currentTarget.classList.contains('active')) {
      return
    } else {
      // setActiveMetric
      const metric = String(e.currentTarget.id).replace(
        'metric_select_',
        '',
      )
      console.log('metric, ', metric)
      setActiveMetric(metric)
      setActiveQuintiles([1, 1, 1, 1, 1])
    }
  }

  const getElIndex = element =>
    Array.from(element.parentNode.children).indexOf(element)

  const handleQuintileClick = e => {
    e.preventDefault()
    console.log('handleQuintileClick(), ', e.currentTarget)
    // If parent not active, just return
    if (
      !e.currentTarget.parentNode.classList.contains(
        'active',
      )
    ) {
      return
    }
    console.log('parent control is active, update quintile')
    const quintile = getElIndex(e.currentTarget)
    let quintiles = activeQuintiles.slice()
    console.log(quintiles)
    // If quintile was all enabled, knock other selections.
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
      quintiles[quintile] = !quintiles[quintile]
    }
    setActiveQuintiles(quintiles)
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
    >
      {quintileButtons.map(b => {
        return (
          <div
            className={b.classes}
            style={b.styles}
            disabled={b.disabled}
            onClick={handleQuintileClick}
            key={b.key}
          >
            <span className="sr-only">
              {i18n.translate(
                `UI_MAP_PANEL_SELECT_QUINTILE`,
              )}
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
