import React, { useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'

/**
 * Displays the site header.
 */
export default function Header({
  className,
  sticky,
  shrinkOffset,
  children,
  ...props
}) {
  // state indicating whether header is condensed
  const [shrink, setShrink] = useState(false)

  useScrollPosition(({ prevPos, currPos }) => {
    // ignore scroll position if no scroll shrink
    if (!shrinkOffset && shrinkOffset !== 0) return
    // check if conditions are met and shrink header
    currPos.y > shrinkOffset && shrink && setShrink(false)
    currPos.y < shrinkOffset && !shrink && setShrink(true)
  })

  return (
    <header
      className={clsx('header', className, {
        'header--shrink': shrink,
        'header--sticky': sticky,
      })}
      {...props}
    >
      {children}
    </header>
  )
}

Header.propTypes = {
  /** Custom class name to add to the component */
  className: PropTypes.string,
  /** Determines if header sticks to top of viewport */
  sticky: PropTypes.bool,
  /** Determines at what scroll position the header should shrink */
  shrinkOffset: PropTypes.number,
}

Header.defaultProps = {
  className: null,
  sticky: false,
  shrinkOffset: null,
}
