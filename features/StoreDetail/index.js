import React from "react"
import styled from "styled-components"
import Skeleton from "components/Skeleton"
import Header from "./Header/Header"
import TagList from "../../components/TagList/TagList"
import Recommend from "./Recommend/Recommend"
import ImagePreview from "./ImagePreview/ImagePreview"
import { devices } from "constants/styled-theme"
import Reviews from "./Reviews/Reviews"
import OpenTime from "./OpenTime/OpenTime"
import useHintSearch from "features/Searchbar/useHintSearch"
import useSearchStores from "hooks/useSearchStores"
import storeStore, { PANEL_TYPES } from "stores/store"
import { useRouter } from "next/router"
import { mapCenter } from "utils/map-helper"

const StoreDetail = ({ store }) => {
  const router = useRouter()
  const { map, keyword, setPanelType, setPlaceId } = storeStore(
    (state) => ({
      map: state.map,
      keyword: state.keyword,
      setPanelType: state.setPanelType,
      setPlaceId: state.setPlaceId,
    })
  )
  const { searchHints } = useHintSearch()

  const { data: stores } = useSearchStores()

  function handleReviewSave() {
    mutateStore()
  }

  const handleClose = () => {
    setPanelType(PANEL_TYPES.STORE_LIST)
    setPlaceId(null)

    const { lat, lng, zoom } = mapCenter(map)

    if (keyword) {
      router.push(`/m/@${lat},${lng},${zoom}z?keyword=${keyword}`)
    } else {
      router.replace(`/m/@${lat},${lng},${zoom}z`)
    }

    if (!stores) {
      searchHints("")
    }
  }

  if (!store)
    return (
      <Container>
        <Skeleton />
      </Container>
    )

  return (
    <Container>
      <Header
        onClick={handleClose}
        placeId={store.placeId}
        isBookmark={store.isBookmark}
        url={store.url}
        onBookmarkUpdate={handleReviewSave}
      />
      <ImagePreview photos={store.photos} name={store.name} />
      <H3>{store.name}</H3>
      {store.tags.length > 0 && (
        <TagListContainer>
          <TagList tags={store.tags} />
        </TagListContainer>
      )}
      <OpenTime
        isOpenNow={store.isOpenNow}
        openingHours={store.openingHours}
        closeTime={store.closeTime}
      />
      <ListItem>
        <img src="/location.svg" alt="location" />
        <a href={store.url} target="_blank" rel="noreferrer">
          {store.address}
        </a>
      </ListItem>
      {store.website && (
        <ListItem>
          <img src="/global.svg" alt="global" />
          <a href={store.website} target="_blank" rel="noreferrer">
            {parseDomain(store.website)}
          </a>
        </ListItem>
      )}
      <ListItem>
        <img src="/phone.svg" alt="phone" />
        <a href={`tel:${store.phone}`}>{store.phone}</a>
      </ListItem>
      <Recommend good={store.recommendYes} bad={store.recommendNo} />
      <Reviews
        placeId={store.placeId}
        name={store.name}
        onSave={handleReviewSave}
        googleReviews={store.reviews}
      />
    </Container>
  )
}

function parseDomain(url) {
  const domain = new URL(url).hostname.replace("www.", "")
  return domain
}

export default StoreDetail

const Container = styled.div`
  flex-shrink: 0;
  width: 628px;
  position: relative;
  background-color: #ffffff;
  overflow: scroll;

  @media ${devices.mobileXl} {
    width: 100%;
  }
`

const TagListContainer = styled.div`
  padding: 0 41px 12px;

  @media ${devices.mobileXl} {
    padding: 0 24px;
  }
`

const H3 = styled.h3`
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 33px;
  color: #222120;
  padding: 0 48px 0 41px;

  @media ${devices.mobileXl} {
    padding: 0 24px;
    margin-bottom: 12px;
  }
`

const ListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 3px 41px;
  gap: 8px;

  span,
  a {
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    color: #222120;
    text-overflow: ellipsis;
  }

  @media ${devices.mobileXl} {
    padding: 3px 24px;
  }
`
