import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

/**
 * View is the container for any views provided by the explorer.
 * @param String displayView ID of view to display
 * @param Object children    Children (views)
 */
const View = ({ children, ...props }) => {
  return (
    <div
      className={clsx(`view-parent`, props.className)}
      data-display={props.displayView}
    >
      {children}
    </div>
  )
}

View.propTypes = {}

View.defaultProps = {}

export default View
