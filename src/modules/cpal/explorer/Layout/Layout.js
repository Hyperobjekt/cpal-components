import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import useStore from './../store.js'
import shallow from 'zustand/shallow'
import i18n from '@pureartisan/simple-i18n'
import clsx from 'clsx'
import {
  FiFilter,
  FiMap,
  FiList,
  FiMenu,
  FiInfo,
} from 'react-icons/fi'
import { MdCallSplit } from 'react-icons/md'

import {
  Header,
  Logo,
  Canvas,
  View,
  Divider,
  CoreButton,
  Select,
} from '../../../core'
import MenuSearch from './MenuSearch/MenuSearch'
import ControlPanel from './../ControlPanel/ControlPanel'
import FeederView from './../FeederView/FeederView'
import MapView from './../MapView/MapView'
import SlideoutPanel from './../SlideoutPanel/SlideoutPanel'

import './Layout.scss'

/**
 * Layout sets up the basic layout for the explorer.
 * @param Object children Child elements
 * @param Object props    Props passed from parent
 */
const Layout = ({ children, ...props }) => {
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
  // Handle clicks to any control panel button.
  const handleClick = e => {
    e.preventDefault()
    console.log('Button clicked, ', e.currentTarget.id)
    if (
      e.currentTarget.id === 'button_view_feeder' ||
      (e.currentTarget.id = 'button_view_map')
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
      // Never opened
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
    <div className="layout" {...props}>
      <Header>
        <Logo {...logoProps} />
        <MenuSearch />
        <CoreButton
          id="button_toggle_menu"
          aria-label={i18n.translate(`BUTTON_MENU`)}
          onClick={handleClick}
          color="secondary"
          className="button-toggle-menu"
        >
          <FiMenu />
        </CoreButton>
      </Header>
      <main>
        <Canvas>
          <SlideoutPanel />
          <ControlPanel>
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
            <CoreButton
              id="button_view_map"
              aria-label={i18n.translate(`BUTTON_VIEW_MAP`)}
              title={i18n.translate(`BUTTON_VIEW_MAP`)}
              onClick={handleClick}
              color="light"
              className={clsx(
                'button-view-map',
                activeView && activeView === 'map'
                  ? 'active'
                  : '',
              )}
            >
              <FiMap />
              <span className="sr-only">
                {i18n.translate(`BUTTON_VIEW_MAP`)}
              </span>
            </CoreButton>
            <CoreButton
              id="button_view_feeder"
              aria-label={i18n.translate(
                `BUTTON_VIEW_FEEDER`,
              )}
              title={i18n.translate(`BUTTON_VIEW_FEEDER`)}
              onClick={handleClick}
              color="light"
              className={clsx(
                'button-view-feeder',
                activeView && activeView === 'feeder'
                  ? 'active'
                  : '',
              )}
            >
              <FiList />
              <span className="sr-only">
                {i18n.translate(`BUTTON_VIEW_FEEDER`)}
              </span>
            </CoreButton>
            <Divider />
            <CoreButton
              id="button_toggle_panel_filters"
              aria-label={i18n.translate(
                `BUTTON_TOGGLE_PANEL_FILTERS`,
              )}
              onClick={handlePanel}
              color="light"
              className={clsx(
                'button-panel-filters',
                slideoutPanel.active &&
                  slideoutPanel.panel === 'filters'
                  ? 'active'
                  : '',
              )}
            >
              <FiFilter />
              <span className="sr-only">
                {i18n.translate(`BUTTON_TOGGLE_FILTERS`)}
              </span>
            </CoreButton>
            <CoreButton
              id="button_toggle_panel_info"
              aria-label={i18n.translate(
                `BUTTON_TOGGLE_PANEL_INFO`,
              )}
              onClick={handlePanel}
              color="light"
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
            <CoreButton
              id="button_toggle_panel_weight"
              aria-label={i18n.translate(
                `BUTTON_TOGGLE_PANEL_WEIGHT`,
              )}
              onClick={handlePanel}
              color="light"
              className="button-view-weights"
              styles={{ display: 'none' }}
            >
              <MdCallSplit />
              <span className="sr-only">
                {i18n.translate(`BUTTON_TOGGLE_WEIGHT`)}
              </span>
            </CoreButton>
          </ControlPanel>
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
        </Canvas>
      </main>
    </div>
  )
}

Layout.propTypes = {}

export default Layout
