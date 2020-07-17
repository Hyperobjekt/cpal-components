import React from 'react'
import PropTypes from 'prop-types'
import useStore from './../store.js'
import i18n from '@pureartisan/simple-i18n'
import clsx from 'clsx'
import {
  FiFilter,
  FiMap,
  FiList,
  FiMenu,
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
  const activeView = useStore(state => state.activeView)
  const setActiveView = useStore(
    state => state.setActiveView,
  )
  let viewSelectItems = useStore(state => state.viewSelect)
  viewSelectItems.map(el => {
    el.label = i18n.translate(el.label)
  })

  const updateActiveView = val => {
    console.log('updateActiveView, ', val)
    setActiveView(val)
  }
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
      updateActiveView(val)
    }
  }
  const handleSelect = e => {
    e.preventDefault()
    console.log('View selected, ', e.currentTarget.id)
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
            />
            <CoreButton
              id="button_view_map"
              aria-label={i18n.translate(`BUTTON_VIEW_MAP`)}
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
            </CoreButton>
            <CoreButton
              id="button_view_feeder"
              aria-label={i18n.translate(
                `BUTTON_VIEW_FEEDER`,
              )}
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
            </CoreButton>
            <Divider />
            <CoreButton
              id="button_toggle_filters"
              aria-label={i18n.translate(
                `BUTTON_TOGGLE_FILTERS`,
              )}
              onClick={handleClick}
              color="light"
              className="button-view-filters"
            >
              <FiFilter />
            </CoreButton>
            <CoreButton
              id="button_toggle_weight"
              aria-label={i18n.translate(
                `BUTTON_TOGGLE_WEIGHT`,
              )}
              onClick={handleClick}
              color="light"
              className="button-view-weights"
            >
              <MdCallSplit />
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
