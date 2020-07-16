import React from 'react'
import i18n from '@pureartisan/simple-i18n'

import NonInteractiveScale from './../../NonInteractiveScale/NonInteractiveScale'
import { CPAL_METRICS } from './../../../../../constants/metrics'
import {
  getRoundedValue,
  getMetric,
  getHashLeft,
  getQuintile,
} from './../../utils'
import './PopupContent.scss'

const PopupContent = ({ ...props }) => {
  // if (props.feature) {
  //   console.log('props.feature exists')
  //   console.log('props.feature, ', props.feature)
  // }

  const metrics = [
    `cri`,
    `econ_index`,
    `edu_index`,
    `fam_index`,
    `heal_index`,
    `comm_index`,
  ]

  const setActiveQuintile = quintile => {
    const arr = [0, 0, 0, 0, 0]
    arr[quintile] = 1
    return arr
  }

  return (
    <div className="popup-content">
      <div className="popup-school-name">
        <h4>{props.feature.properties.SCHOOLNAME}</h4>
      </div>
      {metrics.map(metric => {
        const metricData = getMetric(metric, CPAL_METRICS)
        const label = i18n.translate(metricData.title)
        const value = String(
          props.feature.properties['metric_' + metric],
        )
        const min = metricData.range[0]
        const max = metricData.range[1]
        if (value.length > 0) {
          return (
            <div
              className="popup-metric"
              key={`popup-metric-${metric}`}
            >
              <div className="popup-metric-label">
                {label}&nbsp;
                {!!value
                  ? getRoundedValue(value, 0, false)
                  : ''}
              </div>
              <div className="popup-metric-scale">
                <NonInteractiveScale
                  metric={metric}
                  showHash={true}
                  hashLeft={getHashLeft(value, min, max)}
                  quintiles={setActiveQuintile(
                    getQuintile(value, min, max),
                  )}
                  colors={metricData.colors}
                  showMinMax={true}
                  min={min}
                  max={max}
                />
              </div>
            </div>
          )
        } else {
          return ''
        }
      })}
    </div>
  )
}
export default PopupContent
