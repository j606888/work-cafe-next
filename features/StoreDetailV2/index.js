import React from "react"
import styled from "styled-components"
import useSWR from "swr"
import Skeleton from "components/Skeleton"
import Header from "./Header/Header"
import TagList from "../../components/TagList/TagList"
import TimeAndAddress from "./TimeAndAddress/TimeAndAddress"
import Recommend from "./Recommend/Recommend"
import ImagePreview from "./ImagePreview/ImagePreview"
import { devices } from "constant/styled-theme"
import Reviews from "./Reviews/Reviews"
import OpenTime from "./OpenTime/OpenTime"

const Container = styled.div`
  background-color: #fff;
  padding-bottom: 1px;

  @media ${devices.iphoneSE} {
    min-height: 100vh;
  }
`

const TagListContainer = styled.div`
  margin-left: 104px;

  @media ${devices.iphoneSE} {
    margin: 8px 24px;
  }
`
const StoreDetailV2 = ({ placeId, onClose }) => {
  const { data: store, mutate: mutateStore } = useSWR(`/stores/${placeId}`)

  function handleReviewSave() {
    mutateStore()
  }

  if (!store) return <Skeleton />

  return (
    <Container>
      <Header name={store.name} onClick={onClose} placeId={store.placeId} />
      <TagListContainer>
        <TagList tags={store.tags} />
      </TagListContainer>
      <OpenTime
        isOpenNow={store.isOpenNow}
        openingHours={store.openingHours}
        closeTime={store.closeTime}
      />
      <TimeAndAddress
        address={store.address}
        // website={store.website}
        // phone={store.phone}
        isOpenNow={store.isOpenNow}
        openingHours={store.openingHours}
        url={store.url}
      />
      <Recommend good={store.recommendYes} bad={store.recommendNo} />
      <ImagePreview photos={store.photos} />
      <Reviews
        placeId={store.placeId}
        name={store.name}
        onSave={handleReviewSave}
        googleReviews={store.reviews}
      />
    </Container>
  )
}

export default StoreDetailV2