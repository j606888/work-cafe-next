export function mapCenter(map) {
  if (map) {
    return {
      lat: +map.center.lat().toFixed(6),
      lng: +map.center.lng().toFixed(6),
      zoom: +map.zoom
    }
  } else {
    const path = window.location.pathname
    const match = path.match(/@([\d.-]+),([\d.-]+),([\d]+)z/)

    return {
      lat: +match[1],
      lng: +match[2],
      zoom: +match[3]
    }
  }
}
