import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import shallow from 'zustand/shallow'
import i18n from '@pureartisan/simple-i18n'
import clsx from 'clsx'
import {
  FiMap,
  FiList,
  FiInfo,
  FiLayers,
} from 'react-icons/fi'
import { MdCallSplit } from 'react-icons/md'
import { AiOutlineControl } from 'react-icons/ai'

import useStore from './../store'
import {
  Divider,
  CoreButton,
  Select,
} from './../../../core'
import SchoolSearch from './../SchoolSearch/SchoolSearch'
import FeederView from './../FeederView/FeederView'
import MapView from './../MapView/MapView'
import RouteManager from './../RouteManager/RouteManager'
import SlideoutPanel from './../SlideoutPanel/SlideoutPanel'
import {
  TwitterShareBtn,
  FacebookShareBtn,
  MailShareBtn,
  LinkShareBtn,
  ShareLinkModal,
  UnifiedShareBtn,
  DesktopUnifiedShareBtn,
} from './../Share'

/**
 * Control panel that contains selectors and filters which alter map display.
 * @param Object children Child components
 */
const ControlPanel = ({ children }) => {
  // Active view, map or feeder
  const activeView = useStore(state => state.activeView)
  const setActiveView = useStore(
    state => state.setActiveView,
  )
  // Array of objects, one for each select dropdown item
  const viewSelectItems = useStore(
    state => state.viewSelect,
  )
  const setViewSelect = useStore(
    state => state.setViewSelect,
  )
  // Slideout panel
  const slideoutPanel = useStore(
    state => state.slideoutPanel,
  )
  const setSlideoutPanel = useStore(
    state => state.setSlideoutPanel,
  )
  const handleToggleMenu = useStore(
    state => state.handleToggleMenu,
  )
  const breakpoint = useStore(state => state.breakpoint)
  const browserWidth = useStore(state => state.browserWidth)

  const [introModal, setIntroModal] = useState(false)

  const showIntroModal = useStore(
    state => state.showIntroModal,
  )
  const setShowIntroModal = useStore(
    state => state.setShowIntroModal,
  )
  const toggleIntroModal = () =>
    setShowIntroModal(!showIntroModal)

  // Modal for small devices
  const showPanelModal = useStore(
    state => state.showPanelModal,
  )
  const setShowPanelModal = useStore(
    state => state.setShowPanelModal,
  )

  // Handle clicks to any control panel button.
  const handleClick = e => {
    e.preventDefault()
    // console.log('Button clicked, ', e.currentTarget.id)
    if (
      e.currentTarget.id === 'button_view_feeder' ||
      e.currentTarget.id === 'button_view_map'
    ) {
      const val = String(e.currentTarget.id).replace(
        'button_view_',
        '',
      )
      setActiveView(val)
      setSlideoutPanel({
        active: false,
        panel: '',
      })
    }
    if (e.currentTarget.id === 'button_toggle_menu') {
      // console.log('toggle menu clicked')
      if (!!handleToggleMenu) {
        handleToggleMenu()
      }
    }
  }

  /**
   * Handles click to panel toggle buttons.
   * @param  Object e Event object
   */
  const handlePanel = e => {
    // console.log(
    //   'handlePanel(), ',
    //   e.currentTarget,
    //   slideoutPanel,
    // )
    e.preventDefault()
    if (
      e.currentTarget.id !==
        'button_toggle_panel_filters' &&
      e.currentTarget.id !== 'button_toggle_panel_layers' &&
      e.currentTarget.id !== 'button_toggle_panel_info'
    )
      return
    // Retrieve clicked
    let clicked = String(e.currentTarget.id).replace(
      'button_toggle_panel_',
      '',
    )
    // Conditionally adjust panel settings
    let newActiveState = false
    if (
      breakpoint === 'xs' ||
      breakpoint === 'sm' ||
      breakpoint === 'md'
    ) {
      console.log('show the modal')
      // Modal size, handle as a modal.
      setShowPanelModal(true)
      setSlideoutPanel({
        active: false,
        panel: clicked,
      })
    } else {
      // Slideout panel size, handle as slideout.
      if (
        !slideoutPanel.active &&
        slideoutPanel.panel.length < 1
      ) {
        // If never opened
        newActiveState = true
      } else if (
        !!slideoutPanel.active &&
        slideoutPanel.panel.length > 0 &&
        slideoutPanel.panel === clicked
      ) {
        // Selected existing open panel
        newActiveState = false
        clicked = ''
      } else {
        // Selected different panel
        newActiveState = true
      }
      // Reset panel state
      setSlideoutPanel({
        active: newActiveState,
        panel: clicked,
      })
    }
  }
  // Handle select in dropdown
  const handleSelect = e => {
    e.preventDefault()
    // console.log('View selected, ', e.currentTarget.id)
    const val = String(e.currentTarget.id).replace(
      'select_view_',
      '',
    )
    setActiveView(val)
    setViewSelect([
      {
        label: `SELECT_ITEM_MAP`,
        id: `select_view_map`,
        active: val === 'map' ? true : false,
      },
      {
        label: `SELECT_ITEM_FEEDER`,
        id: `select_view_feeder`,
        active: val === 'feeder' ? true : false,
      },
    ])
  }

  const shareHash = useStore(state => state.shareHash)
  const constructShareLink = () => {
    // If hash === default hash, send back only the root url.
    if (!!shareHash) {
      return (
        window.location.origin +
        window.location.pathname +
        shareHash
      )
    } else {
      return (
        window.location.origin +
        window.location.pathname +
        defaultRoute
      )
    }
  }

  /**
   * Determines control panel button position based on breakpoint
   * @param  {String} breakpoint
   * @return {String}
   */
  const getPositionFromBreakpoint = breakpoint => {
    // console.log('getPositionFromBreakpoint')
    if (
      breakpoint === 'md' ||
      breakpoint === 'sm' ||
      breakpoint === 'xs'
    ) {
      return 'bottom'
    } else {
      return 'right'
    }
  }
  /**
   * Updates positioning for tooltips on buttons in control panel.
   */
  // const [buttonPosition, setButtonPosition] = useState(
  //   'auto',
  // )
  const buttonTooltipPosition = useStore(
    state => state.buttonTooltipPosition,
  )
  const setButtonTooltipPosition = useStore(
    state => state.setButtonTooltipPosition,
  )
  useEffect(() => {
    // console.log(
    //   'browserWidth changed',
    //   getPositionFromBreakpoint(breakpoint),
    // )
    setButtonTooltipPosition(
      getPositionFromBreakpoint(breakpoint),
    )
  }, [browserWidth])
  useEffect(() => {
    // console.log(
    //   'component loaded',
    //   getPositionFromBreakpoint(breakpoint),
    // )
    setButtonTooltipPosition(
      getPositionFromBreakpoint(breakpoint),
    )
  }, [])

  return (
    <div
      className={clsx(
        'layout-control-panel',
        activeView
          ? 'display-' + activeView
          : 'display-map',
      )}
    >
      <Select
        id="select_view"
        color="primary"
        className={`select-view`}
        label={i18n.translate(`SELECT_VIEW`)}
        items={viewSelectItems}
        handleSelect={handleSelect}
        title={i18n.translate(`SELECT_VIEW`)}
        active={'select_view_' + activeView}
      />
      <div className="control-label">
        {i18n.translate('CONTROL_PANEL_VIEW')}
      </div>
      <CoreButton
        id="button_view_map"
        label={i18n.translate(`BUTTON_VIEW_MAP`)}
        onClick={handleClick}
        color="none"
        className={clsx(
          'button-core',
          'button-view-map',
          activeView && activeView === 'map'
            ? 'active'
            : '',
        )}
        tooltip={buttonTooltipPosition}
      >
        <FiMap />
        <span className="sr-only">
          {i18n.translate(`BUTTON_VIEW_MAP`)}
        </span>
      </CoreButton>
      <CoreButton
        id="button_view_feeder"
        label={i18n.translate(`BUTTON_VIEW_FEEDER`)}
        onClick={handleClick}
        color="none"
        className={clsx(
          'button-view-feeder',
          activeView && activeView === 'feeder'
            ? 'active'
            : '',
        )}
        tooltip={buttonTooltipPosition}
      >
        <FiList />
        <span className="sr-only">
          {i18n.translate(`BUTTON_VIEW_FEEDER`)}
        </span>
      </CoreButton>
      <Divider />
      {activeView === 'map' ? (
        <>
          <div className="control-label">
            {i18n.translate('CONTROL_PANEL_METRICS')}
          </div>
          <CoreButton
            id="button_toggle_panel_filters"
            label={i18n.translate(
              `BUTTON_TOGGLE_PANEL_FILTERS`,
            )}
            onClick={handlePanel}
            color="none"
            tooltip={buttonTooltipPosition}
            className={clsx(
              'button-panel-filters',
              slideoutPanel.active &&
                slideoutPanel.panel === 'filters'
                ? 'active'
                : '',
            )}
          >
            <AiOutlineControl />
            <span className="sr-only">
              {i18n.translate(`BUTTON_TOGGLE_FILTERS`)}
            </span>
          </CoreButton>
          <Divider />
          <div className="control-label">
            {i18n.translate('CONTROL_PANEL_LAYERS')}
          </div>
          <CoreButton
            id="button_toggle_panel_layers"
            label={i18n.translate(
              `BUTTON_TOGGLE_PANEL_LAYERS`,
            )}
            onClick={handlePanel}
            color="none"
            tooltip={buttonTooltipPosition}
            className={clsx(
              'button-panel-layers',
              slideoutPanel.active &&
                slideoutPanel.panel === 'layers'
                ? 'active'
                : '',
            )}
          >
            <FiLayers />
            <span className="sr-only">
              {i18n.translate(`BUTTON_TOGGLE_PANEL_LAYERS`)}
            </span>
          </CoreButton>
          <Divider />
        </>
      ) : (
        ''
      )}
      <div className="control-label">
        {i18n.translate('CONTROL_PANEL_INFO')}
      </div>
      <CoreButton
        id="button_toggle_panel_info"
        label={i18n.translate(`BUTTON_TOGGLE_PANEL_INFO`)}
        tooltip={buttonTooltipPosition}
        onClick={handlePanel}
        color="none"
        styles={{ display: 'none' }}
        className={clsx(
          'button-panel-info',
          slideoutPanel.active &&
            slideoutPanel.panel === 'info'
            ? 'active'
            : '',
        )}
      >
        <FiInfo />
        <span className="sr-only">
          {i18n.translate(`BUTTON_TOGGLE_INFO`)}
        </span>
      </CoreButton>
      <Divider />
      <UnifiedShareBtn className="d-block d-lg-none" />
      <DesktopUnifiedShareBtn className="d-none d-lg-block" />
    </div>
  )
}

ControlPanel.propTypes = {}

export default ControlPanel
