import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'
import clsx from 'clsx'
import i18n from '@pureartisan/simple-i18n'

/**
 * Select element.
 *
 * Accepts an array of items, each of which serves as a dropdown item.
 *
 * @param String label   Label for select
 * @param Array items  Array of dropdown items for select
 * @param Function handleSelect Handler for dropdown item selected
 */
const Select = ({ ...props }) => {
  // console.log('Logo')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const toggle = () =>
    setDropdownOpen(prevState => !prevState)
  return (
    <Dropdown
      className={clsx(`select`, props.className)}
      isOpen={dropdownOpen}
      toggle={toggle}
    >
      <DropdownToggle
        caret
        aria-label={
          props.ariaLabel ? props.ariaLabel : null
        }
        aria-labelledby={
          props.ariaLabelledby ? props.ariaLabelledby : null
        }
      >
        {props.label}
      </DropdownToggle>
      <DropdownMenu>
        {props.items.map(el => {
          return (
            <DropdownItem
              key={el.id}
              id={el.id}
              onClick={props.handleSelect}
              className={clsx(!!el.active ? 'active' : '')}
            >
              {i18n.translate(el.label)}
            </DropdownItem>
          )
        })}
      </DropdownMenu>
    </Dropdown>
  )
}

Select.propTypes = {
  /** String for select label */
  label: PropTypes.string,
  /** Array of items to use in select */
  items: PropTypes.array,
  /** Function to handle select event */
  handleSelect: PropTypes.func,
}

Select.defaultProps = {
  label: `Select an option`,
  items: [],
  handleSelect: null,
}

export default Select
