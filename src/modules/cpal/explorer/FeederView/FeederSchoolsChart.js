import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ReactEcharts from 'echarts-for-react'
import clsx from 'clsx'
import i18n from '@pureartisan/simple-i18n'

import useStore from './../store'

const FeederSchoolsChart = ({ ...props }) => {
  const activeFeeder = useStore(state => state.activeFeeder)
  return <p>{activeFeeder}</p>
}

export default FeederSchoolsChart
