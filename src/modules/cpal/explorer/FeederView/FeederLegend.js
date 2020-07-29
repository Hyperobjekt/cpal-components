import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ReactEcharts from 'echarts-for-react'
import clsx from 'clsx'
import i18n from '@pureartisan/simple-i18n'
import echarts from 'echarts/lib/echarts'
import { Col } from 'reactstrap'

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

const FeederLegend = ({ ...props }) => {
  // Currently active (hovered) feeder
  // Stores the SLN of the feeder
  const activeFeeder = useStore(state => state.activeFeeder)
  // Array of feeder school objects
  const feederSchools = useStore(
    state => state.feederSchools,
  )
  /**
   * Gets the set of schools that are in a feeder
   * @return Array Array of school data objects
   */
  const getSchoolSet = feeder => {
    console.log('getSchoolSet, ', feeder)
    console.log('feederSchools, ', feederSchools)
    return feederSchools.filter(el => {
      return Number(el.feeder_sln) === Number(feeder)
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
    feederData.sort((a, b) => b.value - a.value)
    return feederData
  }

  const getTooltipSubsets = name => {
    // console.log('getTooltipSubsets(), ', name)
    let markup = ''
    CPAL_FEEDER_TIP_ITEMS.forEach(el => {
      markup +=
        '<p>' +
        toTitleCase(
          i18n.translate('UI_FEEDER_TOOLTIP_SUBINDEX_AVG', {
            metric: i18n.translate(el.title),
          }),
        ) +
        ' ' +
        getRoundedValue(
          getFeederAverage(
            el.id + '_index',
            getSchoolSet(name),
          ),
          0,
        ) +
        '</p>'
    })
    return markup
  }

  const getFeedersOptions = () => {
    const option = {
      aria: {
        show: true,
        // description: i18n.translate(
        //   'UI_FEEDER_FEEDER_CHART_DESC',
        // ),
        general: {
          withoutTitle: i18n.translate(
            'UI_FEEDER_SCHOOL_CHART_DESC',
          ),
        },
        series: {
          single: {
            prefix: '',
          },
          multiple: {
            prefix: '',
          },
        },
        data: {
          maxCount: 200,
          allData: `Its data is `,
          partialData: `Where the first {displayCnt} entry is:`,
          withName: '{name} data is {value}',
          withoutName: '{value}',
        },
      },
      yAxis: {
        type: 'category',
        name: i18n.translate(
          'UI_FEEDER_TITLE_FEEDER_CHART',
        ),
        nameLocation: 'middle',
        data: buildFeederData().map(el => {
          return el.label
        }),
        position: 'left',
        nameGap: 120,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
      },
      xAxis: {
        type: 'value',
      },
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',
        formatter: params => {
          // console.log('tooltip params, ', params)
          return (
            '<div class="feeder-tooltip">' +
            '<h6>' +
            params.data.label +
            ' ' +
            toTitleCase(
              i18n.translate('TERM_PLURAL_SCHOOL'),
            ) +
            ': ' +
            getRoundedValue(params.data.value, 0) +
            '*</h6>' +
            '<p>' +
            i18n.translate('UI_FEEDER_TOOLTIP_INDEX_DESC') +
            '</p>' +
            getTooltipSubsets(params.data.id) +
            '</div>'
          )
        },
      },
      series: [
        {
          name: `Feeder Average CRI`,
          data: buildFeederData(),
          type: 'bar',
          itemStyle: {
            normal: {
              label: {
                show: true,
                position: 'inside*',
              },
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: getMetric('cri', CPAL_METRICS)
                      .colors[0],
                  },
                  {
                    offset: 1,
                    color: '#ffe',
                  },
                ],
              ),
              // getMetric('cri', CPAL_METRICS).colors[0],
            },
          },

          barWidth: 15,
          barGap: 10,
          barCategoryGap: '20%',
          tooltip: {
            padding: [15, 20, 0, 20],
            backgroundColor: '#fff',
            textStyle: {
              color: '#000',
            },
            extraCssText:
              'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);',
          },
        },
      ],
    }
    return option
  }

  return (
    <div className="feeder-chart-legend">
      <h4>
        {i18n.translate('UI_FEEDER_TITLE_FEEDER_CHART')}
      </h4>
      {!!activeFeeder && activeFeeder.length > 0 ? (
        <>
          <div
            className="feeder-legend-metrics"
            aria-live="assertive"
          >
            <h5>
              {toTitleCase(
                i18n.translate('TERM_PLURAL', {
                  term: i18n.translate(
                    `TERM_INDEX_AVERAGE`,
                  ),
                }),
              )}
            </h5>
            {CPAL_FEEDER_TIP_ITEMS.map(el => {
              return (
                <span>
                  {i18n.translate(el.title)}:{' '}
                  {getRoundedValue(
                    getFeederAverage(
                      el.id,
                      getSchoolSet(activeFeeder),
                    ),
                    0,
                  )}
                </span>
              )
            })}
            <i>
              {i18n.translate(
                'UI_FEEDER_TOOLTIP_INDEX_DESC',
              )}
            </i>
          </div>
          <div className="feeder-legend-schools">
            <h5>
              {toTitleCase(
                i18n.translate('TERM_PLURAL', {
                  term: i18n.translate('TERM_SCHOOL'),
                }),
              )}
            </h5>
            {getSchoolSet(activeFeeder).map(el => {
              return (
                <span className="school">
                  {el.schoolname}
                </span>
              )
            })}
          </div>
        </>
      ) : (
        ''
      )}
    </div>
  )
}

export default FeederLegend
