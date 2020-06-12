import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'zustand'
import useStore from './../store.js'
import i18n from '@pureartisan/simple-i18n'
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
import en_US from './../../../../constants/en_US'

import './Layout.scss'

/**
 * Layout sets up the basic layout for the explorer.
 * @param Object children Child elements
 * @param Object props    Props passed from parent
 */
const Layout = ({ children, ...props }) => {
  i18n.init({
    locale: 'en_US',
    languages: {
      en_US: en_US,
    },
  })
  const logoProps = {
    siteName: i18n.translate(`SITE_TITLE`),
    siteHref: useStore(state => state.siteHref),
    logoSrc: useStore(state => state.logoSrc),
  }
  let viewSelectItems = useStore(state => state.viewSelect)
  viewSelectItems.map(el => {
    el.label = i18n.translate(el.label)
  })
  const displayView = useStore(state => state.viewDefault)
  const handleClick = e => {
    e.preventDefault()
    console.log('Button clicked, ', e.currentTarget.id)
  }
  const handleSelect = e => {
    e.preventDefault()
    console.log('View selected, ', e.currentTarget.id)
  }
  return (
    <div className="layout" {...props}>
      <Header>
        <Logo {...logoProps} />
        <MenuSearch i18n={i18n} />
        <CoreButton
          id="button_toggle_menu"
          aria-label={i18n.translate(`BUTTON_MENU`)}
          onClick={handleClick}
          bsColor="secondary"
          className="button-toggle-menu"
        >
          <FiMenu />
        </CoreButton>
      </Header>
      <main>
        <Canvas>
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
              bsColor="light"
              className="button-view-map"
            >
              <FiMap />
            </CoreButton>
            <CoreButton
              id="button_view_feeder"
              aria-label={i18n.translate(
                `BUTTON_VIEW_FEEDER`,
              )}
              onClick={handleClick}
              bsColor="light"
              className="button-view-feeder"
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
              bsColor="light"
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
              bsColor="light"
              className="button-view-weights"
            >
              <MdCallSplit />
            </CoreButton>
          </ControlPanel>
          <View displayView={displayView}>
            <MapView />
            <FeederView />
          </View>
        </Canvas>
      </main>
    </div>
  )
}

Layout.propTypes = {}

export default Layout
