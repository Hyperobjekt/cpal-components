import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@pureartisan/simple-i18n'
import { IoMdShare } from 'react-icons/io'

import useStore from './../store'
import { CoreButton } from './../../../core'

const LinkShareBtn = ({ ...props }) => {
  const shareHash = useStore(state => state.shareHash)
  const buttonTooltipPosition = useStore(
    state => state.buttonTooltipPosition,
  )
  const shareLinkModal = useStore(
    state => state.shareLinkModal,
  )
  const setShareLinkModal = useStore(
    state => state.setShareLinkModal,
  )
  const handleShare = () => {
    setShareLinkModal(!shareLinkModal)
  }

  return (
    <CoreButton
      id="button_share_link"
      label={i18n.translate(`BUTTON_SHARE_LINK`)}
      tooltip={buttonTooltipPosition}
      onClick={handleShare}
      color="none"
      className="button-share-link button-share"
    >
      <IoMdShare />
      <span className="sr-only">
        {i18n.translate(`BUTTON_SHARE_LINK`)}
      </span>
    </CoreButton>
  )
}

export default LinkShareBtn
