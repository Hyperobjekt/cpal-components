import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@pureartisan/simple-i18n'
import clsx from 'clsx'

import useStore from './../store'
import { CoreButton, TourIcon } from './../../../core'

const TourButton = ({ children, ...props }) => {
  // Generic store value setter.
  // const setStoreValues = useStore(
  //   state => state.setStoreValues,
  // )
  const shareHash = useStore(state => state.shareHash)
  const buttonTooltipPosition = useStore(
    state => state.buttonTooltipPosition,
  )
  const setUpTour = useStore(state => state.setUpTour)
  const incrementLaunchTour = useStore(
    state => state.incrementLaunchTour,
  )

  const handleClick = () => {
    incrementLaunchTour()
    setUpTour()
  }

  return (
    <CoreButton
      id="button_launch_tour"
      label={i18n.translate(`BUTTON_TOUR`)}
      tooltip={props.tooltip ? buttonTooltipPosition : ''}
      onClick={handleClick}
      color="none"
      className={clsx(
        props.className,
        'button-launch-tour button-help button-tour',
      )}
    >
      <TourIcon />
      <span className="sr-only">
        {i18n.translate(`BUTTON_TOUR`)}
      </span>
      {children}
    </CoreButton>
  )
}

export default TourButton
