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

const PanelFilterView = ({ ...props }) => {
  // Generic state setter.
  const setStoreValues = useStore(
    state => state.setStoreValues,
  )
  // Default filter tab
  const defaultFilterTab = useStore(
    state => state.defaultFilterTab,
  )
  // Active filter tab
  const activeFilterTab = useStore(
    state => state.activeFilterTab,
  )
  // Default metric
  const defaultMetric = useStore(
    state => state.defaultMetric,
  )
  // Active metric
  const activeMetric = useStore(state => state.activeMetric)

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
    const default_metric = CPAL_FILTER_TABS.find(
      el => el.id === tabId,
    ).default_metric
    // console.log('default_metric, ', default_metric)
    setStoreValues({
      activeFilterTab: tabId,
      activeMetric: default_metric,
      activeQuintiles: [1, 1, 1, 1, 1],
    })
  }

  const handleResetClick = () => {
    // console.log('handleResetClick()')
    setStoreValues({
      activeFilterTab: defaultFilterTab,
      activeMetric: defaultMetric,
      activeQuintiles: [1, 1, 1, 1, 1],
    })
  }

  const getSelectLabel = () => {
    // console.log('getSelectLabel')
    const tab = CPAL_FILTER_TABS.find(
      el => el.id === activeFilterTab,
    )
    // console.log('tab, ', tab)
    return tab ? i18n.translate(tab.title) : null
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
      <h3>{i18n.translate('UI_MAP_PANEL_HEADING')}</h3>
      <p id="label_filter_select">
        {i18n.translate('UI_MAP_PANEL_SELECT')}
      </p>
      <div className="map-panel-controls">
        <Select
          label={getSelectLabel()}
          items={selectItems}
          handleSelect={e => handleSelect(e)}
          ariaLabelledby="label_filter_select"
          ariaLabel={i18n.translate('UI_MAP_PANEL_SELECT')}
        ></Select>
        <CoreButton
          id="button_reset_filter"
          label={i18n.translate(
            `UI_MAP_BUTTON_RESET_FILTER`,
          )}
          tooltip="right"
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
      <div
        className="map-panel-instructions"
        dangerouslySetInnerHTML={{
          __html: i18n.translate(
            'UI_MAP_FILTER_INSTRUCTIONS',
            {
              icon:
                '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"></path></svg>',
            },
          ),
        }}
      ></div>
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
