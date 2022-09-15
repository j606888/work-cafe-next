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
} from "features/UserStoreMap/styled"
import React, { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearKeyword, updateOptions } from "store/slices/map-search"
import { updatePlaceId } from "store/slices/store"

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

const SearchStoreList = ({ store, current }) => {
  const dispatch = useDispatch()
  const openTimeRef = useRef({})
  const [openDrawer, setOpenDrawer] = React.useState(false)
  const { stores, placeId } = useSelector((state) => state.store)
  const mapCenterRef = useRef({
    lat: 23.0042325,
    lng: 120.2216038,
  })

  const handleCloseDrawer = () => {
    setOpenDrawer(false)
    clearPlaceId()
  }

  const clearPlaceId = () => {
    dispatch(updatePlaceId(null))
  }

  const handleKeywordSearch = (keyword) => {
    dispatch(
      updateOptions({
        ...mapCenterRef.current,
        keyword,
      })
    )
    clearPlaceId()
  }

  const handleClear = () => {
    dispatch(clearKeyword())
    clearPlaceId()
  }

  const handleOpenTimeChange = ({ openType, openWeek, openHour }) => {
    let realOpenHour = openHour === "99" ? null : openHour
    openTimeRef.current = {
      openType,
      openWeek,
      openHour: realOpenHour,
    }
    updateOptions({
      ...mapCenterRef.current,
    })
  }

  const handleSearch = () => {
    dispatch(
      updateOptions({
        ...mapCenterRef.current,
        ...current,
      })
    )

    clearPlaceId()
  }

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
        <StoreListV2 stores={stores || []} focusPlaceId={placeId} />
      </StoreListContainer>
    </>
  )
}

export default SearchStoreList
