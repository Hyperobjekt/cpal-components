import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@pureartisan/simple-i18n'
import { FaTwitter } from 'react-icons/fa'

import useStore from './../store'
import { CoreButton } from './../../../core'
import { onTwitterShare, constructShareLink } from './Share'

const TwitterShareBtn = ({ ...props }) => {
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
      tooltip={buttonTooltipPosition}
      onClick={handleShare}
      color="none"
      className="button-share-twitter button-share"
    >
      <FaTwitter />
      <span className="sr-only">
        {i18n.translate(`BUTTON_SHARE_TWITTER`)}
      </span>
    </CoreButton>
  )
}

export default TwitterShareBtn
