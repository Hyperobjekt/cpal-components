import React from 'react'
import PropTypes from 'prop-types'
import useStore from './../store.js'
import i18n from '@pureartisan/simple-i18n'

import { CoreButton, TourIcon } from './../../../core'

const PanelInfoView = ({ ...props }) => {
  // const setStoreValues = useStore(
  //   state => state.setStoreValues,
  // )
  const activeView = useStore(state => state.activeView)
  const enableTour = useStore(state => state.enableTour)
  const defaultMetric = useStore(
    state => state.defaultMetric,
  )
  const defaultFilterTab = useStore(
    state => state.defaultFilterTab,
  )
  const setUpTour = useStore(state => state.setUpTour)
  const interactionsMobile = useStore(
    state => state.interactionsMobile,
  )

  const getTourButton = () => {
    if (!!enableTour && !!interactionsMobile) {
      return (
        <CoreButton
          color="light"
          label={i18n.translate(
            'UI_MAP_INTRO_MODAL_TOUR_BTN',
          )}
          onClick={handleStartTour}
        >
          <TourIcon />
          {i18n.translate('UI_MAP_INTRO_MODAL_TOUR_BTN')}
        </CoreButton>
      )
    } else {
      return ''
    }
  }

  /**
   * Close the intro panel and start the tour
   */
  const handleStartTour = () => {
    console.log('handleStartTour()')
    setUpTour()
    // setStoreValues({
    //   // Return view to map.
    //   activeView: 'map',
    //   // Reset metric.
    //   activeMetric: defaultMetric,
    //   // Reset quintiles.
    //   activeQuintiles: [1, 1, 1, 1, 1],
    //   // Close the panel.
    //   slideoutPanel: {
    //     active: false,
    //     panel: '',
    //   },
    //   // Active tab in slideout panel.
    //   activeFilterTab: defaultFilterTab,
    //   // Close modal if displayed.
    //   showPanelModal: false,
    //   // Return tour to 0.
    //   tourStepIndex: 0,
    //   // Run the tour.
    //   runTour: true,
    // })
  }

  const getContents = () => {
    // Right now, just check for feeder OR map.
    if (activeView === 'feeder') {
      return i18n.translate('UI_PANEL_INFO_FEEDER')
    } else {
      return i18n.translate('UI_PANEL_INFO_MAP')
    }
  }
  return (
    <div className="map-panel-slideout-info">
      <div
        dangerouslySetInnerHTML={{ __html: getContents() }}
      ></div>
      {getTourButton()}
    </div>
  )
}

export default PanelInfoView
