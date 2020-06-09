import React from 'react'
import PropTypes from 'prop-types'

import './View.css'

/**
 * View is the container for any views provided by the explorer.
 * @param String displayView ID of view to display
 * @param Object children    Children (views)
 */
const View = ({ displayView, children }) => {
  const classes = `view-parent`
  return (
    <div className={classes} data-display={displayView}>
      {children}
    </div>
  )
}

View.propTypes = {}

View.defaultProps = {}

export default View
