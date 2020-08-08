import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  InputGroup,
  Input,
  InputGroupAddon,
  Button,
} from 'reactstrap'
import clsx from 'clsx'
import { FiSearch } from 'react-icons/fi'

/**
 * Search input group
 *
 * @param String colorClass   Bootstrap color class
 * @param String inputLabel   Label for search input
 * @param String buttonLabel  Label for search button
 * @param Function handleSearch Handler for search button selected
 */
const Search = ({ ...props }) => {
  // console.log('Search')
  return (
    <InputGroup
      className={clsx('input-search', props.className)}
    >
      <Input
        placeholder={props.placeholder}
        aria-label="inputLabel"
      />
      <InputGroupAddon addonType="append">
        <Button
          color={props.colorClass}
          onClick={props.handleSearch}
          aria-label={props.buttonLabel}
          className={`button-search`}
        >
          <FiSearch />
        </Button>
      </InputGroupAddon>
    </InputGroup>
  )
}

Search.propTypes = {
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
  colorClass: `secondary`,
  inputLabel: `Enter search criteria`,
  buttonLabel: `Select to search`,
  placeholder: `Search... `,
  handleSearch: null,
}

export default Search
