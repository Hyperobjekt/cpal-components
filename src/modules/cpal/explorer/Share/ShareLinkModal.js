/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React, { useEffect, useRef, useState } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap'
import i18n from '@pureartisan/simple-i18n'
import { FaCopy } from 'react-icons/fa'
import copy from 'copy-to-clipboard'

import { CoreButton } from './../../../core'
import useStore from './../store'

const ShareLinkModal = props => {
  const { className } = props
  // Generic store value setter.
  const setStoreValues = useStore(
    state => state.setStoreValues,
  )
  const shareLinkModal = useStore(
    state => state.shareLinkModal,
  )
  const toggle = () => {
    setStoreValues({ shareLinkModal: !shareLinkModal })
  }
  const defaultRoute = useStore(state => state.defaultRoute)
  const shareHash = useStore(state => state.shareHash)
  const eventShareLink = useStore(
    state => state.eventShareLink,
  )

  const onCopy = () => {
    // console.log('oncopy')
    copy(location)
    setStoreValues({ eventShareLink: eventShareLink + 1 })
  }

  // Update value for share link only when window object exists.
  const [shareLinkValue, setShareLinkValue] = useState('')
  useEffect(() => {
    setShareLinkValue(
      !!shareHash
        ? window.location.origin +
            window.location.pathname +
            shareHash
        : window.location.origin +
            window.location.pathname +
            defaultRoute,
    )
  }, [shareHash])

  return (
    <div>
      <Modal
        isOpen={!!shareLinkModal}
        toggle={toggle}
        className={className}
        backdrop={false}
        keyboard={true}
        autoFocus={true}
        centered={true}
      >
        <ModalHeader toggle={toggle}></ModalHeader>
        <ModalBody>
          <h3>{i18n.translate('MODAL_SHARE_LINK_HEAD')}</h3>
          <p>{i18n.translate('MODAL_SHARE_LINK_INSTR')}</p>
          {i18n.translate('MODAL_SHARE_LINK_INPUT')}
          <InputGroup>
            <Input value={shareLinkValue} readOnly={true} />
            <InputGroupAddon addonType="append">
              <Button color="secondary" onClick={onCopy}>
                <FaCopy />
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default ShareLinkModal
