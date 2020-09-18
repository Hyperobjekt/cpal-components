import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import i18n from '@pureartisan/simple-i18n'
import { isMobile } from 'react-device-detect'

import useStore from './../store.js'
import Layout from '../Layout/Layout'
import en_US from './../../../../constants/en_US'
import { BREAKPOINTS } from './../../../../constants/layers'
import 'mapbox-gl/dist/mapbox-gl.css'

/**
 * App is the base component for the explorer.
 * @param Object props Any props passed into the component
 */
const App = props => {
  // Initialize translation utility
  i18n.init({
    locale: 'en_US',
    languages: {
      en_US: en_US,
    },
  })
  // Handlers for menu toggle, passed in as a prop.
  const handleToggleMenu = useStore(
    state => state.handleToggleMenu,
  )
  const setHandleToggleMenu = useStore(
    state => state.setHandleToggleMenu,
  )
  if (!!props.toggleMenu) {
    // console.log(
    //   'props.toggleMenu exists, ',
    //   props.toggleMenu,
    // )
    setHandleToggleMenu(props.toggleMenu)
  }
  // Track and update renderForMobile
  const interactionsMobile = useStore(
    state => state.interactionsMobile,
  )
  const setInteractionsMobile = useStore(
    state => state.setInteractionsMobile,
  )
  /**
   * Manage browser width and breakpoint for use in the app.
   */
  const setBreakpoint = useStore(
    state => state.setBreakpoint,
  )
  const setBrowserWidth = useStore(
    state => state.setBrowserWidth,
  )
  const setBrowserWidthAndBreakpoint = () => {
    // console.log('setBrowserWidthAndBreakpoint')
    const breakpoint = BREAKPOINTS.filter((el, i) => {
      return (
        window.innerWidth >= BREAKPOINTS[i].max &&
        (!BREAKPOINTS[i + 1] ||
          window.innerWidth < BREAKPOINTS[i + 1].max)
      )
    })[0].id
    // console.log('breakpoint is, ', breakpoint)
    setBreakpoint(breakpoint)
    setBrowserWidth(window.innerWidth)
    setInteractionsMobile(
      !!(
        isMobile ||
        breakpoint === 'xs' ||
        breakpoint === 'sm' ||
        breakpoint === 'md'
      ),
    )
  }
  useEffect(() => {
    // console.log('useEffect')
    setBrowserWidthAndBreakpoint()
    window.addEventListener('resize', () => {
      // console.log('resize, ', window.innerWidth)
      setBrowserWidthAndBreakpoint()
    })
  }, [])

  useEffect(() => {
    window.CPAL = (function () {
      // grabs everything after the # character on provided string
      // function getHashFromURL(url) {
      //   if (url.indexOf('#') === -1) {
      //     return ''
      //   }
      //   return url.substring(url.indexOf('#') + 1)
      // }
      //
      // // listen to hash change, and show intro if empty route
      // window.addEventListener(
      //   'hashchange',
      //   function (e) {
      //     const oldHash = getHashFromURL(e.oldURL)
      //     const newHash = getHashFromURL(e.newURL)
      //     if (newHash === '/' && oldHash.length > 0) {
      //       showIntro()
      //     }
      //   },
      //   false,
      // )

      // stores the browser name and version for reporting
      var browser = (function () {
        var ua = navigator.userAgent,
          tem,
          M =
            ua.match(
              /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i,
            ) || []
        if (/trident/i.test(M[1])) {
          tem = /\brv[ :]+(\d+)/g.exec(ua) || []
          return { name: 'IE', version: tem[1] || '' }
        }
        if (M[1] === 'Chrome') {
          tem = ua.match(/\b(OPR|Edge)\/(\d+)/)
          if (tem != null)
            return {
              name: tem[1].replace('OPR', 'Opera'),
              version: tem[2],
            }
        }
        M = M[2]
          ? [M[1], M[2]]
          : [navigator.appName, navigator.appVersion, '-?']
        if ((tem = ua.match(/version\/(\d+)/i)) != null)
          M.splice(1, 1, tem[1])
        return { name: M[0], version: M[1] }
      })()

      // returns true if webgl is supported
      function webgl_support() {
        try {
          var canvas = document.createElement('canvas')
          return (
            !!window.WebGLRenderingContext &&
            (canvas.getContext('webgl') ||
              canvas.getContext('experimental-webgl'))
          )
        } catch (e) {
          return false
        }
      }

      // returns true if the browser is internet explorer
      function isIE() {
        var ua = window.navigator.userAgent
        var msie = ua.indexOf('MSIE ')
        if (msie > 0) {
          // IE 10 or older => return version number
          return parseInt(
            ua.substring(msie + 5, ua.indexOf('.', msie)),
            10,
          )
        }
        var trident = ua.indexOf('Trident/')
        if (trident > 0) {
          // IE 11 => return version number
          var rv = ua.indexOf('rv:')
          return parseInt(
            ua.substring(rv + 3, ua.indexOf('.', rv)),
            10,
          )
        }
        return false
      }

      // returns true if the browser is not supported
      function unsupportedBrowser() {
        return !webgl_support() || isIE()
      }

      // returns true if the provided route is valid
      // function validRoute(route) {
      //   if (route[0] === '/') {
      //     route = route.substring(1)
      //   } else if (route[0] === '#') {
      //     route = route.substring(2)
      //   }
      //   // skip embed validation
      //   if (route.indexOf('embed/') !== -1) {
      //     return true
      //   }
      //   var parts = route.split('/')
      //   var routeIds = [
      //     'view',
      //     'highlightedState',
      //     'region',
      //     'metric',
      //     'secondary',
      //     'demographic',
      //     'zoom',
      //     'latitude',
      //     'longitude',
      //     'locations',
      //   ]
      //   const params = routeIds.reduce(function (
      //     acc,
      //     curr,
      //     i,
      //   ) {
      //     acc[curr] = parts[i]
      //     return acc
      //   },
      //   {})
      //   if (
      //     !params.view ||
      //     ['map', 'chart', 'split'].indexOf(params.view) ===
      //       -1
      //   ) {
      //     return false
      //   }
      //   if (
      //     !params.highlightedState ||
      //     params.highlightedState.length !== 2
      //   ) {
      //     return false
      //   }
      //   if (
      //     !params.region ||
      //     ['counties', 'districts', 'schools'].indexOf(
      //       params.region,
      //     ) === -1
      //   ) {
      //     return false
      //   }
      //   if (
      //     !params.metric ||
      //     ['avg', 'grd', 'coh'].indexOf(params.metric) === -1
      //   ) {
      //     return false
      //   }
      //   if (
      //     !params.secondary ||
      //     ['ses', 'seg', 'min', 'frl'].indexOf(
      //       params.secondary,
      //     ) === -1
      //   ) {
      //     return false
      //   }
      //   if (
      //     !params.demographic ||
      //     (params.demographic !== 'all' &&
      //       params.region === 'schools') ||
      //     [
      //       'all',
      //       'w',
      //       'b',
      //       'a',
      //       'h',
      //       'm',
      //       'f',
      //       'wb',
      //       'wh',
      //       'pn',
      //       'np',
      //       'mf',
      //     ].indexOf(params.demographic) === -1
      //   ) {
      //     return false
      //   }
      //   if (
      //     !params.zoom ||
      //     !params.latitude ||
      //     !params.longitude
      //   ) {
      //     return false
      //   }
      //   return true
      // }

      // default route to load if none specified, or invalid
      // var defaultRoute =
      // '/map/us/districts/avg/ses/all/3.5/38/-97'

      // track start time
      var startTime = new Date()

      // variable to track the time when a user enters a view
      var viewTime

      // variable to track the current view (map, chart, split)
      var currentView

      // variable to track the time when a user selects a metric
      var metricTime

      // variable to track the current metric (avg, grd, coh)
      var currentMetric

      // track time after metric selection
      var startTimeDataLoad

      // timeout to track long load times
      var loadTimeout

      // stores event handlers
      var handlers = {}

      // labels for tracking
      // var LANG = {
      //   ALL: 'all',
      //   B: 'Black',
      //   W: 'White',
      //   H: 'Hispanic',
      //   A: 'Asian',
      //   M: 'male',
      //   F: 'female',
      //   P: 'poor',
      //   NP: 'non-poor',
      //   N: 'non-poor',
      //   WB: 'White / Black gap',
      //   WH: 'White / Hispanic gap',
      //   PN: 'non-poor / poor gap',
      //   MF: 'male / female gap',
      //   AVG: 'average test scores',
      //   GRD: 'learning rates',
      //   COH: 'trend in test scores',
      // }

      // registers a handler for a custom event
      var addHandler = function (handlerId, handler) {
        if (!handlers.hasOwnProperty(handlerId)) {
          handlers[handlerId] = []
        }
        handlers[handlerId].push(handler)
      }

      // triggers a custom event
      var trigger = function (handlerId, data) {
        if (handlers[handlerId]) {
          handlers[handlerId].forEach(function (handler) {
            handler(data)
          })
        }
      }

      var showIntro = function () {
        var el = document.getElementsByClassName(
          'section--intro',
        )[0]
        if (el) {
          // el.parentNode.removeChild(el)
          el.setAttribute('style', '')
          el.classList.remove('section--hidden')
          document
            .getElementById('root')
            .classList.add('hidden')
          showCards()
        }
      }

      // hides the intro section and reveals the tool
      var hideIntro = function () {
        var el = document.getElementsByClassName(
          'section--intro',
        )[0]
        if (el) {
          el.classList.add('section--hidden')
          document
            .getElementById('root')
            .classList.remove('hidden')
        }
      }

      var removeIntro = function () {
        var el = document.getElementsByClassName(
          'section--intro',
        )[0]
        if (el) {
          // el.parentNode.removeChild(el)
          el.setAttribute('style', 'display:none;')
        }
      }

      // shows the cards for metric selection
      var showCards = function () {
        var el = document.getElementsByClassName(
          'section__body--loading',
        )[0]
        if (el) {
          el.classList.remove('section__body--loading')
        }
      }

      // shows a message indicating the browser is unsupported
      var showUnsupported = function () {
        var el = document.getElementsByClassName(
          'section__body--loading',
        )[0]
        if (el) {
          el.classList.remove('section__body--loading')
          el.classList.add('section__body--unsupported')
        }
      }

      // hide the cards for metric selection
      // var hideCards = function () {
      //   var el = document.getElementsByClassName(
      //     'section__body',
      //   )[0]
      //   if (el) {
      //     el.classList.add('section__body--loading')
      //   }
      // }

      // load view for the provided metric, set in local storage to remember
      var loadView = function (metric) {
        if (supportsLocalStorage) {
          localStorage.setItem('region', 'districts')
          localStorage.setItem('metric', metric)
          localStorage.setItem('view', 'map')
          localStorage.setItem('demographic', 'all')
        }
        loadRoute()
        hideCards()
        showLoadRemainingAssets()
      }

      // load the route from local storage, or default options
      var loadRoute = function () {
        var getItem = function (item) {
          return supportsLocalStorage
            ? localStorage.getItem(item)
            : null
        }
        var region = getItem('region') || 'districts'
        var metric = getItem('metric') || 'avg'
        var view = getItem('view') || 'map'
        var demographic = getItem('demographic') || 'all'
        var route =
          '/' +
          view +
          '/us/' +
          region +
          '/' +
          metric +
          '/ses/' +
          demographic +
          '/3.5/38/-97'
        if (!validRoute(route)) {
          route = defaultRoute
          trackProblem('tried to load invalid route')
        } else {
          trackRegion(region)
          trackMetric(metric)
          trackView(view)
          trackDemographic(demographic)
        }
        replaceHash(route)
      }

      // updates the loading message
      var updateLoadingText = function (text) {
        var el = document.getElementById('loadingText')
        if (el) {
          el.innerHTML = text
        }
      }

      // show remaining loading messages while the map / charts load
      var showLoadRemainingAssets = function () {
        startTimeDataLoad = new Date()
        updateLoadingText('Loading maps')
        setTimeout(function () {
          updateLoadingText('Loading charts')
        }, 3000)
        setTimeout(function () {
          updateLoadingText('Loading school data')
        }, 8000)
        loadTimeout = setTimeout(function () {
          updateLoadingText('Still loading...')
          trackProblem(
            'explorer load longer than 30 seconds',
          )
        }, 30000)
      }

      var trackTiming = function (type, id, value) {
        // if (!dataLayer || !dataLayer.push) {
        //   return
        // }
        // dataLayer.push({
        //   event: 'timingEvent',
        //   timingType: type,
        //   timingId: id,
        //   timeValue: value,
        // })
      }

      var trackProblem = function (type) {
        // if (!dataLayer || !dataLayer.push) {
        //   return
        // }
        // dataLayer.push({
        //   event: 'problemDetected',
        //   problemType: type,
        // })
      }

      var trackRegion = function (region) {
        // if (!dataLayer || !dataLayer.push) {
        //   return
        // }
        // dataLayer.push({
        //   event: 'geoTypeSelected',
        //   geoTypeSelection: region,
        // })
      }

      var trackMetric = function (metric) {
        // if (!metric || !dataLayer || !dataLayer.push) {
        //   return
        // }
        // dataLayer.push({
        //   event: 'metricSelected',
        //   metricSelection:
        //     LANG[metric.toUpperCase()] || metric,
        // })
      }

      var trackDemographic = function (demographic) {
        // if (!demographic || !dataLayer || !dataLayer.push) {
        //   return
        // }
        // dataLayer.push({
        //   event: 'studentTypeSelected',
        //   studentTypeSelection:
        //     LANG[demographic.toUpperCase()] || demographic,
        // })
      }

      var trackView = function (view) {
        // if (!dataLayer || !dataLayer.push) {
        //   return
        // }
        // dataLayer.push({
        //   event: 'displayTypeSelected',
        //   displayTypeSelection: view,
        // })
      }

      // tracks the view and region for direct links
      var trackDirectLink = function () {
        var url = window.location.hash
        if (url.indexOf('/map/') !== -1) {
          trackView('map')
        }
        if (url.indexOf('/chart/') !== -1) {
          trackView('chart')
        }
        if (url.indexOf('/split/') !== -1) {
          trackView('split')
        }
        if (url.indexOf('/schools/') !== -1) {
          trackRegion('schools')
        }
        if (url.indexOf('/districts/') !== -1) {
          trackRegion('districts')
        }
        if (url.indexOf('/counties/') !== -1) {
          trackRegion('counties')
        }
        if (url.indexOf('/avg/') !== -1) {
          trackMetric('avg')
        }
        if (url.indexOf('/grd/') !== -1) {
          trackMetric('grd')
        }
        if (url.indexOf('/coh/') !== -1) {
          trackMetric('coh')
        }
      }

      // handler for when the 'app' event fires, indicating app assets are available
      var appLoadedHandler = function () {
        // var appLoadTime = new Date()
        // var appLoadSeconds = parseInt(appLoadTime - startTime)
        // trackTiming('load', 'loading assets', appLoadSeconds)
        // if (location.hash.length < 3) {
        //   if (supportsLocalStorage && localStorage.getItem('metric')) {
        //     // load route from local storage
        //     loadRoute()
        //     showLoadRemainingAssets()
        //   } else {
        //     // no route in local storage, show selection
        //     showCards()
        //   }
        // } else {
        //   // route already exists, load
        //   if (validRoute(window.location.hash)) {
        //     trackDirectLink()
        //   } else {
        //     trackProblem('tried to load invalid route')
        //     replaceHash(defaultRoute)
        //   }
        //   showLoadRemainingAssets()
        // }
        showLoadRemainingAssets()
      }

      var getViewFromURL = function (url) {
        if (url.indexOf('/map/') > -1) {
          return 'map'
        }
        if (url.indexOf('/chart/') > -1) {
          return 'chart'
        }
        if (url.indexOf('/split/') > -1) {
          return 'split'
        }
        return 'unknown'
      }

      var getMetricFromURL = function (url) {
        if (url.indexOf('/avg/') > -1) {
          return 'avg'
        }
        if (url.indexOf('/grd/') > -1) {
          return 'grd'
        }
        if (url.indexOf('/coh/') > -1) {
          return 'coh'
        }
        return 'unknown'
      }

      var setupViewTiming = function () {
        viewTime = new Date()
        metricTime = new Date()
        currentView = getViewFromURL(window.location.hash)
        currentMetric = getMetricFromURL(
          window.location.hash,
        )
        var handleHashChange = function (e) {
          var newView = getViewFromURL(e.newURL)
          var newMetric = getMetricFromURL(
            window.location.hash,
          )
          if (newView !== currentView) {
            var elapsedTime = parseInt(
              new Date() - viewTime,
            )
            trackTiming(
              'interaction',
              'viewing ' + currentView,
              elapsedTime,
            )
            viewTime = new Date()
            currentView = newView
          }
          if (newMetric !== currentMetric) {
            var elapsedTime = parseInt(
              new Date() - metricTime,
            )
            trackTiming(
              'interaction',
              'duration ' + currentMetric,
              elapsedTime,
            )
            metricTime = new Date()
            currentMetric = newMetric
          }
        }
        var handleUnload = function () {
          var elapsedTime = parseInt(new Date() - viewTime)
          trackTiming(
            'interaction',
            'viewing ' + currentView,
            elapsedTime,
          )
          trackTiming(
            'interaction',
            'duration ' + currentMetric,
            elapsedTime,
          )
        }

        window.addEventListener(
          'hashchange',
          handleHashChange,
          false,
        )
        window.addEventListener(
          'beforeunload',
          handleUnload,
          false,
        )
      }

      var mapLoadHandler = function () {
        if (loadTimeout) {
          clearTimeout(loadTimeout)
        }
        var endTimeDataLoad = new Date()
        var dataLoadSeconds = parseInt(
          endTimeDataLoad - startTimeDataLoad,
        )
        trackTiming(
          'load',
          'loading map data',
          dataLoadSeconds,
        )
        hideIntro()
        setupViewTiming()
        setTimeout(removeIntro, 2000)
      }

      if (unsupportedBrowser()) {
        showUnsupported()
        trackProblem(
          'unsupported browser: ' +
            browser.name +
            ' ' +
            browser.version,
        )
      } else {
        // bind events
        addHandler('app', appLoadedHandler)
        addHandler('map', mapLoadHandler)
      }

      // return public functions
      return {
        addHandler: addHandler,
        trigger: trigger,
        loadView: loadView,
        trackTiming: trackTiming,
        trackProblem: trackProblem,
      }
    })()
  }, [])

  return <Layout></Layout>
}

App.propTypes = {}

export default App
