import React, { useEffect, useState } from "react"
import GoogleMapWrapper from "features/GoogleMapWrapper"
import Marker from "features/GoogleMapWrapper/Marker"
import Drawer from "features/Drawer"
import useApi from "hooks/useApi"
import storeApi from "api/stores"

const GoogleMap = () => {
  const [map, setMap] = useState(null)
  const [stores, setStores] = useState([])
  const getStoresApi = useApi(storeApi.getPublicStoresByLocation)

  useEffect(() => {
    const result = getStoresApi.data
    console.log(result)
    setStores(result || [])
  }, [getStoresApi.data])

  useEffect(() => {
    getStoresApi.request({
      lat: 23.0042325,
      lng: 120.2216038,
    })
  }, [])

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
      <Drawer stores={stores}/>
      <GoogleMapWrapper map={map} setMap={setMap} marginTop="56px">
        {markers}
      </GoogleMapWrapper>
    </>
  )
}

export default GoogleMap
