import Searchbar from 'features/Searchbar'
import SearchFilterV2 from 'features/SearchFilterV2'
import StoreDetailV2 from 'features/StoreDetailV2'
import StoreList from 'features/StoreList'
import WelcomeMessage from 'features/WelcomeMessage'
import useMapStore from 'hooks/useMapStore'
import useStoreStore from 'hooks/useStoreStore'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import useSWR from 'swr'

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
`

const LeftContainer = () => {
  const [keyword, setKeyword] = useState("")
  const center = useMapStore(state => state.center)
  const setStores = useStoreStore(state => state.setStores)
  const { data } = useSWR(keyword ? ["stores/location", { keyword, ...center }] : null)
  const [placeId, setPlaceId] = useState(null)

  useEffect(() => {
    if (data) {
      setStores(data)
    }
  }, [data, setStores])

  function handleSearch(newKeyword) {
    setKeyword(newKeyword)
  }
  function handleClickStore(placeId) {
    setPlaceId(placeId)
  }

  return (
    <Container>
      <SearchContainer>
        <Searchbar onSearch={handleSearch}/>
        <SearchFilterV2 />
      </SearchContainer>
      <WelcomeMessage />
      <StoreList stores={data || []} onClick={handleClickStore}/>
      <StoreDetailV2 placeId={placeId} onClose={() => {setPlaceId(null)}} />
    </Container>
  )
}

export default LeftContainer
