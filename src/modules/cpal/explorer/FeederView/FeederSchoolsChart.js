import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import ReactEcharts from 'echarts-for-react'
import clsx from 'clsx'
import i18n from '@pureartisan/simple-i18n'
import echarts from 'echarts/lib/echarts'

import { CPAL_METRICS } from './../../../../constants/metrics'
import {
  CRI_COLORS,
  FEEDER_HIGHLIGHTED_SCHOOL,
  FEEDER_SCHOOL_COLLECTION,
  TURTLE_GREEN,
} from './../../../../constants/colors'
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
  // Current breakpoint.
  const breakpoint = useStore(state => state.breakpoint)
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
    const schoolsData = []
    schools.forEach(el => {
      // const school = schools.find(item => {
      //   return item.TEA === el.TEA
      // })
      // if (!school) return
      const x = getRoundedValue(el.cri_weight, 0)
      const y = getCountOfSameYValue(x, schoolsData)
      schoolsData.push({
        name: el.TEA + ',' + el.HIGH_SLN,
        label: el.SCHOOLNAME,
        value: [x, y],
        sd: el.cri_weight_sd,
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
    const school = schools.find(item => {
      return item.TEA === Number(tea)
    })
    return school.Feeder
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

  const getGridEdge = () => {
    // Set height differently depending upon the
    let val = '89'
    if (breakpoint === 'md') {
      val = '89'
    }
    if (breakpoint === 'sm') {
      val = '30'
    }
    if (breakpoint === 'xs') {
      val = '10'
    }
    return val
  }

  const getSchoolsOptions = () => {
    const options = {
      title: {
        show: false,
        text: i18n.translate(
          'UI_FEEDER_TITLE_SCHOOLS_CHART',
        ),
        textStyle: {
          fontFamily: 'halyard-text',
          fontSize: 18,
        },
        top: 20,
        left: '5%',
      },
      grid: {
        show: false,
        left: getGridEdge(),
        right: getGridEdge(),
        // bottom: 30,
        // top: 60,
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
        nameLocation: 'middle',
        min: 0,
        max: 100,
        nameGap: 0,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
      },
      emphasis: {
        itemStyle: {
          color: '#d0421b',
          opacity: 1,
          borderColor: '#fff',
        },
      },
      series: [
        {
          type: 'scatter',
          symbol: 'roundRect',
          data: getSchoolsData(),
          name: i18n.translate(
            'UI_FEEDER_SCHOOL_CHART_DESC',
          ),
          symbolSize: (val, params) => {
            // Set symbol size differently based on breakpoint.
            let arr
            if (breakpoint === 'xl') {
              arr = [11, 11]
            }
            if (breakpoint === 'lg') {
              arr = [8, 8]
            }
            if (breakpoint === 'md') {
              arr = [6, 6]
            }
            if (breakpoint === 'sm') {
              arr = [4, 4]
            }
            if (breakpoint === 'xs') {
              arr = [2, 2]
            }
            return arr
          },
          itemStyle: {
            color: params => {
              // console.log('coloring, params are ', params)
              // If it's highlighted, return that, else check for feeder.
              if (
                Number(getSchoolSLN(params.data.name)) ===
                Number(highlightedSchool)
              ) {
                return FEEDER_HIGHLIGHTED_SCHOOL
              } else if (
                Number(getFeederSLN(params.data.name)) ===
                Number(activeFeeder)
              ) {
                return FEEDER_SCHOOL_COLLECTION
              } else {
                return getMetric(
                  defaultMetric,
                  CPAL_METRICS,
                ).colors[params.data.sd]
              }
            },
            opacity: params => {
              return Number(
                getFeederSLN(params.data.name),
              ) === Number(activeFeeder)
                ? 1
                : 1
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
                '<br>' +
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
            padding: [16, 16, 8, 16],
            backgroundColor: '#fff',
            textStyle: {
              color: '#000',
              fontWeight: 300,
              fontSize: 14,
              lineHeight: 14,
            },
            extraCssText:
              'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);border-radius:0;',
          },
        },
      ],
    }
    return options
  }

  const chartOptions = useMemo(() => getSchoolsOptions(), [
    highlightedSchool,
    activeFeeder,
    breakpoint,
  ])

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

  const getHeight = () => {
    // Set height differently depending upon the
    let height = '240px'
    if (breakpoint === 'md') {
      height = '200px'
    }
    if (breakpoint === 'sm') {
      height = '180px'
    }
    if (breakpoint === 'xs') {
      height = '200px'
    }
    return height
  }

  return (
    <ReactEcharts
      onEvents={schoolsEvents}
      onChartReady={schoolChartReady}
      className={clsx('chart-schools')}
      style={{
        height: getHeight(),
        width: '100%',
        left: '0',
        bottom: '0',
      }}
      option={chartOptions}
      notMerge={false}
      lazyUpdate={false}
      silent={false}
      theme={'theme_schools'}
      {...props}
    />
  )
}

export default FeederSchoolsChart
