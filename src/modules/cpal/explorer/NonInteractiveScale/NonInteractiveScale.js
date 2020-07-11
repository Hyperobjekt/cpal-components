import React from 'react'

import './NonInteractiveScale.scss'

const NonInteractiveScale = ({
  metric,
  value,
  quintile,
  colors,
  showMinMax,
  min,
  max,
}) => {
  // console.log('NonInteractiveScale, ', colors)
  const styles = [
    {
      backgroundColor: colors[0],
    },
    {
      backgroundColor: colors[1],
    },
    {
      backgroundColor: colors[2],
    },
    {
      backgroundColor: colors[3],
    },
    {
      backgroundColor: colors[4],
    },
  ]
  const minMaxStyle = {
    display: !!showMinMax ? 'block' : 'none',
  }
  return (
    <div className="n-i-scale" key={metric}>
      <div className="n-i-scale-value">{value}</div>
      <div className="n-i-scale-parent">
        <div className="n-i-scale-hash"></div>
        <div className="n-i-scale metric-{metric} quintile-{quintile}">
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
            className="n-i-scale-quintile quintile-3"
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
