import React from 'react'
import i18n from '@pureartisan/simple-i18n'
import PropTypes from 'prop-types'
import { Card, Button } from 'reactstrap'
import clsx from 'clsx'
import { AiOutlineControl } from 'react-icons/ai'

import useStore from './../../store'
import { CoreButton } from './../../../../core/'
import { CPAL_METRICS } from './../../../../../constants/metrics'
import { SCHOOL_ZONE_COLORS } from './../../../../../constants/colors'
import NonInteractiveScale from './../../NonInteractiveScale/NonInteractiveScale'
import {
  getRoundedValue,
  getMetric,
  getHashLeft,
  getQuintile,
} from './../../utils'

/**
 * Legend for map
 */
const MapLegend = ({ ...props }) => {
  // Default affix for features in school zones layer
  const activeMetric = useStore(state => state.activeMetric)
  const activeQuintiles = useStore(
    state => state.activeQuintiles,
  )

  const slideoutPanel = useStore(
    state => state.slideoutPanel,
  )
  const setSlideoutPanel = useStore(
    state => state.setSlideoutPanel,
  )
  const toggleFilterPanel = () => {
    console.log('toggleFilterPanel()')
    setSlideoutPanel({
      active: true,
      panel: 'filters', // filters or weights, presumably, possibly info
    })
  }

  const intl = useStore(state => state.intl)
  const metricData = getMetric(activeMetric, CPAL_METRICS)
  const schoolStyle = {
    backgroundColor: metricData.colors[0],
    borderColor: '1px solid #fff',
  }
  const schoolZoneStyle = {
    backgroundColor: metricData.colors[4], // SCHOOL_ZONE_COLORS.fill,
    borderColor: '1px solid ' + metricData.colors[4], // SCHOOL_ZONE_COLORS.outline,
    opacity: 0.2,
  }
  const schoolZoneKnockoutStyle = {
    backgroundColor: metricData.colors[0],
    borderColor: '1px solid #fff',
  }

  return (
    <div className="map-legend">
      <div className="map-legend-label">
        {i18n.translate(`UI_MAP_LEGEND_TITLE`)}
        <span
          id="map_legend_open_filter"
          className={clsx(
            'map-legend-open-filter-panel',
            !!slideoutPanel.active &&
              slideoutPanel.panel === 'filters'
              ? 'disabled'
              : '',
          )}
          onClick={toggleFilterPanel}
        >
          {i18n.translate('LINK_OPEN_FILTER_PANEL')}
        </span>
      </div>
      <div className="map-legend-metric-title">
        {i18n.translate(metricData.title)}
      </div>
      <div className="map-legend-zone-labels">
        <div className="fewer">
          <div className="vertically-center">
            {i18n.translate(`UI_MAP_LEGEND_FEWER`)}
          </div>
        </div>
        <div className="avg">
          <div className="vertically-center">
            {i18n.translate(`UI_MAP_LEGEND_AVG`)}
          </div>
        </div>
        <div className="more">
          <div className="vertically-center">
            {i18n.translate(`UI_MAP_LEGEND_MORE`)}
          </div>
        </div>
      </div>
      <NonInteractiveScale
        metric={activeMetric}
        quintiles={activeQuintiles}
        colors={metricData.colors}
        showHash={false}
        hashLeft={null}
        showMinMax={true}
        min={metricData.range[0]}
        max={metricData.range[1]}
      />
      <div className="map-legend-school-dot">
        <div
          className="map-legend-school-dot-icon"
          style={schoolStyle}
        ></div>
        <div className="map-legend-school-dot-descr">
          {i18n.translate(`UI_MAP_LEGEND_SCHOOL_DOT`)}
        </div>
      </div>
      <div className="map-legend-school-zone">
        <div className="map-legend-school-zone-icon">
          <div
            className="map-legend-school-zone-icon-background"
            style={schoolZoneStyle}
          ></div>
          <div
            className="map-legend-school-zone-icon-knockout"
            style={schoolZoneKnockoutStyle}
          ></div>
        </div>
        <div className="map-legend-school-zone-descr">
          {i18n.translate(`UI_MAP_LEGEND_SCHOOL_ZONE`)}
        </div>
      </div>
    </div>
  )
}

MapLegend.defaultProps = {
  activeMetric: 'cri',
  activeQuintiles: [1, 1, 1, 1, 1],
}

MapLegend.propTypes = {
  activeMetric: PropTypes.string,
  activeQuintiles: PropTypes.array,
}

export default MapLegend
