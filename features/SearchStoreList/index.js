import { fetcher } from "api"
import SearchHere from "components/Button/SearchHere"
import OpenTimeV2 from "features/OpenTimeV2"
import SearchbarV2 from "features/SearchbarV2"
import StoreListV2 from "features/StoreListV2"
import UserDrawer from "features/UserDrawer"
import {
  MenuContainer,
  SearchbarV2Container,
  SearchHereContainer,
  StoreListContainer,
} from "features/UserMap/styled"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
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
  const { data: stores } = useSWR(
    options?.go ? ["/stores/location", { ...options, ...center, limit: 20 }] : null,
    fetcher
  )

  const handleCloseDrawer = () => {
    setOpenDrawer(false)
  }
  const handleKeywordSearch = (keyword) => {
    setOptions((cur) => ({ ...cur, keyword, go: true }))
  }
  const handleClear = () => {
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
    setOptions((cur) => ({ ...cur,  go: true }))
    setCenter(mapCenter)
  }

  useEffect(() => {
    dispatch(updatePlaceId(null))
  }, [options, openDrawer])

  useEffect(() => {
    dispatch(updateStores(stores || []))
  }, [stores, dispatch])


  return (
    <>
      <UserDrawer open={openDrawer} onClose={handleCloseDrawer} />
      <SearchbarV2Container>
        <SearchbarV2
          onSearch={handleKeywordSearch}
          hasResult={stores?.length !== 0}
          onClear={handleClear}
          onOpenDrawer={() => setOpenDrawer(true)}
        />
      </SearchbarV2Container>
      <MenuContainer>
        <OpenTimeV2 onChange={handleOpenTimeChange} />
      </MenuContainer>
      <SearchHereContainer left={calcSearchHereLeft(stores, store)}>
        <SearchHere onClick={handleSearch} />
      </SearchHereContainer>
      <StoreListContainer>
        <StoreListV2 stores={stores || []} />
      </StoreListContainer>
    </>
  )
}

export default SearchStoreList
