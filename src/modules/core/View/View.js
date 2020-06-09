import React from 'react'
import PropTypes from 'prop-types'

import './View.css'

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
