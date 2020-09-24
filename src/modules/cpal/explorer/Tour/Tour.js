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
  const defaultTimeout = 600
  const setHovered = useStore(state => state.setHovered)
  const setShowMapModal = useStore(
    state => state.setShowMapModal,
  )
  const runTour = useStore(state => state.runTour)
  const setRunTour = useStore(state => state.setRunTour)
  const breakpoint = useStore(state => state.breakpoint)
  const tourStepIndex = useStore(
    state => state.tourStepIndex,
  )
  const setTourStepIndex = useStore(
    state => state.setTourStepIndex,
  )

  const isMobile = () => {
    return (
      breakpoint === 'xs' ||
      breakpoint === 'sm' ||
      breakpoint === 'md'
    )
  }

  const getSteps = () => {
    let steps
    if (!!isMobile()) {
      steps = mobileSteps
    } else {
      steps = desktopSteps
    }
    return steps
  }

  const clickElements = (
    querySelectors,
    index,
    stepIndex,
    incrementStep,
  ) => {
    // Fetch targets and click them.
    const targets = document.querySelectorAll(
      querySelectors[index],
    )
    targets.forEach(item => {
      console.log(item)
      item.click()
    })
    // Timeout, and process next after.
    setTimeout(() => {
      // console.log('Timeout triggered, ', Date.now())
      // If last one, start the tour again.
      if (index === querySelectors.length - 1) {
        // Last one.
        // console.log('Last one.')
        setTourStepIndex(
          stepIndex + (incrementStep ? 1 : 0),
        )
        setRunTour(true)
      } else {
        // console.log('Not last one.')
        clickElements(
          querySelectors,
          index + 1,
          stepIndex,
          incrementStep,
        )
      }
    }, defaultTimeout)
  }

  const handleTourUpdate = data => {
    // console.log('handleTourUpdate, ', data)
    const steps = getSteps()
    // console.log('steps = ', steps)
    const { action, index, status, type } = data
    if ([ACTIONS.CLOSE, ACTIONS.STOP].includes(action)) {
      setRunTour(false)
    }
    if ([EVENTS.STEP_AFTER].includes(type)) {
      const increment = action === ACTIONS.PREV ? -1 : 1
      const next = steps[data.index + increment]
      if (next && next.clickOn) {
        if (next.clickOn.length !== 0) {
          // Stop the tour.
          setRunTour(false)
          // Call recursive timed function to handle all clicks.
          clickElements(next.clickOn, 0, data.index, true)
        }
      } else {
        // console.log('Nothin doin, moving on.')
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
    beaconSize: 42,
    overlayColor: 'rgba(0, 0, 0, 0.75)',
    primaryColor: '#e94f34', // '#f04', // Button color.
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
      debug={false}
      locale={localeStrings}
      showProgress={true}
      styles={{ ...defaultOptions }}
      floaterProps={{
        styles: {
          wrapper: {
            zIndex: 4000,
          },
        },
      }}
      disableOverlay={false}
      disableScrolling={!!isMobile() ? false : true}
      hideBackButton={true}
    />
  )
}

export default Tour
