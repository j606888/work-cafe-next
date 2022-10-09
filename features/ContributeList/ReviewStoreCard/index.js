import { Avatar, Divider } from "@mui/material"
import React from "react"
import useTimeAgo from "hooks/useTimeAgo"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { Container, InfoBox, ScoreDateBox, MoreContainer } from "./styled"
import FaceIconGroup from "components/FaceIconGroup"
import useStoreStore from "stores/useStoreStore"

const FACE_MAP = {
  yes: "happy",
  normal: "normal",
  no: "bad",
}

const ReviewStoreCard = ({ store, recommend, description, createdAt }) => {
  const timeAgo = useTimeAgo()
  const setPlaceId = useStoreStore((state) => state.setPlaceId)
  const setBouncePlaceId = useStoreStore((state) => state.setBouncePlaceId)

  const handleClick = () => {
    setPlaceId(store.placeId)
  }
  const handleMouseEnter = () => {
    setBouncePlaceId(store.placeId)
  }
  const handleMouseLeave = () => {
    setBouncePlaceId(null)
  }

  return (
    <>
      <Container
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <InfoBox>
          <Avatar
            alt={"storename"}
            sx={{ width: 36, height: 36, mr: 1.5 }}
            src={store.imageUrl}
          />
          <div className="store-info">
            <span className="name">{store.name}</span>
            <span className="address">{store.address}</span>
          </div>
        </InfoBox>
        <ScoreDateBox>
          <FaceIconGroup mood={FACE_MAP[recommend]} />
          <span>{timeAgo(createdAt)}</span>
        </ScoreDateBox>
        <p>{description}</p>
        <MoreContainer>
          <MoreVertIcon />
        </MoreContainer>
      </Container>
      <Divider />
    </>
  )
}

export default ReviewStoreCard
