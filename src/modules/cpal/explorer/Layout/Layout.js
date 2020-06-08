import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'zustand'
import useStore from './../store.js'
import { Header } from '../../../core'
import { Logo } from '../../../core'
import MenuButton from './../MenuButton/MenuButton'
import { Button } from 'reactstrap'

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
        <MenuButton />
        <Button>Menu</Button>
      </Header>
      <main>{children}</main>
    </div>
  )
}

Layout.propTypes = {}

export default Layout
