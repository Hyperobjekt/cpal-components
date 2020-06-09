import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'

import './Canvas.css'

/**
 * Canvas is the base container for visible elements not header or footer.
 * @param {[type]} parentClasses [description]
 * @param {[type]} children      [description]
 */
const Canvas = ({ parentClasses, children }) => {
  return (
    <div className={`canvas ${parentClasses}`}>
      {children}
    </div>
  )
}

Canvas.propTypes = {}

Canvas.defaultProps = {}

export default Canvas
