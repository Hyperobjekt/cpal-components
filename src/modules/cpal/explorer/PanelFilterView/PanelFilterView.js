import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import useStore from './../store.js'
import i18n from '@pureartisan/simple-i18n'
import clsx from 'clsx'
import {
  FiFilter,
  FiMap,
  FiList,
  FiMenu,
} from 'react-icons/fi'
import { MdCallSplit } from 'react-icons/md'

import Select from './../../../core/Select'
import { CPAL_METRICS } from './../../../../constants/metrics'
import TabSeries from './TabSeries'

import './PanelFilterView.scss'

const PanelFilterView = ({ ...props }) => {
  // Active filter tab
  const activeFilterTab = useStore(
    state => state.activeFilterTab,
  )
  const setActiveFilterTab = useStore(
    state => state.setActiveFilterTab,
  )

  const tabs = []
  CPAL_METRICS.forEach(el => {
    if (el.tab_level === 0) {
      tabs.push(el.id)
    }
  })

  const selectItems = []
  tabs.forEach(el => {
    const item = CPAL_METRICS.find(i => {
      return i.id === el
    })
    selectItems.push({
      id: item.id,
      label: item.title,
      active: item.tab === activeFilterTab ? true : false,
    })
  })

  const handleSelect = e => {
    // console.log('category selected, ', e.currentTarget.id)
    const tabId = CPAL_METRICS.find(i => {
      return i.id === e.currentTarget.id
    }).tab
    setActiveFilterTab(tabId)
  }

  return (
    <div
      className={clsx(
        'map-panel-slideout-filters',
        activeFilterTab
          ? 'active-tab-' + activeFilterTab
          : 'active-tab-default',
      )}
    >
      <Select
        label={i18n.translate('UI_MAP_PANEL_SELECT')}
        items={selectItems}
        handleSelect={e => handleSelect(e)}
      ></Select>
      <div className="filters-panel-parent">
        <TabSeries
          tabs={tabs}
          metrics={CPAL_METRICS}
          activeTab={activeFilterTab}
        />
      </div>
    </div>
  )
}

export default PanelFilterView
