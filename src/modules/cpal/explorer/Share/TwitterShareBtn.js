import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@pureartisan/simple-i18n'
import { FaTwitter } from 'react-icons/fa'
import clsx from 'clsx'

import useStore from './../store'
import { CoreButton } from './../../../core'
import { onTwitterShare, constructShareLink } from './Share'

const TourButton = ({ children, ...props }) => {
  // Generic store value setter.
  const setStoreValues = useStore(
    state => state.setStoreValues,
  )
  const shareHash = useStore(state => state.shareHash)
  const buttonTooltipPosition = useStore(
    state => state.buttonTooltipPosition,
  )
  const eventShareTwitter = useStore(
    state => state.eventShareTwitter,
  )
  const incrementCustomEvent = useStore(
    state => state.incrementCustomEvent,
  )

  const handleShare = () => {
    onTwitterShare(
      encodeURIComponent(constructShareLink(shareHash)),
      i18n.translate('DIALOG_SHARE_TWITTER'),
    )
    setStoreValues({
      eventShareTwitter: eventShareTwitter + 1,
    })
  }

  return (
    <CoreButton
      id="button_share_twitter"
      label={i18n.translate(`BUTTON_SHARE_TWITTER`)}
      tooltip={props.tooltip ? buttonTooltipPosition : ''}
      onClick={handleShare}
      color="none"
      className={clsx(
        props.className,
        'button-share-twitter button-share',
      )}
    >
      <FaTwitter />
      <span className="sr-only">
        {i18n.translate(`BUTTON_SHARE_TWITTER`)}
      </span>
      {children}
    </CoreButton>
  )
}

export default TourButton
