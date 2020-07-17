import React, { useState } from 'react'
import i18n from '@pureartisan/simple-i18n'
import { Button } from 'reactstrap'
import clsx from 'clsx'
import { FiCamera } from 'react-icons/fi'

import './MapCaptureButton.scss'

/**
 * Button that captures map canvas and triggers download
 */
const MapCaptureButton = ({ currentMap, ...props }) => {
  const captureMap = () => {
    // console.log('captureMap')
    const dataURL = currentMap
      .getCanvas()
      .toDataURL('image/png')
    const a = document.createElement('a')
    a.href = dataURL
    a.setAttribute('download', 'cri-explorer-capture.png')
    a.click()
    a.remove()
  }

  return (
    <Button
      color="secondary"
      active={true}
      className={clsx(
        `map-capture-btn`,
        `mapboxgl-ctrl-icon`,
      )}
      onClick={captureMap}
      title={i18n.translate(`UI_MAP_CAPTURE`)}
    >
      <FiCamera className="icon" />
      <span className="sr-only">
        {i18n.translate(`UI_MAP_CAPTURE`)}
      </span>
    </Button>
  )
}

export default MapCaptureButton
