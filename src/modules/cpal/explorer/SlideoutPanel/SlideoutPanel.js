import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@pureartisan/simple-i18n'
import clsx from 'clsx'

import useStore from './../store.js'
import PanelFilterView from './../PanelFilterView/PanelFilterView'
import PanelInfoView from './../PanelInfoView/PanelInfoView'

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
          : 'panel-view-none',
      )}
    >
      <PanelFilterView />
      <PanelInfoView />
    </div>
  )
}

export default SlideoutPanel
