import StoreList from "features/StoreList"
import useStoreStore from "stores/useStoreStore"
import { useEffect, useState } from "react"
import styled from "styled-components"
import _ from "lodash"
import useControlMap from "hooks/useControlMap"
import useLocationParamsStore from "stores/useLocationParamsStore"
import shallow from "zustand/shallow"
import useInitMap from "hooks/useInitMap"
import { devices } from "constant/styled-theme"
import ShortBlock from "./ShortBlock"
import useStoreSWR from "stores/useStoreSWR"
import SvgButton from "components/SvgButton"

const LeftContainer = () => {
  const [expand, setExpand] = useState(false)
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
    <Container expand={expand}>
      <ShortBlock
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        showFilter={!placeId}
        expand={expand}
        onMapOpen={() => setExpand(false)}
      />
      <StoreList stores={data} onClick={handleClickStore} />
      {!expand && (
        <ExpandButton onClick={() => setExpand(true)}>
          <SvgButton path="expand-btn" />
        </ExpandButton>
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

const Container = styled.div`
  width: ${({ expand }) => (expand ? "100%" : "628px")};
  position: relative;
  background-color: #ffffff;

  @media ${devices.mobileXl} {
    width: 100%;
    z-index: 5;
    background-color: transparent;
  }
`

const ExpandButton = styled.div`
  width: 32px;
  height: 60px;
  background-color: #ffffff;
  z-index: 15;
  position: fixed;
  bottom: calc((100vh - 120px) / 2);
  transform: translateY(50%);
  left: 628px;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background: #f5f5f5;
  }
`

export default LeftContainer
