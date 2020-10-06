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

  /**
   * If the list of feeders is scrolled, remove the scroll prompt.
   */
  const handleScroll = e => {
    // console.log('handleScroll')
    if (!!showScrollPrompt) {
      setShowScrollPrompt(false)
    }
  }

  return (
    <div className="layout-view-feeder">
      <Row className="row-bar-chart">
        <Col
          xs={{ size: 12, order: 1, offset: 0 }}
          md={{ size: 12, order: 1, offset: 0 }}
          className="feeders-bar-chart"
        >
          <div
            className="feeders-bar-chart-parent"
            onScroll={handleScroll}
          >
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
                  <svg
                    width="7"
                    height="10"
                    viewBox="0 0 7 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="3.4917"
                      y1="1.17685e-08"
                      x2="3.4917"
                      y2="9.41919"
                      stroke="#606B44"
                      strokeWidth="0.538463"
                    />
                    <path
                      d="M7 5.90234V5.90234C5.067 5.90234 3.49999 7.46935 3.49999 9.40236V9.40236"
                      stroke="#606B44"
                      strokeWidth="0.538463"
                    />
                    <path
                      d="M0 5.90234V5.90234C1.933 5.90234 3.50001 7.46935 3.50001 9.40236V9.40236"
                      stroke="#606B44"
                      strokeWidth="0.538463"
                    />
                  </svg>
                </span>
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
          <div className="distrib-chart-legend">
            <h3>
              {i18n.translate(
                'UI_FEEDER_TITLE_SCHOOLS_CHART',
              )}
            </h3>
            <div className="distrib-chart-item feeder-school">
              <div className="icon"></div>
              <span>
                {i18n.translate(
                  `UI_FEEDER_DIST_LEGEND_FEEDER`,
                )}
              </span>
            </div>
            <div className="distrib-chart-item highlight-school">
              <div className="icon"></div>
              <span>
                {i18n.translate(
                  `UI_FEEDER_DIST_LEGEND_HIGHLIGHT`,
                )}
              </span>
            </div>
          </div>
        </Col>
      </Row>
      <FeederMobileModal />
    </div>
  )
}

FeederView.propTypes = {}

export default FeederView
