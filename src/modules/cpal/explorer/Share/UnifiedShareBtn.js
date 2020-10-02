import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@pureartisan/simple-i18n'
import { IoMdShare } from 'react-icons/io'
import clsx from 'clsx'

import useStore from './../store'
import { CoreButton } from './../../../core'

const UnifiedShareBtn = ({ ...props }) => {
  // Generic store value setter.
  const setStoreValues = useStore(
    state => state.setStoreValues,
  )
  const shareHash = useStore(state => state.shareHash)
  const buttonTooltipPosition = useStore(
    state => state.buttonTooltipPosition,
  )
  const unifiedShareModal = useStore(
    state => state.unifiedShareModal,
  )
  const handleShare = () => {
    setStoreValues({
      unifiedShareModal: !unifiedShareModal,
    })
  }

  return (
    <CoreButton
      id="button_u_share_link"
      label={i18n.translate(`BUTTON_SHARE_UNIFIED`)}
      tooltip={buttonTooltipPosition}
      onClick={handleShare}
      color="none"
      className={clsx(
        props.className,
        'button-u-share-link button-share',
      )}
    >
      <IoMdShare />
      <span className="sr-only">
        {i18n.translate(`BUTTON_SHARE_UNIFIED`)}
      </span>
    </CoreButton>
  )
}

export default UnifiedShareBtn
