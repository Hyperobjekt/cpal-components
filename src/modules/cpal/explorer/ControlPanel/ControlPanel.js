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
import { TourButton } from './../Tour'

/**
 * Control panel that contains selectors and filters which alter map display.
 * @param Object children Child components
 */
const ControlPanel = ({ children }) => {
  // Generic state updates for store.
  // Accepts an object of values to update.
  const setStoreValues = useStore(
    state => state.setStoreValues,
  )
  // Active view, map or feeder
  const activeView = useStore(state => state.activeView)
  // Array of objects, one for each select dropdown item
  const viewSelectItems = useStore(
    state => state.viewSelect,
  )
  // Slideout panel
  const slideoutPanel = useStore(
    state => state.slideoutPanel,
  )
  const breakpoint = useStore(state => state.breakpoint)
  const browserWidth = useStore(state => state.browserWidth)
  const showIntroModal = useStore(
    state => state.showIntroModal,
  )
  const toggleIntroModal = () =>
    setStoreValues({
      showIntroModal: !showIntroModal,
    })
  // Modal for small devices
  const showPanelModal = useStore(
    state => state.showPanelModal,
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
      setStoreValues({
        activeView: val,
        slideoutPanel: {
          active: false,
          panel: '',
        },
      })
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
      // console.log('show the modal')
      setStoreValues({
        showPanelModal: true,
        slideoutPanel: {
          active: false,
          panel: clicked,
        },
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
      setStoreValues({
        slideoutPanel: {
          active: newActiveState,
          panel: clicked,
        },
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
    setStoreValues({
      activeView: val,
      viewSelect: [
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
      ],
    })
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
  const buttonTooltipPosition = useStore(
    state => state.buttonTooltipPosition,
  )
  const interactionsMobile = useStore(
    state => state.interactionsMobile,
  )
  // Set tooltip position if browser width changes.
  useEffect(() => {
    setStoreValues({
      buttonTooltipPosition: !!interactionsMobile
        ? ''
        : getPositionFromBreakpoint(breakpoint),
    })
  }, [browserWidth])
  // Set tooltip position on load.
  useEffect(() => {
    setStoreValues({
      buttonTooltipPosition: !!interactionsMobile
        ? ''
        : getPositionFromBreakpoint(breakpoint),
    })
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
      <TourButton
        className="d-none d-lg-block"
        tooltip={true}
      />
      <Divider />
      <UnifiedShareBtn className="d-block d-lg-none" />
      <DesktopUnifiedShareBtn className="d-none d-lg-block" />
    </div>
  )
}

ControlPanel.propTypes = {}

export default ControlPanel
