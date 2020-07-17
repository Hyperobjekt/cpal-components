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
import './MapLegend.scss'

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
    backgroundColor: SCHOOL_ZONE_COLORS.fill,
    borderColor: '1px solid ' + SCHOOL_ZONE_COLORS.outline,
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
        <div
          className="map-legend-school-zone-icon"
          style={schoolZoneStyle}
        >
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

//
// <Paper
//   className={clsx(
//     'map-legend',
//     className,
//     classes.root,
//     overrides.root,
//   )}
//   elevation={1}
// >
//   <div
//     className={clsx(
//       'map-legend__description',
//       classes.description,
//       overrides.description,
//     )}
//   >
//     {primary && (
//       <Typography
//         className={clsx(
//           'map-legend__primary',
//           classes.primary,
//           overrides.primary,
//         )}
//         variant="body1"
//       >
//         {primary}
//       </Typography>
//     )}
//     {secondary && (
//       <Typography
//         className={clsx(
//           'map-legend__secondary',
//           classes.secondary,
//           overrides.secondary,
//         )}
//         variant="body2"
//       >
//         {secondary}
//       </Typography>
//     )}
//   </div>
//
//   <GradientLegend
//     className={clsx(
//       'map-legend__gradient',
//       classes.gradient,
//       overrides.description,
//     )}
//     {...{
//       labelRange,
//       labelFormatter,
//       colorRange,
//       colors,
//       markerPosition,
//       midLabel,
//       midPosition,
//     }}
//   />
//   {footer && (
//     <div
//       className={clsx(
//         'map-legend__footer',
//         classes.footer,
//         overrides.footer,
//       )}
//     >
//       {footer}
//     </div>
//   )}
// </Paper>
