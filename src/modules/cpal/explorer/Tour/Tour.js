import React from 'react'
import Joyride, {
  ACTIONS,
  EVENTS,
  LIFECYCLE,
  STATUS,
} from 'react-joyride'
import i18n from '@pureartisan/simple-i18n'

import useStore from './../store'
import {
  DESKTOP_STEPS,
  MOBILE_STEPS,
} from './../../../../constants/tour'

const Tour = ({ ...props }) => {
  const desktopSteps = DESKTOP_STEPS.map(el => {
    // console.log('el,', el.content)
    el.content = i18n.translate(el.text)
    return el
  })
  const mobileSteps = MOBILE_STEPS.map(el => {
    el.content = i18n.translate(el.text)
    return el
  })
  // console.log('desktopSteps, ', desktopSteps)

  const runTour = useStore(state => state.runTour)
  const setRunTour = useStore(state => state.setRunTour)
  const breakpoint = useStore(state => state.breakpoint)
  const tourStepIndex = useStore(
    state => state.tourStepIndex,
  )
  const setTourStepIndex = useStore(
    state => state.setTourStepIndex,
  )

  const getSteps = () => {
    let steps
    if (
      breakpoint === 'xs' ||
      breakpoint === 'sm' ||
      breakpoint === 'md'
    ) {
      steps = mobileSteps
    } else {
      steps = desktopSteps
    }
    return steps
  }

  const handleTourUpdate = data => {
    console.log('handleTourUpdate, ', data)
    const steps = getSteps()
    const { action, index, status, type } = data
    if ([ACTIONS.CLOSE, ACTIONS.STOP].includes(action)) {
      setRunTour(false)
    }
    if ([EVENTS.STEP_AFTER].includes(type)) {
      const increment = action === ACTIONS.PREV ? -1 : 1
      if (
        steps[data.index + increment] &&
        steps[data.index + increment].clickOn
      ) {
        if (
          steps[data.index + increment].clickOn.length !== 0
        ) {
          setRunTour(false)
          console.log('has a clickOn')
          const target = document.querySelector(
            steps[data.index + increment].clickOn,
          )
          setTourStepIndex(data.index + increment)
          target.click()
          setTimeout(() => {
            setRunTour(true)
          }, 2000)
        }
      } else {
        setTourStepIndex(data.index + increment)
      }
    } else if (
      [STATUS.FINISHED, EVENTS.TARGET_NOT_FOUND].includes(
        status,
      )
    ) {
      setTourStepIndex(0)
      setRunTour(false)
    }
  }

  const localeStrings = {
    back: i18n.translate('TOUR_UI_ACTIONS_BACK'),
    close: i18n.translate('TOUR_UI_ACTIONS_CLOSE'),
    last: i18n.translate('TOUR_UI_ACTIONS_LAST'),
    next: i18n.translate('TOUR_UI_ACTIONS_NEXT'),
    skip: i18n.translate('TOUR_UI_ACTIONS_SKIP'),
  }

  // Styles
  const defaultOptions = {
    arrowColor: '#fff',
    backgroundColor: '#fff',
    beaconSize: 36,
    overlayColor: 'rgba(0, 0, 0, 0.75)',
    primaryColor: '#f04',
    spotlightShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
    textColor: '#333',
    width: undefined,
    zIndex: 4000,
    textAlign: 'left',
  }

  return (
    <Joyride
      steps={getSteps()}
      run={runTour}
      stepIndex={tourStepIndex}
      callback={handleTourUpdate}
      continuous={true}
      debug={true}
      locale={localeStrings}
      showProgress={true}
      styles={{ ...defaultOptions }}
      disableOverlay={false}
      hideBackButton={true}
    />
  )
}

export default Tour
