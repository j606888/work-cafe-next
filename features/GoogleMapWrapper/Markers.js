import Marker from "./Marker"

export default function Markers({
  map,
  stores,
  onClick = () => {},
  onMouseOver = () => {},
  onMouseout = () => {},
}) {
  function handleMarkerClick(placeId) {
    onClick(placeId)
  }

  function handleMarkerOver(placeId) {
    onMouseOver(placeId)
  }

  function handleMarkerOut(placeId) {
    onMouseout(placeId)
  }

  const markers = stores.map((store) => {
    const options = {
      position: {
        lat: store.lat,
        lng: store.lng,
      },
    }

    return (
      <Marker
        map={map}
        options={options}
        key={store.placeId}
        id={store.placeId}
        store={store}
        onClick={handleMarkerClick}
        onMouseover={handleMarkerOver}
        onMouseout={handleMarkerOut}
      />
    )
  })

  return markers
}
