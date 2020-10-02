import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@pureartisan/simple-i18n'
import { GrMail } from 'react-icons/gr'
import clsx from 'clsx'

import useStore from './../store'
import { CoreButton } from './../../../core'
import { onMailShare, constructShareLink } from './Share'

const MailShareBtn = ({ children, ...props }) => {
  // Generic store value setter.
  const setStoreValues = useStore(
    state => state.setStoreValues,
  )
  const shareHash = useStore(state => state.shareHash)
  const buttonTooltipPosition = useStore(
    state => state.buttonTooltipPosition,
  )
  const eventShareEmail = useStore(
    state => state.eventShareEmail,
  )

  const handleShare = () => {
    onMailShare(
      encodeURIComponent(constructShareLink(shareHash)),
      i18n.translate('DIALOG_SHARE_TWITTER'),
      i18n.translate('DIALOG_SHARE_EMAIL_BODY'),
    )
    setStoreValues({
      eventShareEmail: eventShareEmail + 1,
    })
  }

  return (
    <CoreButton
      id="button_share_email"
      label={i18n.translate(`BUTTON_SHARE_EMAIL`)}
      tooltip={props.tooltip ? buttonTooltipPosition : ''}
      onClick={handleShare}
      color="none"
      className={clsx(
        props.className,
        'button-share-email button-share',
      )}
    >
      <GrMail />
      <span className="sr-only">
        {i18n.translate(`BUTTON_SHARE_EMAIL`)}
      </span>
      {children}
    </CoreButton>
  )
}

export default MailShareBtn
