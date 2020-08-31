import React from 'react'
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
  const slideoutPanel = useStore(
    state => state.slideoutPanel,
  )
  const setSlideoutPanel = useStore(
    state => state.setSlideoutPanel,
  )

  const handleClose = () => {
    // console.log('handleClose')
    const panelState = slideoutPanel
    panelState.active = false
    setSlideoutPanel({ ...panelState })
  }

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
