import Searchbar from 'features/Searchbar'
import SearchFilterV2 from 'features/SearchFilterV2'
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

  useEffect(() => {
    if (data) {
      setStores(data)
    }
  }, [data, setStores])

  function handleSearch(newKeyword) {
    setKeyword(newKeyword)
  }

  return (
    <Container>
      <SearchContainer>
        <Searchbar onSearch={handleSearch}/>
        <SearchFilterV2 />
      </SearchContainer>
      <WelcomeMessage />
    </Container>
  )
}

export default LeftContainer
