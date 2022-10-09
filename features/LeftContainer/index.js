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
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Container = styled.div`
  width: 628px;
  position: relative;
  padding: 1px 0;
`

const Or = styled.p`
  text-align: center;
  color: #757575;
  font-size: 14px;
  padding: 0.5rem 0 1rem;
`

const Upper = styled.div`
  background-color: #f9f9f9;
  padding-bottom: 1rem;
  position: relative;
`

const SearchContainer = styled.div`
  display: flex;
  padding: 1rem 56px 0;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
`

const HelloContainer = styled.div`
  padding: 56px 0 0 56px;
  color: #757575;

  p {
    font-size: 14px;
    margin: 4px 0 8px;
  }
`

const SearchNearbyButton = styled.div`
  color: #757575;
  background-color: #f5f5f5;
  border: 1px solid #757575;
  border-radius: 8px;
  font-size: 16px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 50%);
  padding: 15px 25px 15px 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #fcfcfc;
  }
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
      <Upper>
        {!data && (
          <HelloContainer>
            <TypeAnimation
              sequence={["", 800, "嗨! ", 800, "嗨～今天想去哪辦公呢？"]}
              wrapper="div"
              style={{
                fontSize: "28px",
                fontWeight: 700,
              }}
              cursor={true}
              speed={50}
            />
            <p>Work Cafe 幫你快速篩選 適合辦公的咖啡店</p>
          </HelloContainer>
        )}
        <SearchContainer>
          <Searchbar onSearch={handleSearch} />
          {/* <SearchFilter onChange={handleFilterChange} /> */}
        </SearchContainer>
        <Or>或</Or>
        <SearchNearbyButton>
          <ArrowForwardIcon />
          <span>搜尋 我附近的咖啡店</span>
        </SearchNearbyButton>
      </Upper>
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
