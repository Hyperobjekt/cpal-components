import React, { useRef, useEffect, useState } from 'react'
import i18n from '@pureartisan/simple-i18n'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import Autosuggest from 'react-autosuggest'
import { FiSearch } from 'react-icons/fi'
import { MdClose } from 'react-icons/md'

import { CoreButton } from './../../../core'
import useStore from './../store'
import { schools } from './../../../../data/schools'

/**
 * MenuSearch: Autosuggest search input for header.
 */
const SchoolSearch = ({ ...props }) => {
  const isLoaded = useRef(false)
  // Active view, different actions depending on this
  const activeView = useStore(state => state.activeView)
  // Active view, different actions depending on this
  // const feederSchools = useStore(
  //   state => state.feederSchools,
  // )
  // Sets active feeder
  const setActiveFeeder = useStore(
    state => state.setActiveFeeder,
  )
  // Lock feeder upon search
  const setFeederLocked = useStore(
    state => state.setFeederLocked,
  )
  // Set school for highlighting
  const setHighlightedSchool = useStore(
    state => state.setHighlightedSchool,
  )
  // Reset viewport to zoom in to school
  const flyToSchool = useStore(state => state.flyToSchool)

  // Tracking autosuggest suggestions
  const [suggestions, setSuggestions] = useState([])
  const [value, setValue] = useState('')

  const updateUIWithResult = suggestion => {
    // console.log('updateUIWithResult')
    if (activeView === 'map') {
      console.log('in map view')
      flyToSchool(
        suggestion.suggestion.POINT_Y,
        suggestion.suggestion.POINT_X,
      )
    }
    if (activeView === 'feeder') {
      // console.log('in feeder view, ', suggestion)
      setActiveFeeder(suggestion.suggestion.HIGH_SLN)
      setFeederLocked(true)
      setHighlightedSchool(suggestion.suggestion.TEA)
      handleClear()
    }
  }

  const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length

    return inputLength === 0
      ? []
      : schools.filter(
          el =>
            el.SCHOOLNAME.toLowerCase().slice(
              0,
              inputLength,
            ) === inputValue,
        )
  }
  /**
   * Clear the suggestions list.
   */
  const handleClearRequested = () => {
    setSuggestions([])
  }
  /**
   * When item is selected, do something.
   * @param  Object e          Event
   * @param  Object suggestion Object of suggestion nodes
   */
  const handleSelection = (e, suggestion) => {
    // console.log('handleSelection, ', e, suggestion)
    updateUIWithResult(suggestion)
  }
  /**
   * When input value changes, reset value
   * @param  Object e        Event
   * @param  String newValue String value of input
   */
  const handleChange = (e, { newValue }) => {
    // console.log('handleChange, ', e, newValue)
    setValue(newValue)
  }
  const handleBlur = e => {
    // console.log('handleBlur, ', e)
  }

  const handleFetchRequested = ({ value }) => {
    // console.log('handleFetchRequested()')
    setSuggestions(getSuggestions(value))
  }

  const getSuggestionValue = suggestion => {
    return suggestion.SCHOOLNAME
  }

  const handleClear = () => {
    // reset value and suggestions
    setValue('')
    setSuggestions([])
  }

  // Use your imagination to render suggestions.
  const renderSuggestion = suggestion => {
    // console.log('renderSuggestion')
    return (
      <div
        id={suggestion.TEA}
        data-feeder={suggestion.HIGH_SLN}
      >
        {suggestion.SCHOOLNAME}
      </div>
    )
  }

  const inputProps = {
    value: value, // usually comes from the application state
    onChange: handleChange, // called every time the input value changes
    onBlur: handleBlur, // called when the input loses focus, e.g. when user presses Tab
    type: 'search',
    placeholder: i18n.translate(`INPUT_SEARCH`),
  }

  return (
    <div className="search-autosuggest input-group">
      <Autosuggest
        suggestions={suggestions}
        onSuggestionSelected={handleSelection}
        onSuggestionsFetchRequested={handleFetchRequested}
        onSuggestionsClearRequested={handleClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
      <FiSearch
        className="icon-search"
        aria-hidden="true"
        style={{ display: !!value ? 'none' : 'block' }}
      />
      <CoreButton
        id="button_search_clear"
        aria-label={i18n.translate(`BUTTON_SEARCH`)}
        onClick={handleClear}
        color="none"
        className="button-search-clear"
        style={{ display: !!value ? 'block' : 'none' }}
      >
        <MdClose />
        <span className="sr-only">
          {i18n.translate(`BUTTON_SEARCH`)}
        </span>
      </CoreButton>
    </div>
  )
}

SchoolSearch.propTypes = {}

export default SchoolSearch
