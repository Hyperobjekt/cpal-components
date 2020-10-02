import React from 'react'
import clsx from 'clsx'
import i18n from '@pureartisan/simple-i18n'
import PropTypes from 'prop-types'

import InteractiveScale from './InteractiveScale'

const FilterSeries = ({ ...props }) => {
  // Get all of the items in the metrics array with matching tab node.
  const filters = props.metrics.filter(m => {
    return m.tab === props.tab && m.tab_level === 1
  })
  // Alphabetize them by title
  filters.sort((a, b) => {
    return a.order - b.order
  })
  if (filters && filters.length > 0) {
    return (
      <>
        <h5>
          {i18n.translate('UI_MAP_FILTERS_INDICATORS')}
        </h5>
        <div className="filter-panel-filter-series">
          {filters.map(f => {
            return (
              <div className="filter" key={f.id}>
                <h6>{i18n.translate(f.title)}</h6>
                <InteractiveScale metric={f} />
              </div>
            )
          })}
        </div>
      </>
    )
  } else {
    return ''
  }
}

FilterSeries.propTypes = {
  tab: PropTypes.string,
  metrics: PropTypes.array,
}

FilterSeries.defaultProps = {
  tab: 'cri',
  metrics: [],
}

export default FilterSeries
