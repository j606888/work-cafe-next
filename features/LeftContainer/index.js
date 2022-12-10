import StoreList from "features/StoreList"
import useStoreStore from "stores/useStoreStore"
import { useEffect } from "react"
import styled from "styled-components"
import NoMatch from "./NoMatch"
import _ from "lodash"
import useControlMap from "hooks/useControlMap"
import useLocationParamsStore from "stores/useLocationParamsStore"
import shallow from "zustand/shallow"
import useInitMap from "hooks/useInitMap"
import { devices } from "constant/styled-theme"
import ShortBlock from "./ShortBlock"
import useStoreSWR from "stores/useStoreSWR"

const LeftContainer = () => {
  const { center, moveTo, updateWithPlaceId } = useControlMap({
    navigate: true,
  })
  const { placeIdFromUrl } = useInitMap()
  const [params, keywordSearch, updateSettings] = useLocationParamsStore(
    (state) => [
      state.params,
      state.keywordSearch,
      state.updateSettings,
      state.searchHere,
    ],
    shallow
  )
  const [placeId, setPlaceId] = useStoreStore(
    (state) => [state.placeId, state.setPlaceId],
    shallow
  )
  const { data } = useStoreSWR()

  useEffect(() => {
    if (placeIdFromUrl) {
      setPlaceId(placeIdFromUrl)
    }
  }, [placeIdFromUrl, setPlaceId])

  useEffect(() => {
    if (data && data.length > 0 && params.moveAfter) {
      const latLng = _calCenter(data)
      moveTo({ latLng })
    }
  }, [data])

  function handleSearch(keyword) {
    setPlaceId(null)
    keywordSearch({ ...center, keyword, limit: 30 })
  }
  function handleClickStore({ placeId, lat, lng }) {
    setPlaceId(placeId)
    updateWithPlaceId(placeId)
    moveTo({ latLng: { lat, lng } })
  }
  function handleFilterChange(settings) {
    updateSettings(settings)
  }

  return (
    <Container>
      <ShortBlock
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        showFilter={!placeId}
      />
      {data && data.length === 0 && <NoMatch />}
      <StoreList stores={data || []} onClick={handleClickStore} />
    </Container>
  )
}

function _calCenter(data) {
  const lats = data.map(({ lat }) => lat)
  const lngs = data.map(({ lng }) => lng)

  return {
    lat: _.mean(lats),
    lng: _.mean(lngs),
  }
}

const Container = styled.div`
  width: 628px;
  position: relative;
  background-color: #ffffff;

  @media ${devices.mobileXl} {
    width: 100%;
    z-index: 5;
    background-color: transparent;
  }
`

export default LeftContainer
