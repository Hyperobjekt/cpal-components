import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@pureartisan/simple-i18n'
import { IoMdShare } from 'react-icons/io'

import useStore from './../store'
import { CoreButton } from './../../../core'

const UnifiedShareBtn = ({ ...props }) => {
  const shareHash = useStore(state => state.shareHash)
  const buttonTooltipPosition = useStore(
    state => state.buttonTooltipPosition,
  )
  const unifiedShareLinkModal = useStore(
    state => state.unifiedShareLinkModal,
  )
  const setUnifiedShareLinkModal = useStore(
    state => state.setUnifiedShareLinkModal,
  )
  const handleShare = () => {
    setUnifiedShareLinkModal(!unifiedShareLinkModal)
  }

  return (
    <CoreButton
      id="button_u_share_link"
      label={i18n.translate(`BUTTON_SHARE_UNIFIED`)}
      tooltip={buttonTooltipPosition}
      onClick={handleShare}
      color="none"
      className="button-u-share-link button-share"
    >
      <IoMdShare />
      <span className="sr-only">
        {i18n.translate(`BUTTON_SHARE_UNIFIED`)}
      </span>
    </CoreButton>
  )
}

export default UnifiedShareBtn
