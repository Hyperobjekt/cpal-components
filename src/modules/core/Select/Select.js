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
 * Search input group
 * @param String parentClasses   Parent classes for component
 * @param String colorClass   Bootstrap color class
 * @param String inputLabel   Label for search input
 * @param String buttonLabel  Label for search button
 * @param Function handleSearch Handler for search button selected
 */
const Select = ({
  parentClasses,
  label,
  items,
  handleSelect,
}) => {
  // console.log('Logo')
  const classes = `select `
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const toggle = () =>
    setDropdownOpen(prevState => !prevState)
  return (
    <Dropdown
      className={classes + parentClasses}
      isOpen={dropdownOpen}
      toggle={toggle}
    >
      <DropdownToggle caret>Dropdown</DropdownToggle>
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
