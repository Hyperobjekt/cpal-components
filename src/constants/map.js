/**
 * default viewport on map view
 */

export const BOUNDS = {
  lat: {
    max: 33.26625,
    min: 32.486597,
  },
  lng: {
    min: -97.222586,
    max: -96.410091,
  },
  zoom: {
    min: 9,
    max: 14,
  },
}

export const DEFAULT_VIEWPORT = {
  latitude: 32.7603525,
  longitude: -96.791731,
  zoom: 10,
  bearing: 0,
  pitch: 0,
  dragPan: true,
  touchZoomRotate: { around: 'center' },
  preserveDrawingBuffer: true,
}