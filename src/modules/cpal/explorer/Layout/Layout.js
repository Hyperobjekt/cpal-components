import React from 'react'
import PropTypes from 'prop-types'
import { Header } from '../../../core'
import { Button } from 'reactstrap'

const Layout = ({ children, ...props }) => {
  return (
    <div className="layout">
      <Header>
        <h1>
          <a href="/">Community Resource Explorer</a>
        </h1>
        <Button>Menu</Button>
      </Header>
      <main>{children}</main>
    </div>
  )
}

Layout.propTypes = {}

export default Layout
