import React from 'react'
import PropTypes from 'prop-types'
import useStore from './../store.js'
import i18n from '@pureartisan/simple-i18n'
import clsx from 'clsx'

import PanelFilterView from './../PanelFilterView/PanelFilterView'
import PanelInfoView from './../PanelInfoView/PanelInfoView'

import './SlideoutPanel.scss'

const SlideoutPanel = ({ ...props }) => {
  const slideoutPanel = useStore(
    state => state.slideoutPanel,
  )

  return (
    <div
      className={clsx(
        'map-panel-slideout',
        slideoutPanel.active ? 'active' : '',
        slideoutPanel.panel.length > 0
          ? 'panel-view-' + slideoutPanel.panel
          : 'panel-view-info',
      )}
    >
      <PanelFilterView />
      <PanelInfoView />
    </div>
  )
}

export default SlideoutPanel
