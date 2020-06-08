import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'

import './Canvas.css'

const Canvas = ({ parentClasses, children }) => {
  return (
    <div className={`canvas ${parentClasses}`}>
      {children}
    </div>
  )
}

Canvas.propTypes = {}

Canvas.defaultProps = {}

export default CoreButton
