export function mapCenter(map) {
  return {
    lat: map.center.lat().toFixed(6),
    lng: map.center.lng().toFixed(6),
    zoom: map.zoom
  }
}
