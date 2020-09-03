import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import shallow from 'zustand/shallow'
import i18n from '@pureartisan/simple-i18n'
import clsx from 'clsx'

import useStore from './../store'
import {
  Header,
  Logo,
  Canvas,
  View,
  CoreButton,
} from './../../../core'
import SchoolSearch from './../SchoolSearch/SchoolSearch'
import ControlPanel from './../ControlPanel/ControlPanel'
import FeederView from './../FeederView/FeederView'
import MapView from './../MapView/MapView'
import RouteManager from './../RouteManager/RouteManager'
import SlideoutPanel from './../SlideoutPanel/SlideoutPanel'
import IntroModal from './../IntroModal/IntroModal'
import PanelModal from './../PanelModal/PanelModal'
import {
  ShareLinkModal,
  UnifiedShareModal,
} from './../Share'
import { ROUTE_SET } from './../../../../constants/metrics'

/**
 * Layout sets up the basic layout for the explorer.
 * @param Object children Child elements
 * @param Object props    Props passed from parent
 */
const Layout = ({ children, ...props }) => {
  // const [tooltipOpen, setTooltipOpen] = useState(false)
  // const toggle = () => setTooltipOpen(!tooltipOpen)
  const logoProps = {
    siteName: i18n.translate(`SITE_TITLE`),
    siteHref: useStore(state => state.siteHref),
    logoSrc: useStore(state => state.logoSrc),
  }
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
      console.log('toggle menu clicked')
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

  return (
    <div
      className={clsx('layout', 'breakpoint-' + breakpoint)}
      {...props}
    >
      <RouteManager routeSet={ROUTE_SET} />
      <Header>
        <Logo {...logoProps} />
        <SchoolSearch />
        <CoreButton
          id="button_toggle_menu"
          aria-label={i18n.translate(`BUTTON_MENU`)}
          onClick={handleClick}
          color="none"
          className="button-toggle-menu"
        >
          <span className="menu-icon-group">
            <span className="menu-icon svg-base"></span>
            {i18n.translate(`BUTTON_MENU`)}
          </span>
        </CoreButton>
      </Header>
      <main>
        <Canvas>
          <SlideoutPanel />
          <ControlPanel></ControlPanel>
          <div
            className={clsx(
              'view-parent',
              activeView
                ? 'display-' + activeView
                : 'display-map',
            )}
          >
            <MapView />
            <FeederView />
          </div>
          <ShareLinkModal className="modal-share-link" />
          <UnifiedShareModal className="modal-u-share" />
          <IntroModal />
          <PanelModal />
        </Canvas>
      </main>
    </div>
  )
}

Layout.propTypes = {}

export default Layout
