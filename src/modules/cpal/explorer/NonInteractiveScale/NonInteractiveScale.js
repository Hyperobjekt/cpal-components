import React from 'react'

import './NonInteractiveScale.scss'

const NonInteractiveScale = ({
  metric,
  quintile,
  hashLeft,
  colors,
  showMinMax,
  min,
  max,
}) => {
  console.log('NonInteractiveScale, quintile', quintile)
  const styles = [
    {
      backgroundColor:
        quintile === 0 ? colors[0] : 'transparent',
    },
    {
      backgroundColor:
        quintile === 1 ? colors[1] : 'transparent',
    },
    {
      backgroundColor:
        quintile === 2 ? colors[2] : 'transparent',
    },
    {
      backgroundColor:
        quintile === 3 ? colors[3] : 'transparent',
    },
    {
      backgroundColor:
        quintile === 4 ? colors[4] : 'transparent',
    },
  ]
  const hashStyles = { left: hashLeft + '%' }
  const minMaxStyle = {
    display: !!showMinMax ? 'block' : 'none',
  }
  return (
    <div className="n-i-scale" key={metric}>
      <div className="n-i-scale-parent">
        <div
          className="n-i-scale-hash"
          style={hashStyles}
        ></div>
        <div className="n-i-scale-quintiles metric-{metric} quintile-{quintile}">
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
      <div className="n-i-scale-minmax" style={minMaxStyle}>
        <div className="n-i-scale-min">{min}</div>
        <div className="n-i-scale-max">{max}</div>
      </div>
    </div>
  )
}

export default NonInteractiveScale
