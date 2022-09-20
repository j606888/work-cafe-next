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
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updatePlaceId, updateStores } from "store/slices/store"
import useSWR from "swr"

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
  go: false,
}
const SearchStoreList = ({ store, mapCenter }) => {
  const dispatch = useDispatch()
  const [options, setOptions] = useState(INIT_OPTIONS)
  const [openDrawer, setOpenDrawer] = React.useState(false)
  const [center, setCenter] = useState({
    lat: 23.0042325,
    lng: 120.2216038,
  })
  const { stores } = useSelector((state) => state.store)
  const { data } = useSWR(
    options?.go
      ? ["/stores/location", { ...options, ...center, limit: 20 }]
      : null
  )

  const handleCloseDrawer = () => {
    setOpenDrawer(false)
  }
  const handleKeywordSearch = (keyword) => {
    setOptions((cur) => ({ ...cur, keyword, go: true }))
  }
  const handleClear = () => {
    dispatch(updateStores([]))
    dispatch(updatePlaceId(null))
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
  const handleSearch = () => {
    setOptions((cur) => ({ ...cur, go: true }))
    setCenter(mapCenter)
  }

  useEffect(() => {
    if (data) {
      dispatch(updateStores(data))
      if (data.length === 1) {
        const placeId = data[0].placeId
        dispatch(updatePlaceId(placeId))
      }
    }
  }, [data, dispatch])

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
      </MenuContainer>
      <SearchHereContainer left={calcSearchHereLeft(stores, store)}>
        <SearchHere onClick={handleSearch} loading={options.go && !data} />
      </SearchHereContainer>
      <StoreListContainer>
        <StoreList stores={stores || []} />
      </StoreListContainer>
    </>
  )
}

export default SearchStoreList
