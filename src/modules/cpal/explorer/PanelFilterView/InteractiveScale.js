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
      disabled:
        props.metric.id !== activeMetric ||
        !activeQuintiles[0]
          ? true
          : false,
      styles: {
        backgroundColor: getBgColor(props.metric, 0),
      },
      key: 'quintile_button_0',
    },
    {
      classes: clsx(
        'quintile-button',
        props.metric.id === activeMetric ? 'active' : '',
        'quintile-1',
      ),
      disabled:
        props.metric.id !== activeMetric ||
        !activeQuintiles[1]
          ? true
          : false,
      styles: {
        backgroundColor: getBgColor(props.metric, 1),
      },
      key: 'quintile_button_1',
    },
    {
      classes: clsx(
        'quintile-button',
        props.metric.id === activeMetric ? 'active' : '',
        'quintile-2',
      ),
      disabled:
        props.metric.id !== activeMetric ||
        !activeQuintiles[2]
          ? true
          : false,
      styles: {
        backgroundColor: getBgColor(props.metric, 2),
      },
      key: 'quintile_button_2',
    },
    {
      classes: clsx(
        'quintile-button',
        props.metric.id === activeMetric ? 'active' : '',
        'quintile-3',
      ),
      disabled:
        props.metric.id !== activeMetric ||
        !activeQuintiles[3]
          ? true
          : false,
      styles: {
        backgroundColor: getBgColor(props.metric, 3),
      },
      key: 'quintile_button_3',
    },
    {
      classes: clsx(
        'quintile-button',
        props.metric.id === activeMetric ? 'active' : '',
        'quintile-4',
      ),
      disabled:
        props.metric.id !== activeMetric ||
        !activeQuintiles[4]
          ? true
          : false,
      styles: {
        backgroundColor: getBgColor(props.metric, 4),
      },
      key: 'quintile_button_4',
    },
  ]

  const handleScaleClick = e => {
    e.preventDefault()
    console.log('handleScaleClick(), ', e.currentTarget)
  }

  const handleQuintileClick = e => {
    e.preventDefault()
    console.log('handleQuintileClick(), ', e.currentTarget)
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
          <button
            className={b.classes}
            style={b.styles}
            disabled={b.disabled}
            onClick={handleQuintileClick}
            key={b.key}
          >
            <span className="sr-only">Select quintile</span>
          </button>
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
