import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import i18n from '@pureartisan/simple-i18n'
import clsx from 'clsx'
import { MdClose } from 'react-icons/md'

import useStore from './../store.js'
import PanelFilterView from './../PanelFilterView/PanelFilterView'
import PanelLayersView from './../PanelLayersView/PanelLayersView'
import PanelInfoView from './../PanelInfoView/PanelInfoView'
import { CoreButton } from './../../../core'

const SlideoutPanel = ({ ...props }) => {
  // Generic store value setter.
  const setStoreValues = useStore(
    state => state.setStoreValues,
  )
  const slideoutPanel = useStore(
    state => state.slideoutPanel,
  )

  const handleClose = () => {
    // console.log('handleClose')
    const panelState = slideoutPanel
    panelState.active = false
    // Set focus on the clicked button.
    const panelBtnId =
      'button_toggle_panel_' + slideoutPanel.panel
    const panelBtn = document.getElementById(panelBtnId)
    panelBtn.focus()
    // Update store.
    setStoreValues({
      slideoutPanel: { ...panelState },
    })
  }

  // Toggle focus and tabindex on slideout panel when active.
  useEffect(() => {
    // console.log('Slideout panel active state changed.')
    const closeBtn = document.getElementById(
      'button_close_panel',
    )
    // console.log('closeBtn, ', closeBtn)
    if (!!closeBtn) {
      if (!!slideoutPanel.active) {
        closeBtn.setAttribute('tabindex', '0')
        closeBtn.focus()
      } else {
        closeBtn.setAttribute('tabindex', '-1')
      }
    }
  }, [slideoutPanel.active])

  return (
    <div
      className={clsx(
        'map-panel-slideout',
        slideoutPanel.active ? 'active' : '',
        slideoutPanel.panel.length > 0
          ? 'panel-view-' + slideoutPanel.panel
          : 'panel-view-none',
      )}
    >
      <CoreButton
        id="button_close_panel"
        label={i18n.translate(`BUTTON_CLOSE_PANEL`)}
        onClick={handleClose}
        color="none"
        className={clsx(
          'button-core',
          'button-close-panel',
        )}
        tabIndex="-1"
      >
        <MdClose />
        <span className="sr-only">
          {i18n.translate(`BUTTON_CLOSE_PANEL`)}
        </span>
      </CoreButton>

      <PanelFilterView />
      <PanelLayersView />
      <PanelInfoView />
    </div>
  )
}

export default SlideoutPanel
