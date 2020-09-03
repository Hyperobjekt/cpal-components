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
  const shareLinkModal = useStore(
    state => state.shareLinkModal,
  )
  const setShareLinkModal = useStore(
    state => state.setShareLinkModal,
  )
  const toggle = () => setShareLinkModal(!shareLinkModal)

  const defaultRoute = useStore(state => state.defaultRoute)
  const shareHash = useStore(state => state.shareHash)

  const onCopy = () => {
    // console.log('oncopy')
    copy(location)
  }

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
            <Input
              value={
                shareHash
                  ? window.location.origin +
                    window.location.pathname +
                    shareHash
                  : ''
              }
              readOnly={true}
            />
            <InputGroupAddon addonType="append">
              <Button color="secondary" onClick={onCopy}>
                <FaCopy />
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </ModalBody>
        <ModalFooter>
          <CoreButton color="secondary" onClick={toggle}>
            {i18n.translate('BTN_CLOSE')}
          </CoreButton>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default ShareLinkModal