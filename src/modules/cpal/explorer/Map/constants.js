/**
 * default viewport on map view
 */
// var bounds = [
//   [-97.303223, 32.454256], // Southwest coordinates
//   [-96.47114, 33.058169], // Northeast coordinates
// ]

export const BOUNDS = {
  lat: {
    max: 33.058169,
    min: 32.454256,
  },
  lng: {
    max: -96.47114,
    min: -97.303223,
  },
}

export const DEFAULT_VIEWPORT = {
  latitude: 32.7603525, // 37.39,
  longitude: -96.791731, // -96.78,
  zoom: 10,
  maxZoom: 7,
  minZoom: 3,
  // maxBounds: bounds,
}
