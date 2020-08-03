import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ReactEcharts from 'echarts-for-react'
import clsx from 'clsx'
import i18n from '@pureartisan/simple-i18n'
import echarts from 'echarts/lib/echarts'

import { CPAL_METRICS } from './../../../../constants/metrics'
import {
  CRI_COLORS,
  ECON_COLORS,
  EDU_COLORS,
  FAM_COLORS,
  HEL_COLORS,
  COMM_COLORS,
} from './../../../../constants/colors'
import { feeders } from './../../../../data/feeders'
import { schools } from './../../../../data/schools'
import useStore from './../store'
import {
  getMetric,
  getRoundedValue,
  toTitleCase,
} from './../utils'

const FeederSchoolsChart = ({ ...props }) => {
  // Check loaded state
  const [isLoaded, setIsLoaded] = useState(false)
  // Default metric for color scheme
  const defaultMetric = useStore(
    state => state.defaultMetric,
  )
  // Currently active feeder
  const activeFeeder = useStore(state => state.activeFeeder)
  const feederSchools = useStore(
    state => state.feederSchools,
  )
  // Currently highlighted school in this chart, if there is one
  const highlightedSchool = useStore(
    state => state.highlightedSchool,
  )

  /**
   * Gets the count of items with a shared y-value (in node with an array containing [x,y])
   * @param  Number val         Y value
   * @param  Array schoolsData Array of objects
   * @return Number            Length of assembled array
   */
  const getCountOfSameYValue = (val, schoolsData) => {
    const objs = schoolsData.filter(el => {
      return el.value[0] === val
    })
    return objs.length
  }

  /**
   * Builds schools data to feed into scatterplot
   * @return Array Array of objects
   */
  const getSchoolsData = () => {
    // Go through list of schools from feeder file
    const schoolsData = []
    feeders.forEach(el => {
      const school = schools.find(item => {
        return item.TEA === el.TEA
      })
      if (!school) return
      const x = getRoundedValue(school.ci_weight, 0)
      const y = getCountOfSameYValue(x, schoolsData)
      schoolsData.push({
        name: el.TEA + ',' + el.FEEDER_SLN,
        label: el.SCHOOLNAME,
        value: [x, y],
      })
    })
    return schoolsData
  }

  /**
   * Gets label for the feeder
   * @param  String tea TEA id for school
   * @return String     Label for the feeder
   */
  const getFeederLabel = tea => {
    const school = feederSchools.find(item => {
      return item.TEA_ID === Number(tea)
    })
    return school.feeder
  }

  /**
   * Splits string with school and feeder sln and returns feeder sln
   * @param  String str [description]
   * @return String   [description]
   */
  const getFeederSLN = str => {
    const arr = String(str).split(',')
    return arr[1]
  }

  /**
   * Splits string with school and feeder sln and returns school sln
   * @param  String str
   * @return String
   */
  const getSchoolSLN = str => {
    const arr = String(str).split(',')
    return arr[0]
  }

  const getSchoolsOptions = () => {
    const options = {
      grid: {
        show: false,
      },
      // title: i18n.translate('UI_FEEDER_SCHOOL_CHART_DESC'),
      aria: {
        show: true,
        description: i18n.translate(
          'UI_FEEDER_SCHOOL_CHART_DESC',
        ),
      },
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove|click',
      },
      yAxis: {
        show: false,
        inverse: false,
        min: 0,
        max: 8,
      },
      xAxis: {
        show: true,
        position: 'right',
        name: i18n.translate(
          'UI_FEEDER_TITLE_SCHOOLS_CHART',
        ),
        nameLocation: 'middle',
        min: 0,
        max: 100,
        nameGap: 26,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
      },
      emphasis: {
        itemStyle: {
          color: getMetric(defaultMetric, CPAL_METRICS)
            .colors[0],
          opacity: 1,
          borderColor: '#fff',
        },
      },
      series: [
        {
          name: i18n.translate(
            'UI_FEEDER_SCHOOL_CHART_DESC',
          ),
          symbolSize: (val, params) => {
            // If it's highlighted, return that, else check for feeder.
            if (
              Number(getSchoolSLN(params.name)) ===
              Number(highlightedSchool)
            ) {
              return 13
            } else {
              return Number(getFeederSLN(params.name)) ===
                Number(activeFeeder)
                ? 12
                : 8
            }
          },
          data: getSchoolsData(),
          type: 'scatter',
          symbol: 'rectangle',
          itemStyle: {
            color: params => {
              // If it's highlighted, return that, else check for feeder.
              if (
                Number(getSchoolSLN(params.data.name)) ===
                Number(highlightedSchool)
              ) {
                return getMetric(
                  defaultMetric,
                  CPAL_METRICS,
                ).colors[0]
              } else {
                return Number(
                  getFeederSLN(params.data.name),
                ) === Number(activeFeeder)
                  ? getMetric(defaultMetric, CPAL_METRICS)
                      .colors[2]
                  : getMetric(defaultMetric, CPAL_METRICS)
                      .colors[4]
              }
            },
            opacity: params => {
              return Number(
                getFeederSLN(params.data.name),
              ) === Number(activeFeeder)
                ? 1
                : 0.2
            },
            borderColor: params => {
              return Number(
                getFeederSLN(params.data.name),
              ) === Number(activeFeeder)
                ? '#fff'
                : 'transparent'
            },
          },
          clip: false,
          hoverAnimation: true,
          animation: false,
          tooltip: {
            formatter: params => {
              // console.log('tooltip params, ', params)
              return (
                '<div class="school-tip">' +
                '<p>' +
                params.data.label +
                '</p>' +
                '<p>' +
                getFeederLabel(
                  getFeederSLN(params.data.name),
                ) +
                ' ' +
                toTitleCase(
                  i18n.translate('TERM_PLURAL', {
                    term: i18n.translate('TERM_SCHOOL'),
                  }),
                ) +
                '</p>' +
                '</div>'
              )
            },
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
    return options
  }
  // Events
  const schoolChartReady = e => {
    // console.log('school chart ready')
    setIsLoaded(true)
  }
  const onSchoolMouseover = e => {
    // console.log('onSchoolMouseover() ', e)
  }
  const onSchoolMouseout = e => {
    // console.log('onSchoolMouseout() ', e)
  }
  const onSchoolClick = e => {
    // console.log('onSchoolClick() ', e)
  }
  let schoolsEvents = {
    mouseover: onSchoolMouseover,
    mouseout: onSchoolMouseout,
    click: onSchoolClick,
  }
  // let echarts_instance = this.echarts_react.getEchartsInstance()
  let echarts_react
  return (
    <ReactEcharts
      ref={e => {
        echarts_react = e
      }}
      onEvents={schoolsEvents}
      onChartReady={schoolChartReady}
      classNames={clsx('chart-schools')}
      style={{
        height: '240px',
        width: '100%',
        float: 'left',
      }}
      option={getSchoolsOptions()}
      notMerge={false}
      lazyUpdate={true}
      theme={'theme_schools'}
      {...props}
    />
  )
}

export default FeederSchoolsChart
