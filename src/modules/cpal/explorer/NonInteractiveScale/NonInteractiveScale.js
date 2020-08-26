import React from 'react'
import clsx from 'clsx'

import { getRoundedValue, getMetric } from './../utils'
import { CPAL_METRICS } from './../../../../constants/metrics'

const NonInteractiveScale = ({
  metric,
  quintiles,
  colors,
  showHash,
  hashLeft,
  showMinMax,
}) => {
  const metricData = getMetric(metric, CPAL_METRICS)
  // console.log(
  //   'NonInteractiveScale, metricData.colors ',
  //   metricData.colors,
  //   'quintiles, ',
  //   quintiles,
  // )
  const styles = [
    {
      backgroundColor: !!quintiles[0]
        ? colors[0]
        : 'transparent',
    },
    {
      backgroundColor: !!quintiles[1]
        ? colors[1]
        : 'transparent',
    },
    {
      backgroundColor: !!quintiles[2]
        ? colors[2]
        : 'transparent',
    },
    {
      backgroundColor: !!quintiles[3]
        ? colors[3]
        : 'transparent',
    },
    {
      backgroundColor: !!quintiles[4]
        ? colors[4]
        : 'transparent',
    },
  ]
  const hashStyles = { left: hashLeft + '%' }
  const minMaxStyle = {
    display: !!showMinMax ? 'block' : 'none',
  }
  return (
    <div className="n-i-scale" key={metric}>
      <div className="n-i-scale-parent">
        {!!showHash ? (
          <div
            className="n-i-scale-hash"
            style={hashStyles}
          ></div>
        ) : null}
        <div
          className={clsx(
            'n-i-scale-quintiles',
            'metric-' + metric,
          )}
        >
          <div
            className="n-i-scale-quintile quintile-0"
            style={styles[0]}
          ></div>
          <div
            className="n-i-scale-quintile quintile-1"
            style={styles[1]}
          ></div>
          <div
            className="n-i-scale-quintile quintile-2"
            style={styles[2]}
          ></div>
          <div
            className="n-i-scale-quintile quintile-3"
            style={styles[3]}
          ></div>
          <div
            className="n-i-scale-quintile quintile-4"
            style={styles[4]}
          ></div>
        </div>
      </div>
      {!!showMinMax ? (
        <div
          className="n-i-scale-minmax"
          style={minMaxStyle}
        >
          <div className="n-i-scale-min">
            {getRoundedValue(
              !!metricData.high_is_good
                ? metricData.range[0]
                : metricData.range[1],
              metricData.decimals,
              false,
              !!metricData.is_currency,
              !!metricData.as_percent,
            )}
          </div>
          <div className="n-i-scale-max">
            {getRoundedValue(
              !!metricData.high_is_good
                ? metricData.range[1]
                : metricData.range[0],
              metricData.decimals,
              false,
              !!metricData.is_currency,
              !!metricData.as_percent,
            )}
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default NonInteractiveScale
