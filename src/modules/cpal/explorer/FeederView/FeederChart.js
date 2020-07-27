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
  getSchoolZones,
  getMetric,
  getRoundedValue,
} from './../utils'

const FeederChart = ({ ...props }) => {
  // Currently active (hovered) feeder
  // Stores the SLN of the feeder
  // const activeFeeder = useStore(state => state.activeFeeder)
  const setActiveFeeder = useStore(
    state => state.setActiveFeeder,
  )
  // // Currently active metric
  // const activeMetric = useStore(state => state.activeMetric)
  // // Array of feeder school objects
  // const feederSchools = useStore(
  //   state => state.feederSchools,
  // )
  // const setFeederSchools = useStore(
  //   state => state.setFeederSchools,
  // )
  // /**
  //  * On load, set feeder schools array of objects
  //  * @param  {[type]} console [description]
  //  * @return {[type]}         [description]
  //  */
  // useEffect(() => {
  //   // console.log('loaded changed')
  //   // If feeder schools is empty, fetch the feeder schools (one time)
  //   if (feederSchools.length <= 0) {
  //     // console.log('fetching feeder schools')
  //     // const feederSchools = getFeederSchools()
  //     setFeederSchools(getFeederSchools())
  //   }
  // }, [isLoaded])
  //
  // /**
  //  * Gets the set of schools that are in a feeder
  //  * @return Array Array of school data objects
  //  */
  // const getSchoolSet = feeder => {
  //   return feederSchools.filter(el => {
  //     return el.feeder_sln === feeder
  //   })
  // }
  //
  // const getFeederAverage = (metric, schoolSet) => {
  //   // Get all the schools that are in that
  //   // console.log('getFeederAverage, ', schoolSet)
  //   const values = []
  //   schoolSet.forEach(el => {
  //     values.push(el[metric])
  //   })
  //   let total = 0
  //   values.forEach(v => (total = total + v))
  //   return total / values.length
  // }
  //
  // /**
  //  * Builds feeder bar chart data set.
  //  * @return Array Array of objects
  //  */
  // const buildFeederData = () => {
  //   const feederData = []
  //   CPAL_FEEDERS.forEach(el => {
  //     feederData.push({
  //       name: el.id,
  //       label: el.title,
  //       value: getFeederAverage(
  //         activeMetric,
  //         getSchoolSet(el.id),
  //       ),
  //     })
  //   })
  //   return feederData
  // }
  //
  // const getTooltipSubsets = name => {
  //   // console.log('getTooltipSubsets(), ', name)
  //   let markup = ''
  //   CPAL_FEEDER_TIP_ITEMS.forEach(el => {
  //     markup +=
  //       '<p>' +
  //       i18n.translate(el.title) +
  //       ': ' +
  //       getRoundedValue(
  //         getFeederAverage(
  //           el.id + '_index',
  //           getSchoolSet(name),
  //         ),
  //         0,
  //       ) +
  //       '</p>'
  //   })
  //   return markup
  // }
  //
  // const getFeedersOptions = () => {
  //   const option = {
  //     yAxis: {
  //       type: 'category',
  //     },
  //     xAxis: {
  //       type: 'value',
  //     },
  //     tooltip: {
  //       trigger: 'item',
  //       formatter: params => {
  //         // console.log('tooltip params, ', params)
  //         return (
  //           '<div class="feeder-tooltip">' +
  //           '<h6>' +
  //           params.data.label +
  //           ': ' +
  //           getRoundedValue(params.data.value, 0) +
  //           '</h6>' +
  //           getTooltipSubsets(params.data.name) +
  //           '</div>'
  //         )
  //       },
  //     },
  //     series: [
  //       {
  //         data: buildFeederData(),
  //         type: 'bar',
  //         itemStyle: {
  //           color: getMetric(activeMetric, CPAL_METRICS)
  //             .colors[0],
  //         },
  //         barWidth: 15,
  //         barGap: 10,
  //         barCategoryGap: '20%',
  //         tooltip: {
  //           padding: [10, 20],
  //           backgroundColor: '#fff',
  //           textStyle: {
  //             color: '#000',
  //           },
  //           extraCssText:
  //             'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);',
  //         },
  //       },
  //     ],
  //   }
  //   return option
  // }
  // const theme_feeder = []
  // const getSchoolsOptions = () => {}
  // const theme_schools = []
  const onFeederMouseover = e => {
    console.log('onFeederMouseover, ', e)
    console.log(e.componentSubType, e.data.name)
    // If the hover event is for a bar, set activeFeeder
    if (e.componentSubType === 'bar') {
      console.log('setting it')
      setActiveFeeder(e.data.name)
    } else {
      setActiveFeeder(null)
    }
    // console.log('set activeFeeder to ', activeFeeder)
  }
  const onFeederMouseout = e => {
    console.log('onFeederMouseout, ', e)
    setActiveFeeder(null)
  }
  const feederChartReady = e => {
    console.log('feeder chart ready')
  }
  let feederEvents = {
    mouseover: onFeederMouseover,
    mouseout: onFeederMouseout,
  }
  return (
    <ReactEcharts
      onEvents={feederEvents}
      onChartReady={feederChartReady}
      {...props}
    />
  )
}

export default FeederChart
