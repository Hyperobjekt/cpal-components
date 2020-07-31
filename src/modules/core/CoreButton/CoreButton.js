import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Tooltip } from 'reactstrap'
import clsx from 'clsx'

import './CoreButton.css'

/**
 * CoreButton is a core button for the library.
 *
 * To add contents like text or icons, simply pass them as children inside the `<CoreButton>` component.
 *
 * @param String label      Used as aria-label for button
 * @param String bsColor    Bootstrap color type for button, see https://reactstrap.github.io/components/buttons/
 * @param Function onClick  Click handler for button
 */
const CoreButton = ({ children, ...props }) => {
  // to manage tooltip state
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const toggle = () => setTooltipOpen(!tooltipOpen)
  return (
    <Button
      id={props.id}
      aria-label={props.label}
      onClick={props.onClick}
      color={props.color}
      className={clsx('button-core', props.className)}
      {...props}
    >
      {children}
      {props.tooltip && props.tooltip.length > 0 ? (
        <Tooltip
          placement={props.tooltip}
          isOpen={tooltipOpen}
          target={props.id}
          toggle={toggle}
        >
          {props.title}
        </Tooltip>
      ) : (
        ''
      )}
    </Button>
  )
}

CoreButton.propTypes = {
  /** Button label */
  label: PropTypes.string,
  /** Click handler */
  onClick: PropTypes.func,
  /** Bootstrap button color type */
  color: PropTypes.string,
}

CoreButton.defaultProps = {
  label: ``,
  onClick: null,
  color: `secondary`,
}

export default CoreButton
