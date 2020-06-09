import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'

import './CoreButton.css'

/**
 * MenuButton Menu toggle for header
 * @param String label      Used as aria-label for button
 * @param String bsColor    Bootstrap color type for button, see https://reactstrap.github.io/components/buttons/
 * @param Function onClick  Click handler for button
 */
const CoreButton = ({
  label,
  onClick,
  bsColor,
  children,
  ...props
}) => {
  return (
    <Button
      aria-label={label}
      onClick={onClick}
      color={bsColor}
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
