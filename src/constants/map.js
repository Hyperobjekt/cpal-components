/**
 * default viewport on map view
 */

export const DEFAULT_ROUTE =
  '/map/cri_weight/1,1,1,1,1///0,0,0,0,0,0,0/32.76/-96.792/10/'

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
  touchZoom: true,
  touchRotate: true,
  preserveDrawingBuffer: true,
}
