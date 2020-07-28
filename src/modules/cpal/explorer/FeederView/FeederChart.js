import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ReactEcharts from 'echarts-for-react'
import clsx from 'clsx'
import i18n from '@pureartisan/simple-i18n'

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
  const setActiveFeeder = useStore(
    state => state.setActiveFeeder,
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
      },
      xAxis: {
        type: 'value',
      },
      tooltip: {
        trigger: 'item',
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
            color: getMetric('cri', CPAL_METRICS).colors[0],
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
  const theme_feeder = []

  const onFeederMouseover = e => {
    // console.log('onFeederMouseover, ', e)
    // If the hover event is for a bar, set activeFeeder
    if (e.componentSubType === 'bar') {
      setActiveFeeder(e.data.id)
    } else {
      setActiveFeeder(null)
    }
    // console.log('set activeFeeder to ', activeFeeder)
  }
  const onFeederMouseout = e => {
    // console.log('onFeederMouseout, ', e)
    setActiveFeeder(null)
  }
  const feederChartReady = e => {
    // console.log('feeder chart ready')
  }
  let feederEvents = {
    mouseover: onFeederMouseover,
    mouseout: onFeederMouseout,
  }
  return (
    <ReactEcharts
      classNames={clsx('chart-feeders')}
      style={{ width: '100%' }}
      option={getFeedersOptions()}
      notMerge={false}
      lazyUpdate={true}
      theme={'theme_feeder'}
      onEvents={feederEvents}
      onChartReady={feederChartReady}
      {...props}
    />
  )
}

export default FeederChart
