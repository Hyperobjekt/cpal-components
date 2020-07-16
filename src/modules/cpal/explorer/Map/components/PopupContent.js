import React from 'react'
import i18n from '@pureartisan/simple-i18n'

import en_US from './../../../../../constants/en_US'
import NonInteractiveScale from './../../NonInteractiveScale/NonInteractiveScale'
import {
  CRI_COLORS,
  ECON_COLORS,
  EDU_COLORS,
  FAM_COLORS,
  HEAL_COLORS,
  COMM_COLORS,
} from './../../../../../constants/colors'
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

  // Get strings
  i18n.init({
    locale: 'en_US',
    languages: {
      en_US: en_US,
    },
  })
  // const popupStrings = {
  //   metric_cri_title: i18n.translate(
  //     `UI_MAP_METRIC_TITLE_CRI`,
  //   ),
  //   metric_cri_abbrev: i18n.translate(
  //     `UI_MAP_METRIC_CRI_ABBREV`,
  //   ),
  //   metric_econ_index_title: i18n.translate(
  //     `UI_MAP_METRIC_TITLE_ECON`,
  //   ),
  //   metric_edu_index_title: i18n.translate(
  //     `UI_MAP_METRIC_TITLE_EDU`,
  //   ),
  //   metric_fam_index_title: i18n.translate(
  //     `UI_MAP_METRIC_TITLE_FAM`,
  //   ),
  //   metric_heal_index_title: i18n.translate(
  //     `UI_MAP_METRIC_TITLE_HEAL`,
  //   ),
  //   metric_comm_index_title: i18n.translate(
  //     `UI_MAP_METRIC_TITLE_COMM`,
  //   ),
  // }

  const metrics = [
    `cri`,
    `econ_index`,
    `edu_index`,
    `fam_index`,
    `heal_index`,
    `comm_index`,
  ]

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
                  hashLeft={getHashLeft(value, min, max)}
                  quintile={getQuintile(value, min, max)}
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
