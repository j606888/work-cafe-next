import { Divider } from "@mui/material"
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
import { TypeAnimation } from 'react-type-animation'
import NoMatch from "./NoMatch"

const Container = styled.div`
  width: 50%;
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
  const [keyword, setKeyword] = useState("")
  const center = useMapStore((state) => state.center)
  const lastLatLng = useMapStore((state) => state.lastLatLng)
  const setLastLatLng = useMapStore((state) => state.setLastLatLng)
  const setStores = useStoreStore((state) => state.setStores)
  const placeId = useStoreStore((state) => state.placeId)
  const setPlaceId = useStoreStore((state) => state.setPlaceId)
  const [settings, setSettings] = useState({})

  const { data } = useSWR(
    keyword || lastLatLng
      ? ["stores/location", { keyword, ...lastLatLng, ...settings }]
      : null
  )

  useEffect(() => {
    setStores(data || [])
  }, [data, setStores])

  function handleSearch(newKeyword) {
    if (newKeyword === "") {
      setLastLatLng({})
    } else {
      setLastLatLng(center)
    }

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
      {!data && <TypeAnimation sequence={['', 800, '嗨～', 800, '嗨～今天想去哪喝咖啡呢？']}
        wrapper='div'
        style={{ fontSize: '36px', textAlign: 'center', marginTop: '2rem', marginBottom: '1rem' }}
        cursor={true}
        speed={50}
      />}
      <SearchContainer>
        <Searchbar onSearch={handleSearch} />
        <SearchFilterV2 onChange={handleFilterChange} />
      </SearchContainer>
      <Divider sx={{ marginY: 3}}/>
      {!data && <WelcomeMessage />}
      {data && data.length === 0 && <NoMatch />}
      <StoreList stores={data || []} onClick={handleClickStore} />
      <StoreDetailV2
        placeId={placeId}
        key={placeId}
        onClose={() => {
          setPlaceId(null)
        }}
      />
    </Container>
  )
}

export default LeftContainer
