import React, { useState } from 'react'
import { Row, Col } from 'reactstrap'

import { menuPages } from './../../../../constants/menu'
import InlineSvg from './inlineSvg'

const Menu = ({ activePageId }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleMenuOpen = () => setMenuOpen(!menuOpen)
  const closeMenu = () => setMenuOpen(false)

  const getMenuPanel = () => {
    return (
      <Row
        noGutters
        className="menu-panel"
        onWheel={closeMenu}
        onScroll={closeMenu}
      >
        <div className="logo"></div>
        <div className="close-menu" onClick={closeMenu}>
          <InlineSvg type="x" />
          Close
        </div>
        <Col className="dallas-isd" xs={1}>
          {/* <span className="text">DALLAS ISD</span> */}
        </Col>

        <Col className="menu-page-names-col" xs={5}>
          <div className="menu-page-names-container">
            {menuPages.map(page => {
              const nameClasses =
                'menu-page-name' +
                (page.id === 'explorer' ? ' active' : '')
              const navigateToPage = () => {
                closeMenu()
              }
              return (
                <a
                  onClick={navigateToPage}
                  href={page.path}
                  className={nameClasses}
                  key={page.id}
                >
                  {page.name}
                </a>
              )
            })}
          </div>
        </Col>
        <Col className="equipped">
          <div className="text">
            <div>
              All Dallas neighborhoods<br></br>should have
              what they need<br></br>to thrive.
            </div>
          </div>
        </Col>
        <Col
          className="mask"
          onClick={closeMenu}
          onWheel={closeMenu}
          onScroll={closeMenu}
        ></Col>
      </Row>
    )
  }

  const classes =
    'menu-component' + (menuOpen ? ' open' : '')

  return (
    <div className={classes}>
      <span
        onClick={toggleMenuOpen}
        className="menu-icon-group"
      >
        <span className="menu-icon svg-base"></span>
        Menu
      </span>

      {getMenuPanel()}
    </div>
  )
}

export default Menu
