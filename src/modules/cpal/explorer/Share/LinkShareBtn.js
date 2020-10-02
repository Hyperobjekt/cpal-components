import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@pureartisan/simple-i18n'
import { IoMdShare } from 'react-icons/io'
import clsx from 'clsx'

import useStore from './../store'
import { CoreButton } from './../../../core'

const LinkShareBtn = ({ children, ...props }) => {
  // Generic store value setter.
  const setStoreValues = useStore(
    state => state.setStoreValues,
  )
  const shareHash = useStore(state => state.shareHash)
  const buttonTooltipPosition = useStore(
    state => state.buttonTooltipPosition,
  )
  const shareLinkModal = useStore(
    state => state.shareLinkModal,
  )
  const handleShare = () => {
    setStoreValues({
      shareLinkModal: !shareLinkModal,
    })
  }

  return (
    <CoreButton
      id="button_share_link"
      label={i18n.translate(`BUTTON_SHARE_LINK`)}
      tooltip={props.tooltip ? buttonTooltipPosition : ''}
      onClick={handleShare}
      color="none"
      className={clsx(
        props.className,
        'button-share-link button-share',
      )}
    >
      <IoMdShare />
      <span className="sr-only">
        {i18n.translate(`BUTTON_SHARE_LINK`)}
      </span>
      {children}
    </CoreButton>
  )
}

export default LinkShareBtn
