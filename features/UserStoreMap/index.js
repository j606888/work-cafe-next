import React, { useContext, useEffect, useState } from "react"
import GoogleMapWrapper from "features/GoogleMapWrapper"
import Marker from "features/GoogleMapWrapper/Marker"
import Drawer from "features/Drawer"
import useApi from "hooks/useApi"
import storeApi from "api/stores"
import FilterContext from "contexts/FilterContext"

const GoogleMap = () => {
  const [map, setMap] = useState(null)
  const [stores, setStores] = useState([])
  const getStoresApi = useApi(storeApi.getPublicStoresByLocation)

  const { keyword, openTime } = useContext(FilterContext)

  useEffect(() => {
    const result = getStoresApi.data
    setStores(result || [])
  }, [getStoresApi.data])

  useEffect(() => {
    getStoresApi.request({
      lat: 23.0042325,
      lng: 120.2216038,
      ...openTime,
    })
  }, [openTime])

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
