import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'

import './Select.css'

/**
 * Select element.
 *
 * Accepts an array of items, each of which serves as a dropdown item.
 *
 * @param String parentClasses   Parent classes for component
 * @param String label   Label for select
 * @param Array items  Array of dropdown items for select
 * @param Function handleSelect Handler for dropdown item selected
 */
const Select = ({
  parentClasses,
  label,
  items,
  handleSelect,
}) => {
  // console.log('Logo')
  const classes =
    !!parentClasses && parentClasses.length > 0
      ? `select ${parentClasses}`
      : `select`
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const toggle = () =>
    setDropdownOpen(prevState => !prevState)
  return (
    <Dropdown
      className={classes}
      isOpen={dropdownOpen}
      toggle={toggle}
    >
      <DropdownToggle caret>{label}</DropdownToggle>
      <DropdownMenu>
        {items.map(el => {
          return (
            <DropdownItem
              key={el.id}
              onClick={handleSelect}
            >
              {el.label}
            </DropdownItem>
          )
        })}
      </DropdownMenu>
    </Dropdown>
  )
}

Select.propTypes = {
  /** Classes passed down from parent */
  parentClasses: PropTypes.string,
  /** String for select label */
  label: PropTypes.string,
  /** Array of items to use in select */
  items: PropTypes.array,
  /** Function to handle select event */
  handleSelect: PropTypes.func,
}

Select.defaultProps = {
  parentClasses: ``,
  label: `Select an option`,
  items: [],
  handleSelect: null,
}

export default Select
