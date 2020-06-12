import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { Search } from './../../../../core'

import './MenuSearch.scss'

/**
 * MenuSearch: Search input and button for header.
 */
const MenuSearch = ({ ...props }) => {
  const inputLabel = props.i18n.translate(`INPUT_SEARCH`)
  const buttonLabel = props.i18n.translate(`BUTTON_SEARCH`)
  const placeholder = props.i18n.translate(
    `INPUT_PLACEHOLDER_SEARCH`,
  )
  const classes = `menu-search`
  const colorClass = `secondary`
  const handleSearch = e => {
    console.log('Menu search button clicked')
    e.preventDefault()
  }
  return (
    <Search
      className={classes}
      colorClass={colorClass}
      inputLabel={inputLabel}
      buttonLabel={buttonLabel}
      handleSearch={handleSearch}
      data={{}}
    />
  )
}

MenuSearch.propTypes = {}

export default MenuSearch
