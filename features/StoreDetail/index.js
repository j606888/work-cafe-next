import React from "react"
import styled from "styled-components"
import CloseIcon from "@mui/icons-material/Close"
import RatingStars from "components/RatingStars"
import { Divider } from "@mui/material"
import ActionButton from "./ActionButton"
import {
  Container,
  CloseButton,
  MainInfo,
  ButtonGroup,
  SecondaryInfo,
  Reviews,
} from "./styled"
import PlaceIcon from "@mui/icons-material/Place"
import PublicIcon from "@mui/icons-material/Public"
import LocalPhoneIcon from "@mui/icons-material/LocalPhone"
import SortIcon from "@mui/icons-material/Sort"
import ReviewCard from "./ReviewCard"
import "react-slideshow-image/dist/styles.css"
import ImageSlide from "./ImageSlide"
import OpeningTime from "./OpeningTime"

const StoreDetail = ({
  id,
  placeId,
  name,
  rating,
  userRatingsTotal,
  address,
  website,
  phone,
  isHide,
  photos = [],
  reviews = [],
  openingHours = [],
  onSave = () => {},
  onReview = () => {},
  onHide = () => {},
  onUnhide = () => {},
  onShare = () => {},
  onClose = () => {},
}) => {
  return (
    <Container>
      <CloseButton onClick={onClose}>
        <CloseIcon />
      </CloseButton>
      <ImageSlide photos={photos} />
      <MainInfo>
        <h3>{name}</h3>
        <div className="sub-info">
          <RatingStars rating={rating} />
          <span className="reviews">{userRatingsTotal} 則評論</span>
        </div>
      </MainInfo>
      <Divider />
      <ButtonGroup>
        <ActionButton
          type="bookmark"
          text="儲存"
          primary
          onClick={() => onSave(id)}
        />
        <ActionButton type="comment" text="評論" onClick={() => onReview(id)} />
        <ActionButton text="不知道" />
        {isHide ? (
          <ActionButton
            type="show"
            text="恢復"
            onClick={() => onUnhide(placeId)}
          />
        ) : (
          <ActionButton
            type="hide"
            text="隱藏"
            onClick={() => onHide(placeId)}
          />
        )}

        <ActionButton type="share" text="分享" onClick={() => onShare(id)} />
      </ButtonGroup>
      <Divider />
      <SecondaryInfo>
        <div>
          <PlaceIcon />
          <span>{address}</span>
        </div>
        <div>
          <OpeningTime openingHours={openingHours} />
        </div>
        <div>
          <PublicIcon />
          <span>{website}</span>
        </div>
        <div>
          <LocalPhoneIcon />
          <span>{phone}</span>
        </div>
      </SecondaryInfo>
      <Divider />
      <Reviews>
        <div className="review-header">
          <h4>評論</h4>
          <div className="sort">
            <SortIcon />
            <span>排序</span>
          </div>
        </div>
        {reviews.map((review) => (
          <ReviewCard key={review.authorName} {...review} />
        ))}
      </Reviews>
    </Container>
  )
}

export default StoreDetail
