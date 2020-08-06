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

import useStore from './../../store'

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
      >
        <ModalHeader toggle={toggle}>
          {i18n.translate('MODAL_SHARE_LINK_HEAD')}
        </ModalHeader>
        <ModalBody>
          <p>{i18n.translate('MODAL_SHARE_LINK_INSTR')}</p>
          {i18n.translate('MODAL_SHARE_LINK_INPUT')}
          <InputGroup>
            <Input
              value={shareHash ? shareHash : ''}
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
          <Button color="secondary" onClick={toggle}>
            {i18n.translate('BTN_CLOSE')}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default ShareLinkModal
