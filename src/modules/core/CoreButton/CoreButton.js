import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Tooltip,
  Popover,
  PopoverBody,
} from 'reactstrap'
import clsx from 'clsx'

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

  // Updates tooltip position when props.tooltip changes
  const [position, setPosition] = useState('right')
  useEffect(() => {
    // console.log('tooltip changed')
    if (!!props.tooltip) {
      setPosition(props.tooltip)
    }
  }, [props.tooltip])

  // Manage popover state
  const [popoverOpen, setPopoverOpen] = useState(false)
  const togglePopover = () => setPopoverOpen(!popoverOpen)

  return (
    <Button
      id={props.id}
      aria-label={props.label}
      onClick={props.onClick}
      color={props.color}
      {...props}
      className={clsx('button-core', props.className)}
    >
      {children}
      {props.tooltip && props.tooltip.length > 0 ? (
        <Tooltip
          placement={position}
          isOpen={tooltipOpen}
          target={props.id}
          toggle={toggle}
          autohide={props.tooltipAutoHide}
          trigger="hover"
        >
          {props.label}
        </Tooltip>
      ) : (
        ''
      )}
      {props.popover && props.popover.length > 0 ? (
        <Popover
          placement={props.popover}
          isOpen={popoverOpen}
          target={props.id}
          toggle={togglePopover}
        >
          <PopoverBody
            dangerouslySetInnerHTML={{
              __html: props.label,
            }}
          ></PopoverBody>
        </Popover>
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
