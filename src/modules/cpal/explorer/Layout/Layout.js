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
import Tour from './../Tour/Tour'
import { Tracking } from './../Tracking'
import { ROUTE_SET } from './../../../../constants/metrics'

/**
 * Layout sets up the basic layout for the explorer.
 * @param Object children Child elements
 * @param Object props    Props passed from parent
 */
const Layout = ({ children, ...props }) => {
  // Generic state updates for store.
  // Accepts an object of values to update.
  const setStoreValues = useStore(
    state => state.setStoreValues,
  )
  // Basic props for logo component.
  const logoProps = {
    siteName: i18n.translate(`SITE_TITLE`),
    siteHref: useStore(state => state.siteHref),
    logoSrc: useStore(state => state.logoSrc),
  }
  // Active view, map or feeder
  const activeView = useStore(state => state.activeView)
  const handleToggleMenu = useStore(
    state => state.handleToggleMenu,
  )
  const breakpoint = useStore(state => state.breakpoint)
  const browserWidth = useStore(state => state.browserWidth)

  // Handle clicks to any control panel button.
  const handleClick = e => {
    e.preventDefault()
    // console.log('Button clicked, ', e.currentTarget.id)
    if (e.currentTarget.id === 'button_toggle_menu') {
      // console.log('toggle menu clicked')
      if (!!handleToggleMenu) {
        handleToggleMenu()
      }
    }
  }

  return (
    <div
      className={clsx('layout', 'breakpoint-' + breakpoint)}
      {...props}
    >
      <RouteManager routeSet={ROUTE_SET} />
      <Tracking />
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
          <Tour />
          <PanelModal />
        </Canvas>
      </main>
    </div>
  )
}

Layout.propTypes = {}

export default Layout
