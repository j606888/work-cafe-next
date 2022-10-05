import Searchbar from "features/Searchbar"
import SearchFilterV2 from "features/SearchFilterV2"
import StoreDetailV2 from "features/StoreDetailV2"
import StoreList from "features/StoreList"
import WelcomeMessage from "features/WelcomeMessage"
import useMapStore from "hooks/useMapStore"
import useStoreStore from "hooks/useStoreStore"
import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import styled from "styled-components"
import useSWR from "swr"

const Container = styled.div`
  width: 50%;
  position: relative;
  padding: 1px 0;
`

const SearchContainer = styled.div`
  display: flex;
  padding: 1rem 0;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  background-color: #fff;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`

const LeftContainer = () => {
  const [keyword, setKeyword] = useState("")
  const center = useMapStore((state) => state.center)
  const lastLatLng = useMapStore((state) => state.lastLatLng)
  const setLastLatLng = useMapStore((state) => state.setLastLatLng)
  const setStores = useStoreStore((state) => state.setStores)
  const placeId = useStoreStore((state) => state.placeId)
  const setPlaceId = useStoreStore((state) => state.setPlaceId)
  const [settings, setSettings] = useState({})

  const { data } = useSWR(
    keyword
      ? ["stores/location", { keyword, ...lastLatLng, ...settings }]
      : null
  )

  useEffect(() => {
    setStores(data || [])
  }, [data, setStores])

  function handleSearch(newKeyword) {
    setLastLatLng(center)
    setKeyword(newKeyword)
  }
  function handleClickStore(placeId) {
    setPlaceId(placeId)
  }
  function handleFilterChange(settings) {
    setLastLatLng(center)
    setSettings(settings)
  }

  return (
    <Container>
      <SearchContainer>
        <Searchbar onSearch={handleSearch} />
        <SearchFilterV2 onChange={handleFilterChange} />
      </SearchContainer>
      {!data && <WelcomeMessage />}
      <StoreList stores={data || []} onClick={handleClickStore} />
      <StoreDetailV2
        placeId={placeId}
        onClose={() => {
          setPlaceId(null)
        }}
      />
    </Container>
  )
}

export default LeftContainer
