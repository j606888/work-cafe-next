import StoreList from "features/StoreList"
import { useState } from "react"
import styled from "styled-components"
import { devices } from "constants/styled-theme"
import ShortBlock from "./ShortBlock"
import SvgButton from "components/SvgButton"
import store from "stores/store"
import { useRouter } from "next/router"

const LeftContainer = () => {
  const router = useRouter()
  const { map, placeId, setPlaceId, setPanelType } = store((state) => ({
    map: state.map,
    placeId: state.placeId,
    setPlaceId: state.setPlaceId,
    setPanelType: state.setPanelType,
  }))
  const [expand, setExpand] = useState(false)

  function handleSearch(keyword) {
    setPlaceId(null)
  }

  function handleClickStore({ placeId }) {
    const lat = map.center.lat().toFixed(6)
    const lng = map.center.lng().toFixed(6)
    const zoom = map.zoom

    setPlaceId(placeId)
    setPanelType("STORE_DETAIL")
    router.push(`place/${placeId}/@${lat},${lng},${zoom}z`, undefined, {
      shallow: true,
    })
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
      <StoreList onClick={handleClickStore} expand={expand} />
      {!expand && (
        <ExpandButton onClick={() => setExpand(true)}>
          <SvgButton path="expand-btn" />
        </ExpandButton>
      )}
    </Container>
  )
}

const Container = styled.div`
  width: ${({ expand }) => (expand ? "100%" : "628px")};
  overflow: scroll;
  position: relative;
  flex-shrink: 0;
  height: 100%;

  @media ${devices.mobileXl} {
    width: 100%;
    z-index: 5;
    background-color: transparent;
    position: absolute;
    height: ${({ expand }) => (expand ? "100%" : "auto")};
    overflow: visible;
  }
`

const ExpandButton = styled.div`
  width: 32px;
  height: 60px;
  background-color: #ffffff;
  z-index: 15;
  position: fixed;
  bottom: calc((100vh - 120px) / 2);
  left: 628px;
  transform: translateY(50%);
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;

  @media ${devices.mobileXl} {
    left: 50%;
    bottom: 217px;
    transform: translateX(-50%) rotate(-90deg);
    z-index: -1;
  }
`

export default LeftContainer
