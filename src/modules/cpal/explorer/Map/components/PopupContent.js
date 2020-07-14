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
  const popupStrings = {
    metric_cri_title: i18n.translate(
      `UI_MAP_METRIC_TITLE_CRI`,
    ),
    metric_cri_abbrev: i18n.translate(
      `UI_MAP_METRIC_CRI_ABBREV`,
    ),
    metric_econ_index_title: i18n.translate(
      `UI_MAP_METRIC_TITLE_ECON`,
    ),
    metric_edu_index_title: i18n.translate(
      `UI_MAP_METRIC_TITLE_EDU`,
    ),
    metric_fam_index_title: i18n.translate(
      `UI_MAP_METRIC_TITLE_FAM`,
    ),
    metric_heal_index_title: i18n.translate(
      `UI_MAP_METRIC_TITLE_HEAL`,
    ),
    metric_comm_index_title: i18n.translate(
      `UI_MAP_METRIC_TITLE_COMM`,
    ),
  }

  const metrics = [
    `cri`,
    `econ_index`,
    `edu_index`,
    `fam_index`,
    `heal_index`,
    `comm_index`,
  ]

  /**
   * Returns an index value for the quintile, 0 for far left, 4 for far right
   * @type {[type]}
   */
  const getQuintile = (value, min, max) => {
    // console.log('getQuintile()')
    const standardized = ((value - min) / (max - min)) * 100
    switch (true) {
      case standardized >= 80:
        return 4
        break
      case standardized < 80 && standardized >= 60:
        return 3
        break
      case standardized < 60 && standardized >= 40:
        return 2
        break
      case standardized < 40 && standardized >= 20:
        return 1
        break
      case standardized < 20 && standardized >= 0:
        return 0
        break
      default:
        return 0
    }
  }

  /**
   * Calculates hash position (percent from left/0 based on min/max)
   * @param  Number value Value of metric
   * @param  Number min   Minimum of range for metric
   * @param  Number max   Maximum of range for metric
   * @return {[type]}       [description]
   */
  const getHashLeft = (value, min, max) => {
    return ((value - min) / (max - min)) * 100
  }

  const getRoundedValue = (value, min, max) => {
    return parseFloat(value).toFixed(2)
  }

  /**
   * Returns an array of color values, one for each quintile for the given metric
   * @param  String metric string for metric
   * @return {[type]}        [description]
   */
  const getMetric = metric => {
    // console.log('getMetric, ', metric)
    const metricData = CPAL_METRICS.find(m => {
      return m.id === metric
    })
    if (!!metricData) {
      return metricData
    } else {
      console.error(
        'Unable to get metric from CPAL_METRICS in PopupContent.js.',
      )
    }
  }

  // console.log('popupStrings, ', popupStrings)

  return (
    <div className="popup-content">
      {metrics.map(metric => {
        const label =
          popupStrings['metric_' + metric + '_title']
        const value =
          props.feature.properties['metric_' + metric]
        const metricConst = getMetric(metric)
        const min = metricConst.range[0]
        const max = metricConst.range[1]
        if (value) {
          return (
            <div
              className="popup-metric"
              key={`popup-metric-${metric}`}
            >
              <div className="popup-metric-label">
                {label}&nbsp;
                {!!value ? getRoundedValue(value) : ''}
              </div>
              <div className="popup-metric-scale">
                <NonInteractiveScale
                  metric={metric}
                  hashLeft={getHashLeft(value, min, max)}
                  quintile={getQuintile(value, min, max)}
                  colors={metricConst.colors}
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
