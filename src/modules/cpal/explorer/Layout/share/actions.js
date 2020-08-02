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
    shareUrl
  mail.target = '_blank'
  mail.click()
  mail.remove()
}

/**
 * Action to toggle share link dialog
 * @param {bool} open sets the link dialog open / closed
 */
export const toggleLinkShareDialog = open => ({
  type: 'SET_LINK_DIALOG',
  open,
})

export const onShare = (url, shareType) => ({
  type: 'SOCIAL_SHARE',
  url,
  shareType,
})
