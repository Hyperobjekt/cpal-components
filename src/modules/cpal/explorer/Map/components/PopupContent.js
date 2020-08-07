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
// import './PopupContent.scss'

/**
 * Returns popup contents for map feature mouseover
 */
const PopupContent = ({ ...props }) => {
  // if (props.feature) {
  //   console.log('props.feature exists')
  //   console.log('props.feature, ', props.feature)
  // }

  const metrics = []
  CPAL_METRICS.forEach(el => {
    if (el.tab_level === 0) {
      metrics.push(el.id)
    }
  })

  const setActiveQuintile = quintile => {
    const arr = [0, 0, 0, 0, 0]
    arr[quintile] = 1
    return arr
  }

  return (
    <div className="popup-content">
      <div className="popup-school-name">
        <h4>{props.feature.properties.SCHOOLNAME}</h4>
        <h5>
          {i18n.translate('UI_MAP_TOOLTIP_FEEDER', {
            name: props.feature.properties.Feeder,
          })}
        </h5>
      </div>
      {metrics.map(metric => {
        const metricData = getMetric(metric, CPAL_METRICS)
        const label = i18n.translate(metricData.title)
        const value = String(
          props.feature.properties[metric],
        )
        const min = metricData.range[0]
        const max = metricData.range[1]
        const high_is_good = metricData.high_is_good
        if (value.length > 0) {
          return (
            <div
              className="popup-metric"
              key={`popup-metric-${metric}`}
            >
              <div className="popup-metric-label">
                {label}&nbsp;&nbsp;
                <span className="metric-value">
                  {!!value
                    ? getRoundedValue(value, 0, false)
                    : ''}
                </span>
              </div>
              <div className="popup-metric-scale">
                <NonInteractiveScale
                  metric={metric}
                  showHash={true}
                  hashLeft={getHashLeft(value, min, max)}
                  quintiles={setActiveQuintile(
                    getQuintile(
                      value,
                      min,
                      max,
                      high_is_good,
                    ),
                  )}
                  colors={metricData.colors}
                  showMinMax={false}
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
