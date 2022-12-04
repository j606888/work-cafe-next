import React from "react"
import styled from "styled-components"
import useSWR from "swr"
import Skeleton from "components/Skeleton"
import Header from "./Header/Header"
import TagList from "../../components/TagList/TagList"
import Recommend from "./Recommend/Recommend"
import ImagePreview from "./ImagePreview/ImagePreview"
import { devices } from "constant/styled-theme"
import Reviews from "./Reviews/Reviews"
import OpenTime from "./OpenTime/OpenTime"

const StoreDetail = ({ placeId, onClose }) => {
  const { data: store, mutate: mutateStore } = useSWR(`/stores/${placeId}`)

  function handleReviewSave() {
    mutateStore()
  }

  if (!store) return <Skeleton />

  return (
    <Container>
      <Header
        onClick={onClose}
        placeId={store.placeId}
        isBookmark={store.isBookmark}
        url={store.url}
        onBookmarkUpdate={mutateStore}
      />
      <ImagePreview photos={store.photos} name={store.name} />
      <H3>{store.name}</H3>
      <TagListContainer>
        <TagList tags={store.tags} />
      </TagListContainer>
      <OpenTime
        isOpenNow={store.isOpenNow}
        openingHours={store.openingHours}
        closeTime={store.closeTime}
      />
      <ListItem>
        <img src="/location.svg" alt="location" />
        <a href={store.url} target="_blank" rel="noreferrer">{store.address}</a>
      </ListItem>
      <ListItem>
        <img src="/global.svg" alt="global" />
        <a href={store.website} target="_blank" rel="noreferrer">{parseDomain(store.website)}</a>
      </ListItem>
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
  const domain = (new URL(url)).hostname.replace('www.','');
  return domain
}

export default StoreDetail

const Container = styled.div`
  background-color: #fff;
  padding-bottom: 1px;
  padding: 14px 0;
`

const TagListContainer = styled.div`
  padding: 0 41px;

  @media ${devices.mobileXl} {
    margin: 8px 24px;
  }
`

const H3 = styled.h3`
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 33px;
  color: #222120;

  padding: 0 48px 0 41px;
`

const ListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 3px 41px;
  gap: 8px;

  span, a {
    font-family: 'Noto Sans';
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    color: #222120;
    text-overflow: ellipsis;
  }
`
