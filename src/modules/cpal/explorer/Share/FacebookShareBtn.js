import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@pureartisan/simple-i18n'
import { FaFacebookF } from 'react-icons/fa'

import useStore from './../store'
import { CoreButton } from './../../../core'
import {
  onFacebookShare,
  constructShareLink,
} from './Share'

const FacebookShareBtn = ({ ...props }) => {
  const shareHash = useStore(state => state.shareHash)
  const buttonTooltipPosition = useStore(
    state => state.buttonTooltipPosition,
  )

  const handleShare = () => {
    onFacebookShare(
      encodeURIComponent(constructShareLink(shareHash)),
      i18n.translate('DIALOG_SHARE_FACEBOOK'),
    )
  }

  return (
    <CoreButton
      id="button_share_facebook"
      label={i18n.translate(`BUTTON_SHARE_FACEBOOK`)}
      tooltip={buttonTooltipPosition}
      onClick={handleShare}
      color="none"
      className="button-share-facebook button-share"
    >
      <FaFacebookF />
      <span className="sr-only">
        {i18n.translate(`BUTTON_SHARE_FACEBOOK`)}
      </span>
    </CoreButton>
  )
}

export default FacebookShareBtn
