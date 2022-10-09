import { Divider } from "@mui/material"
import Searchbar from "features/Searchbar"
import SearchFilter from "features/SearchFilter"
import StoreDetail from "features/StoreDetail"
import StoreList from "features/StoreList"
import WelcomeMessage from "features/WelcomeMessage"
import useStoreStore from "stores/useStoreStore"
import { useEffect } from "react"
import styled from "styled-components"
import useSWR from "swr"
import { TypeAnimation } from "react-type-animation"
import NoMatch from "./NoMatch"
import _ from "lodash"
import useControlMap from "hooks/useControlMap"
import useLocationParamsStore from "stores/useLocationParamsStore"
import shallow from "zustand/shallow"
import useInitMap from "hooks/useInitMap"

const Container = styled.div`
  width: 677px;
  position: relative;
  padding: 1px 0;
`

const SearchContainer = styled.div`
  display: flex;
  padding: 1rem 0 0;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  background-color: #fff;
  flex-wrap: wrap;
`

const LeftContainer = () => {
  const { center, moveTo, updateWithPlaceId } = useControlMap()
  const { placeIdFromUrl } = useInitMap()
  const [params, keywordSearch, updateSettings] = useLocationParamsStore(
    (state) => [state.params, state.keywordSearch, state.updateSettings],
    shallow
  )
  const [setStores, placeId, setPlaceId] = useStoreStore(
    (state) => [state.setStores, state.placeId, state.setPlaceId],
    shallow
  )
  const { data } = useSWR(
    params.lat ? ["stores/location", { ...params }] : null
  )

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

  return (
    <Container>
      {!data && (
        <TypeAnimation
          sequence={["", 800, "嗨～", 800, "嗨～今天想去哪辦公呢？"]}
          wrapper="div"
          style={{
            fontSize: "36px",
            textAlign: "center",
            marginTop: "2rem",
            marginBottom: "1rem",
          }}
          cursor={true}
          speed={50}
        />
      )}
      <SearchContainer>
        <Searchbar onSearch={handleSearch} />
        <SearchFilter onChange={handleFilterChange} />
      </SearchContainer>
      <Divider sx={{ marginY: 3 }} />
      {!data && !placeId && <WelcomeMessage />}
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
