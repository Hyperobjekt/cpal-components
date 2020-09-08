import React from 'react'
import PropTypes from 'prop-types'
import ReactEcharts from 'echarts-for-react'
import clsx from 'clsx'
import i18n from '@pureartisan/simple-i18n'
import echarts from 'echarts/lib/echarts'
import { Col } from 'reactstrap'

import useStore from './../store'
import FeederLegendContent from './FeederLegendContent'

const FeederLegend = ({ ...props }) => {
  // Currently active (hovered) feeder
  // Stores the SLN of the feeder
  const activeFeeder = useStore(state => state.activeFeeder)
  const feederLocked = useStore(state => state.feederLocked)
  const breakpoint = useStore(state => state.breakpoint)
  // console.log('breakpoint, ', breakpoint)

  return (
    <div
      className={clsx(
        'feeder-chart-legend',
        !!activeFeeder && !!feederLocked
          ? 'feeder-locked'
          : '',
      )}
    >
      {!!activeFeeder &&
      !!feederLocked &&
      breakpoint !== 'xs' &&
      breakpoint !== 'sm' &&
      breakpoint !== 'md' ? (
        <FeederLegendContent />
      ) : (
        <>
          <h2>
            {i18n.translate('UI_FEEDER_TITLE_FEEDER_CHART')}
          </h2>
          <div
            className="feeder-desc"
            dangerouslySetInnerHTML={{
              __html: i18n.translate(
                `UI_FEEDER_TITLE_FEEDER_DESC`,
              ),
            }}
          ></div>
        </>
      )}
    </div>
  )
}

export default FeederLegend
