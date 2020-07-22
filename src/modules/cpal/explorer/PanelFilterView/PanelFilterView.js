import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import i18n from '@pureartisan/simple-i18n'
import clsx from 'clsx'
import {
  FiFilter,
  FiMap,
  FiList,
  FiMenu,
} from 'react-icons/fi'
import { MdRefresh } from 'react-icons/md'

import { CoreButton, Select } from './../../../core'
import useStore from './../store.js'
import {
  CPAL_METRICS,
  CPAL_FILTER_TABS,
} from './../../../../constants/metrics'
import TabSeries from './TabSeries'

import './PanelFilterView.scss'

const PanelFilterView = ({ ...props }) => {
  // Active filter tab
  const defaultFilterTab = useStore(
    state => state.defaultFilterTab,
  )
  const activeFilterTab = useStore(
    state => state.activeFilterTab,
  )
  const setActiveFilterTab = useStore(
    state => state.setActiveFilterTab,
  )
  // Default metric
  const defaultMetric = useStore(
    state => state.defaultMetric,
  )
  const setActiveMetric = useStore(
    state => state.setActiveMetric,
  )
  const setActiveQuintiles = useStore(
    state => state.setActiveQuintiles,
  )

  // Generate tabs for every metric with tab_level set to 0
  const tabs = []
  CPAL_METRICS.forEach(el => {
    if (el.tab_level === 0) {
      tabs.push(el.id)
    }
  })

  /** Returns title translation placeholder for a tab **/
  const getTabTitle = id => {
    const obj = CPAL_FILTER_TABS.find(el => el.id === id)
    return obj.title
  }

  /** Process select items for tabs **/
  const selectItems = []
  tabs.forEach(el => {
    const item = CPAL_METRICS.find(i => {
      return i.id === el
    })
    selectItems.push({
      id: item.id,
      label: getTabTitle(item.tab),
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

  const handleResetClick = () => {
    console.log('handleResetClick()')
    setActiveFilterTab(defaultFilterTab)
    setActiveMetric(defaultMetric)
    setActiveQuintiles([1, 1, 1, 1, 1])
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
      <div className="map-panel-controls">
        <Select
          label={i18n.translate('UI_MAP_PANEL_SELECT')}
          items={selectItems}
          handleSelect={e => handleSelect(e)}
        ></Select>
        <CoreButton
          id="button_reset_filter"
          aria-label={i18n.translate(
            `UI_MAP_BUTTON_RESET_FILTER`,
          )}
          title={i18n.translate(
            `UI_MAP_BUTTON_RESET_FILTER`,
          )}
          onClick={handleResetClick}
          color="light"
          className={clsx('map-panel-filter-reset')}
        >
          <MdRefresh />
          <span className="sr-only">
            {i18n.translate(`UI_MAP_BUTTON_RESET_FILTER`)}
          </span>
        </CoreButton>
      </div>
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
