import React from 'react'
import clsx from 'clsx'
import i18n from '@pureartisan/simple-i18n'
import PropTypes from 'prop-types'

import FilterSeries from './FilterSeries'
import InteractiveScale from './InteractiveScale'

const TabSeries = ({ ...props }) => {
  /**
   * Returns tab description transl and markup if one is provided
   * @param  Object metric Object with metric data
   * @return String HTML string
   */
  const getTabDesc = metric => {
    if (metric.desc && metric.desc.length > 0) {
      return (
        <div
          className={clsx(
            'tab-desc',
            'tab-desc-' + metric.tabId,
          )}
          dangerouslySetInnerHTML={{
            __html: i18n.translate(metric.desc),
          }}
        ></div>
      )
    } else {
      return ''
    }
  }

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
            {getTabDesc(metric)}
            <div
              className={clsx(
                'filter-select',
                'tab-' + tabId,
              )}
              key={t}
            >
              <InteractiveScale metric={metric} />
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
