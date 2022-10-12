import React from "react"
import styled from "styled-components"
import useSWR from "swr"
import Skeleton from "components/Skeleton";
import Header from "./Header/Header";
import TagList from "./TagList/TagList";
import TimeAndAddress from "./TimeAndAddress/TimeAndAddress";
import Recommend from "./Recommend/Recommend";
import ImagePreview from "./ImagePreview/ImagePreview";

const Container = styled.div`
  background-color: #fff;

  padding-bottom: 1px;
`

const StoreDetailV2 = ({ placeId, onClose }) => {
  const { data: store, mutate: mutateStore } = useSWR(
    `/stores/${placeId}`
  )

  if (!store) return <Skeleton />

  return <Container>
    <Header name={store.name} onClick={onClose}/>
    <TagList />
    <TimeAndAddress
      address={store.address}
      // website={store.website}
      // phone={store.phone}
      isOpenNow={store.isOpenNow}
      openingHours={store.openingHours}
      url={store.url}
    />
    <Recommend />
    <ImagePreview photos={store.photos} />
  </Container>
}

export default StoreDetailV2
