import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './Logo.css'

/**
 * Renders site logo with image and site name as screen-reader only h1 content
 * @param String siteName Site name text string, read by screen readers
 * @param String homeHref Site root href, defaults to '/'
 * @param String logoSrc  SVG string for logo
 */
const Logo = ({ siteTitle, homeHref, logoSrc }) => {
  // console.log('Logo')
  return (
    <h1>
      <a href={homeHref}>
        <span className="sr-only">{siteTitle}</span>
        <div
          className="logo"
          dangerouslySetInnerHTML={{ __html: logoSrc }}
        ></div>
      </a>
    </h1>
  )
}

Logo.propTypes = {
  /** Site name string */
  siteTitle: PropTypes.string,
  /** Href for home link */
  homeHref: PropTypes.string,
  /** Image source for site logo */
  logoSrc: PropTypes.string,
}

Logo.defaultProps = {
  siteTitle: `Site Name`,
  homeHref: `/`,
  logoSrc: `<svg width="150" height="50">
            <rect width="150" height="50" style="fill:rgb(255,0,0);stroke-width:3;stroke:rgb(255,0,0)" />
          </svg>`,
}

export default Logo
