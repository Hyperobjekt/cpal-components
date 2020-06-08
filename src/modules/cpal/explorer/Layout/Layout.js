import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'
import { useState } from 'zustand'
import useStore from './../store.js'
import { Header } from '../../../core'
import { Logo } from '../../../core'
import MenuButton from './../MenuButton/MenuButton'
import MenuSearch from './../MenuSearch/MenuSearch'
import ControlPanel from './../ControlPanel/ControlPanel'

const Layout = ({ children, ...props }) => {
  const store = useStore()
  const logoProps = {
    siteName: store.siteTitle,
    siteHref: store.siteHref,
    logoSrc: store.logoSrc,
  }
  return (
    <div className="layout" {...props}>
      <Header>
        <Logo {...logoProps} />
        <MenuSearch />
        <MenuButton />
      </Header>
      <main>
        <ControlPanel></ControlPanel>
        {children}
      </main>
    </div>
  )
}

Layout.propTypes = {}

export default Layout
