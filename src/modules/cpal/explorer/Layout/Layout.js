import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import shallow from 'zustand/shallow'
import i18n from '@pureartisan/simple-i18n'
import clsx from 'clsx'
import {
  FiFilter,
  FiMap,
  FiList,
  FiMenu,
  FiInfo,
} from 'react-icons/fi'
import { MdCallSplit } from 'react-icons/md'
import { FaTwitter, FaFacebookF } from 'react-icons/fa'
import { GrMail } from 'react-icons/gr'
import { BsLink45Deg } from 'react-icons/bs'

import useStore from './../store'
import {
  Header,
  Logo,
  Canvas,
  View,
  Divider,
  CoreButton,
  Select,
} from './../../../core'
import SchoolSearch from './../SchoolSearch/SchoolSearch'
import ControlPanel from './../ControlPanel/ControlPanel'
import FeederView from './../FeederView/FeederView'
import MapView from './../MapView/MapView'
import RouteManager from './../RouteManager/RouteManager'
import SlideoutPanel from './../SlideoutPanel/SlideoutPanel'
import Menu from './../Menu/Menu'
import {
  onTwitterShare,
  onFacebookShare,
  onMailShare,
} from './share'
import ShareLinkModal from './share/ShareLinkModal'
// import ShareLinkDialog from './share'
import { ROUTE_SET } from './../../../../constants/metrics'
import { DEFAULT_ROUTE } from './../../../../constants/map'
// import {
//   isRouteValid,
//   setStateFromHash,
//   getHashFromState,
// } from './../utils'

import './Layout.scss'

/**
 * Layout sets up the basic layout for the explorer.
 * @param Object children Child elements
 * @param Object props    Props passed from parent
 */
