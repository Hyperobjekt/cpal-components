import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@pureartisan/simple-i18n'
import { FaFacebookF } from 'react-icons/fa'
import clsx from 'clsx'

import useStore from './../store'
import { CoreButton } from './../../../core'
import {
  onFacebookShare,
  constructShareLink,
} from './Share'

const FacebookShareBtn = ({ children, ...props }) => {
  // Generic store value setter.
  const setStoreValues = useStore(
    state => state.setStoreValues,
  )
  const shareHash = useStore(state => state.shareHash)
  const buttonTooltipPosition = useStore(
    state => state.buttonTooltipPosition,
  )
  const eventShareFacebook = useStore(
    state => state.eventShareFacebook,
  )

  const handleShare = () => {
    onFacebookShare(
      encodeURIComponent(constructShareLink(shareHash)),
      i18n.translate('DIALOG_SHARE_FACEBOOK'),
    )
    setStoreValues({
      eventShareFacebook: eventShareFacebook + 1,
    })
  }

  return (
    <CoreButton
      id="button_share_facebook"
      label={i18n.translate(`BUTTON_SHARE_FACEBOOK`)}
      tooltip={props.tooltip ? buttonTooltipPosition : ''}
      onClick={handleShare}
      color="none"
      className={clsx(
        props.className,
        'button-share-facebook button-share',
      )}
    >
      <FaFacebookF />
      <span className="sr-only">
        {i18n.translate(`BUTTON_SHARE_FACEBOOK`)}
      </span>
      {children}
    </CoreButton>
  )
}

export default FacebookShareBtn
