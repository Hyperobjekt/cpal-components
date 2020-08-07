import React from 'react'
import i18n from '@pureartisan/simple-i18n'
import PropTypes from 'prop-types'
import { Card, Button } from 'reactstrap'
import clsx from 'clsx'

import useStore from './../../store'
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
      </div>
      <div className="map-legend-metric-title">
        {i18n.translate(metricData.title)}
      </div>
      <div className="map-legend-open-filter-panel">
        i18n.translate('LINK_OPEN_FILTER_PANEL')
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
