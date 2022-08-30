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
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import PublicIcon from "@mui/icons-material/Public"
import LocalPhoneIcon from "@mui/icons-material/LocalPhone"
import SortIcon from "@mui/icons-material/Sort"
import ReviewCard from "./ReviewCard"
import "react-slideshow-image/dist/styles.css"
import ImageSlide from "./ImageSlide"

const StoreDetail = () => {
  function handleClose() {}

  return (
    <Container>
      <CloseButton onClick={handleClose}>
        <CloseIcon />
      </CloseButton>
      <ImageSlide />
      <MainInfo>
        <h3>迷路小章魚</h3>
        <div className="sub-info">
          <RatingStars rating={4.0} />
          <span className="reviews">2,417 則評論</span>
        </div>
      </MainInfo>
      <Divider />
      <ButtonGroup>
        <ActionButton type="bookmark" text="儲存" primary />
        <ActionButton type="comment" text="評論" />
        <ActionButton text="不知道" />
        <ActionButton type="hide" text="隱藏" />
        <ActionButton type="share" text="分享" />
      </ButtonGroup>
      <Divider />
      <SecondaryInfo>
        <div>
          <PlaceIcon />
          <span>946屏東縣恆春鎮南灣路60號</span>
        </div>
        <div>
          <AccessTimeIcon />
          <span>已打烊 ⋅ 開始營業時間：週二 12:00 </span>
        </div>
        <div>
          <PublicIcon />
          <span>facebook.com</span>
        </div>
        <div>
          <LocalPhoneIcon />
          <span>08 888 2822</span>
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
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
      </Reviews>
    </Container>
  )
}

export default StoreDetail
