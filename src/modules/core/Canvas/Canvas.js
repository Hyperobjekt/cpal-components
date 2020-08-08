import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'
import clsx from 'clsx'

/**
 * Canvas is the base container for visible elements not header or footer.
 * @param Object children   Child elements to render
 * @param Object props      Props passed down from parent
 */
const Canvas = ({ children, ...props }) => {
  return (
    <div className={clsx('canvas', props.className)}>
      {children}
    </div>
  )
}

Canvas.propTypes = {}

Canvas.defaultProps = {}

export default Canvas
