import React, { useState } from 'react'
import i18n from '@pureartisan/simple-i18n'
import clsx from 'clsx'
import { MdPhotoCamera } from 'react-icons/md'
import { CoreButton } from './../../../../core'
import { Tooltip } from 'reactstrap'

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
    <CoreButton
      color="light"
      active={true}
      id="map_capture_button"
      className={clsx(
        `map-capture-btn`,
        `mapboxgl-ctrl-icon`,
      )}
      onClick={captureMap}
      label={i18n.translate(`UI_MAP_CAPTURE`)}
      tooltip="left"
    >
      <MdPhotoCamera className="icon" />
      <span className="sr-only">
        {i18n.translate(`UI_MAP_CAPTURE`)}
      </span>
    </CoreButton>
  )
}

export default MapCaptureButton
