import React from 'react'

import useStore from './../store'

const defaultOptions = {
  width: 626,
  height: 436,
  toolbar: 0,
  status: 0,
  resizable: 1,
}

const objectToUrlParams = obj => {
  return Object.keys(obj)
    .map(key => key + '=' + obj[key])
    .join(',')
}

export const constructShareLink = (
  shareHash = null,
  defaultRoute = '',
) => {
  // If hash === default hash, send back only the root url.
  if (!!shareHash) {
    return (
      window.location.origin +
      window.location.pathname +
      shareHash
    )
  } else {
    return (
      window.location.origin +
      window.location.pathname +
      defaultRoute
    )
  }
}

/**
 * Opens a popup window to share a url on facebook
 * @param {string} shareUrl
 */
export const onFacebookShare = (shareUrl, options = {}) => {
  const url =
    'https://facebook.com/sharer.php?display=popup&u=' +
    shareUrl
  const popupOptions = objectToUrlParams(
    Object.assign(defaultOptions, options),
  )
  window.open(url, 'sharer', popupOptions)
}
/**
 * Opens a popup window to share a tweet + url on twitter
 * @param {string} shareUrl
 * @param {string} text
 */
export const onTwitterShare = (
  shareUrl,
  text,
  options = {},
) => {
  // console.log('onTwitterShare')
  const url =
    'https://twitter.com/intent/tweet?text=' +
    encodeURI(text) +
    '%20' +
    shareUrl
  const popupOptions = objectToUrlParams(
    Object.assign(defaultOptions, options),
  )
  window.open(url, 'sharer', popupOptions)
}

export const onMailShare = (shareUrl, subject, body) => {
  // console.log('onMailShare')
  var mail = document.createElement('a')
  mail.href =
    'mailto:?' +
    'subject=' +
    subject +
    '&body=' +
    body +
    '%0D%0A%0D%0A' +
    shareUrl
  mail.target = '_blank'
  mail.click()
  mail.remove()
}

const Share = ({ ...props }) => {}

export default Share
