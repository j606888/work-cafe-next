import SearchFilter from "features/SearchFilter"
import StoreDetail from "features/StoreDetail"
import StoreList from "features/StoreList"
import useStoreStore from "stores/useStoreStore"
import { useEffect } from "react"
import styled from "styled-components"
import useSWR from "swr"
import NoMatch from "./NoMatch"
import _ from "lodash"
import useControlMap from "hooks/useControlMap"
import useLocationParamsStore from "stores/useLocationParamsStore"
import shallow from "zustand/shallow"
import useInitMap from "hooks/useInitMap"
import useFindMe from "hooks/useFindMe"
import { devices } from "constant/styled-theme"
import WelcomeBlock from "./WelcomeBlock/WelcomeBlock"
import ShortBlock from "./ShortBlock/ShortBlock"

const Container = styled.div`
  width: 628px;
  /* position: relative; */

  @media ${devices.iphoneSE} {
    width: 100%;
    z-index: 5;
  }
`

const LeftContainer = () => {
  const { center, moveTo, updateWithPlaceId } = useControlMap()
  const { placeIdFromUrl } = useInitMap()
  const [params, keywordSearch, updateSettings, searchHere] =
    useLocationParamsStore(
      (state) => [
        state.params,
        state.keywordSearch,
        state.updateSettings,
        state.searchHere,
      ],
      shallow
    )
  const [setStores, placeId, setPlaceId] = useStoreStore(
    (state) => [state.setStores, state.placeId, state.setPlaceId],
    shallow
  )
  const { data } = useSWR(
    params.lat ? ["stores/location", { ...params }] : null
  )
  const { findMe, loading } = useFindMe()

  useEffect(() => {
    if (placeIdFromUrl) {
      setPlaceId(placeIdFromUrl)
    }
  }, [placeIdFromUrl, setPlaceId])

  useEffect(() => {
    setStores(data || [])
    if (data && data.length > 0 && params.moveAfter) {
      const latLng = _calCenter(data)
      moveTo({ latLng })
    }
  }, [data, setStores])

  function handleSearch(keyword) {
    keywordSearch({ ...center, keyword, limit: 30 })
  }
  function handleClickStore(placeId) {
    setPlaceId(placeId)
    updateWithPlaceId(placeId)
  }
  function handleCloseStore() {
    setPlaceId(null)
    updateWithPlaceId()
  }
  function handleFilterChange(settings) {
    updateSettings(settings)
  }
  async function handleNearbySearch() {
    const latLng = await findMe()
    moveTo({ latLng })
    searchHere(latLng)
  }

  const searchBlock =
    data && data.length > 0 ? (
      <ShortBlock onSearch={handleSearch} onFilterChange={handleFilterChange} />
    ) : (
      <WelcomeBlock
        loading={loading}
        onSearch={handleSearch}
        onNearbySearch={handleNearbySearch}
      />
    )

  return (
    <Container>
      {searchBlock}
      {data && data.length === 0 && <NoMatch />}
      {!placeId && <StoreList stores={data || []} onClick={handleClickStore} />}
      {placeId && (
        <StoreDetail
          placeId={placeId}
          key={placeId}
          canBack={!!data && data.length !== 0}
          onClose={handleCloseStore}
        />
      )}
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

export default LeftContainer
