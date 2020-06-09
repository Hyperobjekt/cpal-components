import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'
import { useState } from 'zustand'
import useStore from './../store.js'

import {
  Header,
  Logo,
  Canvas,
  View,
  Divider,
} from '../../../core'
import MenuButton from './../MenuButton/MenuButton'
import MenuSearch from './../MenuSearch/MenuSearch'
import ControlPanel from './../ControlPanel/ControlPanel'
import FeederView from './../FeederView/FeederView'
import FeederViewButton from './../FeederViewButton/FeederViewButton'
import MapView from './../MapView/MapView'
import MapViewButton from './../MapViewButton/MapViewButton'
import FiltersButton from './../FiltersButton/FiltersButton'
import WeightButton from './../WeightButton/WeightButton'
import ViewSelect from './../ViewSelect/ViewSelect'

/**
 * Layout sets up the basic layout for the explorer.
 * @param Object children Child elements
 * @param Object props    Props passed from parent
 */
const Layout = ({ children, ...props }) => {
  const store = useStore()
  const logoProps = {
    siteName: store.siteTitle,
    siteHref: store.siteHref,
    logoSrc: store.logoSrc,
  }
  const displayView = store.viewDefault
  return (
    <div className="layout" {...props}>
      <Header>
        <Logo {...logoProps} />
        <MenuSearch />
        <MenuButton />
      </Header>
      <main>
        <Canvas>
          <ControlPanel>
            <ViewSelect />
            <MapViewButton />
            <FeederViewButton />
            <Divider />
            <FiltersButton />
            <WeightButton />
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
