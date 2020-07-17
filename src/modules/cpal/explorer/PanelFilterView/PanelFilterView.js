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

import './PanelFilterView.scss'

const PanelFilterView = ({ ...props }) => {
  return (
    <div className="map-panel-slideout-filter">
      Panel filter view
    </div>
  )
}

export default PanelFilterView
