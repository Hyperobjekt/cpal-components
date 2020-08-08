import React from 'react'
import PropTypes from 'prop-types'
import useStore from './../store.js'
import i18n from '@pureartisan/simple-i18n'
import {
  FiFilter,
  FiMap,
  FiList,
  FiMenu,
} from 'react-icons/fi'
import { MdCallSplit } from 'react-icons/md'

// UI_PANEL_INFO_FEEDER
// UI_PANEL_INFO_MAP
//

const PanelInfoView = ({ ...props }) => {
  const activeView = useStore(state => state.activeView)

  const getContents = () => {
    // Right now, just check for feeder OR map.
    if (activeView === 'feeder') {
      return i18n.translate('UI_PANEL_INFO_FEEDER')
    } else {
      return i18n.translate('UI_PANEL_INFO_MAP')
    }
  }
  return (
    <div
      className="map-panel-slideout-info"
      dangerouslySetInnerHTML={{ __html: getContents() }}
    ></div>
  )
}

export default PanelInfoView
