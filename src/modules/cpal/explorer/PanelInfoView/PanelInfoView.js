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

import './PanelInfoView.scss'

const PanelInfoView = ({ ...props }) => {
  return (
    <div className="map-panel-slideout-info">
      Panel info view
    </div>
  )
}

export default PanelInfoView
