import SearchHere from "components/Button/SearchHere"
import OpenTime from "features/OpenTime"
import Searchbar from "features/Searchbar"
import StoreList from "features/StoreList"
import UserDrawer from "features/UserDrawer"
import {
  MenuContainer,
  SearchbarV2Container,
  SearchHereContainer,
  StoreListContainer,
} from "features/UserMap/styled"
import { WhiteBox } from "./styled"
import React, { useEffect, useState } from "react"
import useSWR from "swr"
import useStoreStore from "hooks/useStoreStore"
import SearchFilter from "features/SearchFilter"
import useMapStore from "hooks/useMapStore"

const calcSearchHereLeft = (stores, store) => {
  const leftMap = {
    default: "50%",
    stores: "calc(374px / 2 + 50%);",
    store: "calc((374px + 360px) / 2 + 50%);",
  }
  if (!!store) return leftMap.store
  if (stores && stores.length > 0) return leftMap.stores
  return leftMap.default
}

const INIT_OPTIONS = {
  keyword: "",
  openType: "NONE",
  openWeek: null,
  openHour: null,
  wakeUp: false,
  go: false,
}

const SearchStoreList = ({ store, mapCenter }) => {
  const stores = useStoreStore((state) => state.stores)
  const clearStores = useStoreStore((state) => state.clearStores)
  const setStores = useStoreStore((state) => state.setStores)
  const setPlaceId = useStoreStore((state) => state.setPlaceId)
  const setMoveMap = useMapStore((state) => state.setMoveMap)

  const [options, setOptions] = useState(INIT_OPTIONS)
  const [openDrawer, setOpenDrawer] = React.useState(false)
  const [center, setCenter] = useState({
    lat: 23.0042325,
    lng: 120.2216038,
  })
  const { data } = useSWR(
    options?.go
      ? ["/stores/location", { ...options, ...center, limit: 30 }]
      : null
  )

  const handleCloseDrawer = () => {
    setOpenDrawer(false)
  }
  const handleKeywordSearch = (keyword) => {
    setMoveMap(true)
    setOptions((cur) => ({ ...cur, keyword, go: true }))
  }
  const handleClear = () => {
    clearStores()
    setPlaceId(null)
    setOptions((cur) => ({ ...cur, keyword: "", go: false }))
  }
  const handleOpenTimeChange = ({ openType, openWeek, openHour }) => {
    const currentOpenTime = {
      openType,
      openWeek,
      openHour: openHour === "99" ? null : openHour,
    }
    setOptions((cur) => ({ ...cur, ...currentOpenTime, go: true }))
  }
  const handleFilterChange = (filter) => {
    setOptions((cur) => ({ ...cur, ...filter, go: true}))
  }
  const handleSearch = () => {
    setMoveMap(false)
    setPlaceId(null)
    setOptions((cur) => ({ ...cur, keyword: "", go: true }))
    setCenter(mapCenter)
  }

  useEffect(() => {
    if (data) {
      setStores(data)
      if (data.length === 1) {
        const placeId = data[0].placeId
        setPlaceId(placeId)
      }
    }
  }, [data])

  return (
    <>
      <UserDrawer open={openDrawer} onClose={handleCloseDrawer} />
      <SearchbarV2Container>
        <Searchbar
          onSearch={handleKeywordSearch}
          hasResult={stores?.length !== 0}
          onClear={handleClear}
          onOpenDrawer={() => setOpenDrawer(true)}
        />
      </SearchbarV2Container>
      <MenuContainer>
        <OpenTime onChange={handleOpenTimeChange} />
        <SearchFilter onChange={handleFilterChange}/>
      </MenuContainer>
      <SearchHereContainer left={calcSearchHereLeft(stores, store)}>
        <SearchHere onClick={handleSearch} loading={options.go && !data} />
      </SearchHereContainer>
      <StoreListContainer>
        {stores.length > 0 && (
          <>
            <WhiteBox />
            <StoreList stores={stores || []} />
          </>
        )}
      </StoreListContainer>
    </>
  )
}

export default SearchStoreList
