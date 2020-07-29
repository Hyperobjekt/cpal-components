import React, { useRef, useEffect, useState } from 'react'
import i18n from '@pureartisan/simple-i18n'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import Autosuggest from 'react-autosuggest'
import { FiSearch } from 'react-icons/fi'
import { MdClose } from 'react-icons/md'

import { CoreButton } from './../../../core'
import useStore from './../store'

import './SchoolSearch.scss'

/**
 * MenuSearch: Autosuggest search input for header.
 */
const SchoolSearch = ({ ...props }) => {
  const isLoaded = useRef(false)
  // Active view, different actions depending on this
  const activeView = useStore(state => state.activeView)
  // Active view, different actions depending on this
  const feederSchools = useStore(
    state => state.feederSchools,
  )
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
  const [suggestions, setSuggestions] = useState([])
  const [value, setValue] = useState('')

  const updateUIWithResult = suggestion => {
    console.log('updateUIWithResult')
    if (activeView === 'map') {
      console.log('in map view')
    }
    if (activeView === 'feeder') {
      console.log('in feeder view, ', suggestion)
      setActiveFeeder(suggestion.suggestion.feeder_sln)
      setFeederLocked(true)
      setHighlightedSchool(suggestion.suggestion.TEA_ID)
      handleClear()
    }
  }

  // useEffect(() => {
  //   console.log('feederSchools changed')
  //   console.log('feederSchools, ', feederSchools)
  //   if (feederSchools.length > 0) {
  //     // buildSuggestions()
  //   }
  // }, [feederSchools])

  const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length

    return inputLength === 0
      ? []
      : feederSchools.filter(
          el =>
            el.schoolname
              .toLowerCase()
              .slice(0, inputLength) === inputValue,
        )
  }

  const classes = `input-search`
  const colorClass = `secondary`
  // const handleFetchRequested = e => {
  //   console.log('handleFetchRequested, ', e)
  //   e.preventDefault()
  // }
  const handleClearRequested = () => {
    setSuggestions([])
  }
  const handleSelection = (e, suggestion) => {
    console.log('handleSelection, ', e, suggestion)
    updateUIWithResult(suggestion)
  }
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
    return suggestion.schoolname
  }

  const handleClear = () => {
    // reset value and suggestions
    setValue('')
    setSuggestions([])
  }

  // Use your imagination to render suggestions.
  const renderSuggestion = suggestion => {
    console.log('renderSuggestion')
    return (
      <div
        id={suggestion.TEA_ID}
        data-feeder={suggestion.feeder_sln}
      >
        {suggestion.schoolname}
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
