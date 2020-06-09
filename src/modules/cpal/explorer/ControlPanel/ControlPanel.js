import React from 'react'
import PropTypes from 'prop-types'

import './ControlPanel.css'

/**
 * Control panel that contains selectors and filters which alter map display.
 * @param Object children Child components
 */
const ControlPanel = ({ children }) => {
  return <div className="control-panel">{children}</div>
}

ControlPanel.propTypes = {}

export default ControlPanel
