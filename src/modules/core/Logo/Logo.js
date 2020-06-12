import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './Logo.css'

/**
 * Renders site logo with image and site name as screen-reader only h1 content.
 * @param String siteName Site name text string, read by screen readers
 * @param String homeHref Site root href, defaults to '/'
 * @param String logoSrc  SVG string for logo
 */
const Logo = ({ ...props }) => {
  // console.log('Logo')
  return (
    <h1>
      <a href={props.siteHref}>
        <span className="sr-only">{props.siteName}</span>
        <div
          className="logo"
          dangerouslySetInnerHTML={{
            __html: props.logoSrc,
          }}
        ></div>
      </a>
    </h1>
  )
}

Logo.propTypes = {
  /** Site name string */
  siteName: PropTypes.string,
  /** Href for home link */
  homeHref: PropTypes.string,
  /** Image source for site logo */
  logoSrc: PropTypes.string,
}

Logo.defaultProps = {
  siteName: `Site Name`,
  homeHref: `/`,
  logoSrc: `<svg width="150" height="50">
            <rect width="150" height="50" style="fill:#545b62;stroke-width:3;stroke:#545b62" />
          </svg>`,
}

export default Logo
