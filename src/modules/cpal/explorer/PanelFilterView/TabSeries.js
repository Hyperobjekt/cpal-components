import React from 'react'
import clsx from 'clsx'
import i18n from '@pureartisan/simple-i18n'
import PropTypes from 'prop-types'

import FilterSeries from './FilterSeries'

const TabSeries = ({ ...props }) => {
  return (
    <div
      className={clsx(
        'filter-panel-tabs',
        props.activeTab
          ? 'active-tab-' + props.activeTab
          : '',
      )}
    >
      {props.tabs.map(t => {
        const metric = props.metrics.find(m => {
          return m.id === t
        })
        console.log('metric.tab, ', metric.tab)
        const tabLabel = i18n.translate(metric.title)
        const tabId = metric.tab
        return (
          <div
            className={clsx(
              'filter-tab-category',
              metric.tab
                ? 'tab-category-' + metric.tab
                : '',
            )}
            key={metric.tab}
          >
            <h5>{tabLabel}</h5>
            <div
              className={clsx(
                'filter-select',
                'tab-' + tabId,
              )}
              key={t}
            >
              <div className="filter-buttons">
                filter buttons
              </div>
            </div>
            <FilterSeries
              tab={tabId}
              metrics={props.metrics}
            />
          </div>
        )
      })}
    </div>
  )
}

FilterSeries.propTypes = {
  tabs: PropTypes.array,
  metrics: PropTypes.array,
  activeTab: PropTypes.string,
}

FilterSeries.defaultProps = {
  tabs: [],
  metrics: [],
  activeTab: 'cri',
}

export default TabSeries
