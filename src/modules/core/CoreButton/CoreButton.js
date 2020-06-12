import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'
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
  return (
    <Button
      id={props.id}
      aria-label={props.label}
      onClick={props.onClick}
      color={props.bsColor}
      className={clsx('button-core', props.className)}
    >
      {children}
    </Button>
  )
}

CoreButton.propTypes = {
  /** Button label */
  label: PropTypes.string,
  /** Click handler */
  onClick: PropTypes.func,
  /** Bootstrap button color type */
  bsColor: PropTypes.string,
}

CoreButton.defaultProps = {
  label: ``,
  onClick: null,
  bsColor: `secondary`,
}

export default CoreButton
