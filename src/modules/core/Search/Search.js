import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  InputGroup,
  Input,
  InputGroupAddon,
  Button,
} from 'reactstrap'
import { FiSearch } from 'react-icons/fi'

import './Search.css'

/**
 * Search input group
 *
 * @param String parentClasses   Parent classes for component
 * @param String colorClass   Bootstrap color class
 * @param String inputLabel   Label for search input
 * @param String buttonLabel  Label for search button
 * @param Function handleSearch Handler for search button selected
 */
const Search = ({
  parentClasses,
  colorClass,
  inputLabel,
  buttonLabel,
  placeholder,
  handleSearch,
}) => {
  // console.log('Logo')
  const classes =
    !!parentClasses && parentClasses.length > 0
      ? `input-search ${parentClasses}`
      : `input-search`
  return (
    <InputGroup className={classes}>
      <Input
        placeholder={placeholder}
        aria-label="inputLabel"
      />
      <InputGroupAddon addonType="append">
        <Button
          color={colorClass}
          onClick={handleSearch}
          aria-label={buttonLabel}
          parentClasses={`button-search`}
        >
          <FiSearch />
        </Button>
      </InputGroupAddon>
    </InputGroup>
  )
}

Search.propTypes = {
  /** Classes passed down from parent */
  parentClasses: PropTypes.string,
  /** Bootstrap color class */
  colorClass: PropTypes.string,
  /** Label for input */
  inputLabel: PropTypes.string,
  /** Label for search button */
  buttonLabel: PropTypes.string,
  /** Placeholder for search input */
  placeholder: PropTypes.string,
  /** Href for home link */
  handleSearch: PropTypes.func,
}

Search.defaultProps = {
  parentClasses: ``,
  colorClass: `secondary`,
  inputLabel: `Enter search criteria`,
  buttonLabel: `Select to search`,
  placeholder: `Search... `,
  handleSearch: null,
}

export default Search