const Layout = ({ children, ...props }) => {
  const logoProps = {
    siteName: i18n.translate(`SITE_TITLE`),
    siteHref: useStore(state => state.siteHref),
    logoSrc: useStore(state => state.logoSrc),
  }
  // Active view, map or feeder
  const activeView = useStore(state => state.activeView)
  const setActiveView = useStore(
    state => state.setActiveView,
  )
  // Array of objects, one for each select dropdown item
  const viewSelectItems = useStore(
    state => state.viewSelect,
  )
  const setViewSelect = useStore(
    state => state.setViewSelect,
  )
  // Slideout panel
  const slideoutPanel = useStore(
    state => state.slideoutPanel,
  )
  const setSlideoutPanel = useStore(
    state => state.setSlideoutPanel,
  )
  const handleToggleMenu = useStore(
    state => state.handleToggleMenu,
  )
  console.log('handleToggleMenu, ', handleToggleMenu)
  // Handle clicks to any control panel button.
  const handleClick = e => {
    e.preventDefault()
    console.log('Button clicked, ', e.currentTarget.id)
    if (
      e.currentTarget.id === 'button_view_feeder' ||
      e.currentTarget.id === 'button_view_map'
    ) {
      const val = String(e.currentTarget.id).replace(
        'button_view_',
        '',
      )
      setActiveView(val)
      setSlideoutPanel({
        active: false,
        panel: '',
      })
    }
    if (e.currentTarget.id === 'button_toggle_menu') {
      console.log('toggle menu clicked')
      handleToggleMenu()
    }
  }

  /**
   * Handles click to panel toggle buttons.
   * @param  Object e Event object
   */
  const handlePanel = e => {
    // console.log(
    //   'handlePanel(), ',
    //   e.currentTarget,
    //   slideoutPanel,
    // )
    e.preventDefault()
    if (
      e.currentTarget.id !==
        'button_toggle_panel_filters' &&
      e.currentTarget.id !== 'button_toggle_panel_info'
    )
      return
    // Retrieve clicked
    let clicked = String(e.currentTarget.id).replace(
      'button_toggle_panel_',
      '',
    )
    // Conditionally adjust panel settings
    let newActiveState = false
    if (
      !slideoutPanel.active &&
      slideoutPanel.panel.length < 1
    ) {
      // If never opened
      newActiveState = true
    } else if (
      !!slideoutPanel.active &&
      slideoutPanel.panel.length > 0 &&
      slideoutPanel.panel === clicked
    ) {
      // Selected existing open panel
      newActiveState = false
      clicked = ''
    } else {
      // Selected different panel
      newActiveState = true
    }
    // Reset panel state
    setSlideoutPanel({
      active: newActiveState,
      panel: clicked,
    })
  }
  // Handle select in dropdown
  const handleSelect = e => {
    e.preventDefault()
    // console.log('View selected, ', e.currentTarget.id)
    const val = String(e.currentTarget.id).replace(
      'select_view_',
      '',
    )
    setActiveView(val)
    setViewSelect([
      {
        label: `SELECT_ITEM_MAP`,
        id: `select_view_map`,
        active: val === 'map' ? true : false,
      },
      {
        label: `SELECT_ITEM_FEEDER`,
        id: `select_view_feeder`,
        active: val === 'feeder' ? true : false,
      },
    ])
  }

  const constructShareLink = () => {
    // If hash === default hash, send back only the root url.
    if (window.location.hash === DEFAULT_ROUTE) {
      return window.location.origin
    } else {
      return window.location.href
    }
  }

  const shareLinkModal = useStore(
    state => state.shareLinkModal,
  )
  const setShareLinkModal = useStore(
    state => state.setShareLinkModal,
  )

  const handleShare = e => {
    e.preventDefault()
    // console.log('handleShare(), ', e)
    // Click to Twitter
    if (e.currentTarget.id === 'button_share_twitter') {
      onTwitterShare(
        encodeURIComponent(constructShareLink()),
        i18n.translate('DIALOG_SHARE_TWITTER'),
      )
    }
    // Click to Facebook
    if (e.currentTarget.id === 'button_share_facebook') {
      onFacebookShare(
        encodeURIComponent(constructShareLink()),
        i18n.translate('DIALOG_SHARE_TWITTER'),
      )
    }
    // Click to mail
    if (e.currentTarget.id === 'button_share_email') {
      onMailShare(
        encodeURIComponent(constructShareLink()),
        i18n.translate('DIALOG_SHARE_EMAIL_SUBJECT'),
        i18n.translate('DIALOG_SHARE_EMAIL_BODY'),
      )
    }
    // Click to link
    if (e.currentTarget.id === 'button_share_link') {
      console.log('click share link')
      setShareLinkModal(!shareLinkModal)
    }
  }
  // <FiMenu />
  return (
    <div className="layout" {...props}>
      <RouteManager routeSet={ROUTE_SET} />
      <Header>
        <Logo {...logoProps} />
        <SchoolSearch />
        <CoreButton
          id="button_toggle_menu"
          aria-label={i18n.translate(`BUTTON_MENU`)}
          onClick={handleClick}
          color="none"
          className="button-toggle-menu"
        >
          <span class="menu-icon-group">
            <span class="menu-icon svg-base"></span>
            {i18n.translate(`BUTTON_MENU`)}
          </span>
        </CoreButton>
      </Header>
      <main>
        <Canvas>
          <SlideoutPanel />
          <ControlPanel>
            <Select
              id="select_view"
              color="primary"
              className={`select-view`}
              label={i18n.translate(`SELECT_VIEW`)}
              items={viewSelectItems}
              handleSelect={handleSelect}
              title={i18n.translate(`SELECT_VIEW`)}
              active={'select_view_' + activeView}
            />
            <CoreButton
              id="button_view_map"
              aria-label={i18n.translate(`BUTTON_VIEW_MAP`)}
              title={i18n.translate(`BUTTON_VIEW_MAP`)}
              onClick={handleClick}
              color="light"
              className={clsx(
                'button-view-map',
                activeView && activeView === 'map'
                  ? 'active'
                  : '',
              )}
            >
              <FiMap />
              <span className="sr-only">
                {i18n.translate(`BUTTON_VIEW_MAP`)}
              </span>
            </CoreButton>
            <CoreButton
              id="button_view_feeder"
              aria-label={i18n.translate(
                `BUTTON_VIEW_FEEDER`,
              )}
              title={i18n.translate(`BUTTON_VIEW_FEEDER`)}
              onClick={handleClick}
              color="light"
              className={clsx(
                'button-view-feeder',
                activeView && activeView === 'feeder'
                  ? 'active'
                  : '',
              )}
            >
              <FiList />
              <span className="sr-only">
                {i18n.translate(`BUTTON_VIEW_FEEDER`)}
              </span>
            </CoreButton>
            <Divider />
            {activeView === 'map' ? (
              <>
                <CoreButton
                  id="button_toggle_panel_filters"
                  aria-label={i18n.translate(
                    `BUTTON_TOGGLE_PANEL_FILTERS`,
                  )}
                  onClick={handlePanel}
                  color="light"
                  className={clsx(
                    'button-panel-filters',
                    slideoutPanel.active &&
                      slideoutPanel.panel === 'filters'
                      ? 'active'
                      : '',
                  )}
                >
                  <FiFilter />
                  <span className="sr-only">
                    {i18n.translate(
                      `BUTTON_TOGGLE_FILTERS`,
                    )}
                  </span>
                </CoreButton>
              </>
            ) : (
              ''
            )}
            <CoreButton
              id="button_toggle_panel_info"
              aria-label={i18n.translate(
                `BUTTON_TOGGLE_PANEL_INFO`,
              )}
              onClick={handlePanel}
              color="light"
              styles={{ display: 'none' }}
              className={clsx(
                'button-panel-info',
                slideoutPanel.active &&
                  slideoutPanel.panel === 'info'
                  ? 'active'
                  : '',
              )}
            >
              <FiInfo />
              <span className="sr-only">
                {i18n.translate(`BUTTON_TOGGLE_INFO`)}
              </span>
            </CoreButton>
            <Divider />
            <CoreButton
              id="button_share_twitter"
              aria-label={i18n.translate(
                `BUTTON_SHARE_TWITTER`,
              )}
              onClick={handleShare}
              color="none"
              className="button-share-twitter"
            >
              <FaTwitter />
              <span className="sr-only">
                {i18n.translate(`BUTTON_SHARE_TWITTER`)}
              </span>
            </CoreButton>
            <CoreButton
              id="button_share_facebook"
              aria-label={i18n.translate(
                `BUTTON_SHARE_FACEBOOK`,
              )}
              onClick={handleShare}
              color="none"
              className="button-share-facebook"
            >
              <FaFacebookF />
              <span className="sr-only">
                {i18n.translate(`BUTTON_SHARE_FACEBOOK`)}
              </span>
            </CoreButton>
            <CoreButton
              id="button_share_email"
              aria-label={i18n.translate(
                `BUTTON_SHARE_EMAIL`,
              )}
              onClick={handleShare}
              color="none"
              className="button-share-email"
            >
              <GrMail />
              <span className="sr-only">
                {i18n.translate(`BUTTON_SHARE_EMAIL`)}
              </span>
            </CoreButton>
            <CoreButton
              id="button_share_link"
              aria-label={i18n.translate(
                `BUTTON_SHARE_LINK`,
              )}
              onClick={handleShare}
              color="none"
              className="button-share-link"
            >
              <BsLink45Deg />
              <span className="sr-only">
                {i18n.translate(`BUTTON_SHARE_LINK`)}
              </span>
            </CoreButton>
          </ControlPanel>
          <div
            className={clsx(
              'view-parent',
              activeView
                ? 'display-' + activeView
                : 'display-map',
            )}
          >
            <MapView />
            <FeederView />
          </div>
          <ShareLinkModal />
        </Canvas>
      </main>
    </div>
  )
}

Layout.propTypes = {}

export default Layout
