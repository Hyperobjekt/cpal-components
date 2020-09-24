import React from 'react'
import PropTypes from 'prop-types'
import useStore from './../store.js'
import i18n from '@pureartisan/simple-i18n'
import {
  FiFilter,
  FiMap,
  FiList,
  FiMenu,
} from 'react-icons/fi'
import { MdCallSplit } from 'react-icons/md'
import { GiJourney } from 'react-icons/gi'

import { CoreButton } from './../../../core'

const PanelInfoView = ({ ...props }) => {
  const activeView = useStore(state => state.activeView)
  const enableTour = useStore(state => state.enableTour)
  const setRunTour = useStore(state => state.setRunTour)
  const setActiveView = useStore(
    state => state.setActiveView,
  )
  const defaultMetric = useStore(
    state => state.defaultMetric,
  )
  const setActiveMetric = useStore(
    state => state.setActiveMetric,
  )
  const setActiveQuintiles = useStore(
    state => state.setActiveQuintiles,
  )
  const setSlideoutPanel = useStore(
    state => state.setSlideoutPanel,
  )
  const setShowPanelModal = useStore(
    state => state.setShowPanelModal,
  )

  const getTourButton = () => {
    if (!!enableTour) {
      return (
        <CoreButton
          color="light"
          label={i18n.translate(
            'UI_MAP_INTRO_MODAL_TOUR_BTN',
          )}
          onClick={handleStartTour}
        >
          <GiJourney />
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
    // console.log('handleStartTour()')
    // Return view to map.
    setActiveView('map')
    // Reset metric
    setActiveMetric(defaultMetric)
    // Reset quintiles.
    setActiveQuintiles([1, 1, 1, 1, 1])
    // Close the panel.
    setSlideoutPanel({
      active: false,
      panel: '',
    })
    // Close modal if displayed
    setShowPanelModal(false)
    // Run the tour.
    setRunTour(true)
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
