import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@pureartisan/simple-i18n'
import { FaTwitter } from 'react-icons/fa'
import clsx from 'clsx'

import useStore from './../store'
import { CoreButton } from './../../../core'
import { onTwitterShare, constructShareLink } from './Share'

const TwitterShareBtn = ({ children, ...props }) => {
  const shareHash = useStore(state => state.shareHash)
  const buttonTooltipPosition = useStore(
    state => state.buttonTooltipPosition,
  )

  const handleShare = () => {
    onTwitterShare(
      encodeURIComponent(constructShareLink(shareHash)),
      i18n.translate('DIALOG_SHARE_TWITTER'),
    )
  }

  return (
    <CoreButton
      id="button_share_twitter"
      label={i18n.translate(`BUTTON_SHARE_TWITTER`)}
      tooltip={
        props.tooltip ? buttonTooltipPosition : false
      }
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

export default TwitterShareBtn
