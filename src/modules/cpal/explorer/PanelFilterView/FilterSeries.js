import React from 'react'
import clsx from 'clsx'
import i18n from '@pureartisan/simple-i18n'
import PropTypes from 'prop-types'

const FilterSeries = ({ ...props }) => {
  // Get all of the items in the metrics array with matching tab node.
  const filters = props.metrics.filter(m => {
    return m.tab === props.tab && m.tab_level === 1
  })
  // Alphabetize them by title
  filters.sort((a, b) => {
    // Use toUpperCase() to ignore character casing
    const itemA = a.title.toUpperCase()
    const itemB = b.title.toUpperCase()

    let comparison = 0
    if (itemA > itemB) {
      comparison = 1
    } else if (itemA < itemB) {
      comparison = -1
    }
    return comparison
  })

  return (
    <div className="filter-panel-filter-series">
      {filters.map(f => {
        return (
          <div className="filter" key={f.id}>
            <h6>{i18n.translate(f.title)}</h6>
            <div className="filter-buttons">
              filter buttons
            </div>
          </div>
        )
      })}
    </div>
  )
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