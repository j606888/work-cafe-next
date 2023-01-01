import React, { useEffect } from "react"
import styled from "styled-components"
import useSWR from "swr"
import Skeleton from "components/Skeleton"
import Header from "./Header/Header"
import TagList from "../../components/TagList/TagList"
import Recommend from "./Recommend/Recommend"
import ImagePreview from "./ImagePreview/ImagePreview"
import { devices } from "constants/styled-theme"
import Reviews from "./Reviews/Reviews"
import OpenTime from "./OpenTime/OpenTime"
import useStoreStore from "stores/useStoreStore"
import shallow from "zustand/shallow"
import useStoreSWR from "stores/useStoreSWR"
import useMapControl, { WIDTH } from "stores/useMapControl"
import useHintSearch from "features/Searchbar/useHintSearch"

const StoreDetail = () => {
  const [placeId, setPlaceId] = useStoreStore(
    (state) => [state.placeId, state.setPlaceId],
    shallow
  )
  const setWidth = useMapControl((state) => state.setWidth)
  const { searchHints } = useHintSearch()

  const { data: stores } = useStoreSWR()
  const { data: store, mutate: mutateStore } = useSWR(`/stores/${placeId}`)

  function handleReviewSave() {
    mutateStore()
  }

  const handleClose = () => {
    setPlaceId(null)

    if (!stores) {
      searchHints("")
      setWidth(WIDTH.fullWidth)
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
        onBookmarkUpdate={mutateStore}
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
        <span>{store.phone}</span>
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
  width: 628px;
  position: relative;
  background-color: #ffffff;
  padding-bottom: 1px;

  @media ${devices.mobileXl} {
    width: 100%;
    padding: 1px 0;
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
