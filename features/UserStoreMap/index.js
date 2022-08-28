import React, { useState } from "react"
import GoogleMapWrapper from "features/GoogleMapWrapper"
import Marker from "features/GoogleMapWrapper/Marker"
import Drawer from "features/Drawer"

const stores = [
  {
    id: 694,
    name: "自己的房間",
    placeId: "ChIJR_SmbmF2bjQRVBcj95_mwJo",
    lat: 22.9974617,
    lng: 120.2012626,
  },
]
const GoogleMap = () => {
  const [map, setMap] = useState(null)
  // const [stores, setStores] = useState([])

  const markers = stores.map((store) => {
    const options = {
      position: {
        lat: store.lat,
        lng: store.lng,
      },
    }

    return (
      <Marker
        options={options}
        key={store.id}
        id={store.id}
        store={store}
        // onClick={handleMarkerClick}
        // onMouseover={handleMarkerOver}
        // onMouseout={handleMarkerOut}
      />
    )
  })

  return (
    <>
      <Drawer />
      <GoogleMapWrapper map={map} setMap={setMap} marginTop="56px">
        {markers}
      </GoogleMapWrapper>
    </>
  )
}

export default GoogleMap
