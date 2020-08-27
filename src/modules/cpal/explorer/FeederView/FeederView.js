import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ReactEcharts from 'echarts-for-react'
import { Row, Col } from 'reactstrap'
import clsx from 'clsx'
import i18n from '@pureartisan/simple-i18n'
import { BsArrowRight } from 'react-icons/bs'

import FeederChart from './FeederChart'
import FeederLegend from './FeederLegend'
import FeederSchoolsChart from './FeederSchoolsChart'
import FeederMobileModal from './FeederMobileModal'
import useStore from './../store'

/**
 * FeederView contains the feeder schools view.
 */
const FeederView = () => {
  const isLoaded = useRef(false)
  const breakpoint = useStore(state => state.breakpoint)
  const activeView = useStore(state => state.activeView)

  const [showScrollPrompt, setShowScrollPrompt] = useState(
    false,
  )
  useEffect(() => {
    const parentHeight = document
      .querySelector('.feeders-bar-chart-parent')
      .getBoundingClientRect().height
    const childHeight = document
      .querySelector('.feeder-chart-bar')
      .getBoundingClientRect().height
    if (
      childHeight > parentHeight &&
      breakpoint !== 'xs' &&
      breakpoint !== 'sm' &&
      breakpoint !== 'md'
    ) {
      setShowScrollPrompt(true)
    } else {
      setShowScrollPrompt(false)
    }
  }, [isLoaded, breakpoint, activeView])

  return (
    <div className="layout-view-feeder">
      <Row className="row-bar-chart">
        <Col
          xs={{ size: 12, order: 1, offset: 0 }}
          md={{ size: 12, order: 1, offset: 0 }}
          className="feeders-bar-chart"
        >
          <div className="feeders-bar-chart-parent">
            <FeederChart>
              <div
                className="scroll-prompt"
                style={{
                  display: !!showScrollPrompt
                    ? 'block'
                    : 'none',
                }}
              >
                <span className="scroll-prompt-text">
                  {i18n.translate(
                    'UI_FEEDER_SCROLL_PROMPT',
                  )}
                </span>
                <BsArrowRight />
              </div>
            </FeederChart>
          </div>
          <FeederLegend />
        </Col>
      </Row>
      <Row className="row-schools-chart">
        <Col
          xs={{ size: 12, order: 2, offset: 0 }}
          md={{ size: 12, order: 2, offset: 0 }}
          className="feeders-schools-scatter"
          aria-label={i18n.translate(
            'UI_FEEDER_TITLE_SCHOOLS_CHART',
          )}
        >
          <FeederSchoolsChart />
        </Col>
      </Row>
      <FeederMobileModal />
    </div>
  )
}

FeederView.propTypes = {}

export default FeederView
