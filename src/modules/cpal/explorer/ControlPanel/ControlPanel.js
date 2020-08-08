import React from 'react'
import PropTypes from 'prop-types'

/**
 * Control panel that contains selectors and filters which alter map display.
 * @param Object children Child components
 */
const ControlPanel = ({ children }) => {
  return (
    <div className="layout-control-panel">{children}</div>
  )
}

ControlPanel.propTypes = {}

export default ControlPanel
