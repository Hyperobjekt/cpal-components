import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'

import './Canvas.scss'

/**
 * Canvas is the base container for visible elements not header or footer.
 * @param {[type]} parentClasses [description]
 * @param {[type]} children      [description]
 */
const Canvas = ({ parentClasses, children }) => {
  const classes =
    !!parentClasses && parentClasses.length > 0
      ? `canvas ${parentClasses}`
      : `canvas`
  return <div className={classes}>{children}</div>
}

Canvas.propTypes = {}

Canvas.defaultProps = {}

export default Canvas
