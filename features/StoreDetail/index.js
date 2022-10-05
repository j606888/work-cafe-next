import React from "react"
import CloseIcon from "@mui/icons-material/Close"
import RatingStars from "components/RatingStars"
import { Divider } from "@mui/material"
import ActionButton from "./ActionButton"
import {
  Container,
  CloseButton,
  MainInfo,
  ButtonGroup,
  GoogleReviews,
  StickyHeader,
  UploadPhotoContainer,
  ChipContainer,
} from "./styled"
import storeApi from "api/stores"
import SortIcon from "@mui/icons-material/Sort"
import GoogleReviewCard from "./GoogleReviewCard"
import "react-slideshow-image/dist/styles.css"
import ImageSlide from "./ImageSlide"
import Bookmarks from "./Bookmarks"
import useSWR from "swr"
import SecondaryInfo from "./SecondaryInfo"
import { userIsLogin } from "utils/user"
import useAuthCheck from "hooks/useAuthCheck"
import ReviewForm from "features/ReviewForm"
import ReviewsBlock from "./ReviewsBlock"
import ReviewCard from "./ReviewCard"
import StorePhotoUpload from "./StorePhotoUpload"
import Chip from "components/Chip"
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined"
import ReviewApi from "api/review"
import useStoreStore from "hooks/useStoreStore"
import { useState } from "react"
import NotCafeReport from "./NotCafeReport"
import Skeleton from "components/Skeleton"

const StoreDetail = ({
  placeId,
}) => {
  const setPlaceId = useStoreStore(state => state.setPlaceId)
  const authCheck = useAuthCheck()
  const [bookmarkAnchor, setBookmarkAnchor] = React.useState(null)
  const [openReview, setOpenReview] = React.useState(false)
  const [openNotCafe, setOpenNotCafe] = useState(false)
  const { data: store, mutate: mutateStore } = useSWR(
    `/stores/${placeId}`
  )
  const { data: bookmarks, mutate: mutateBookmarks } = useSWR(
    userIsLogin() ? `/stores/${placeId}/bookmarks` : null
  )
  const { data: reviews, mutate: reviewsMutate } = useSWR(
    `/stores/${placeId}/reviews`
  )
  const { data: myReview, mutate: myReviewMutate } = useSWR(
    userIsLogin() ? `/stores/${placeId}/reviews/me` : null
  )

  const refreshStore = () => {
    mutateStore()
  }
  const handleBookmarkSubmit = () => {
    mutateBookmarks()
  }
  const handleHide = async () => {
    authCheck()
    await storeApi.hideStore({ placeId })
    refreshStore()
  }
  const handleUnHide = async () => {
    authCheck()
    await storeApi.unhideStore({ placeId })
    refreshStore()
  }
  const handleClose = () => {
    setPlaceId(null)
  }
  const refreshReview = () => {
    mutateStore()
    reviewsMutate()
    myReviewMutate()
    refreshStore()
  }
  const handleOpenReview = () => {
    setOpenReview(true)
  }
  const handleFaceClick = (recommend) => {
    setOpenReview(recommend)
  }
  const handleOpenGoogle = () => {
    window.open(url)
  }
  const handleDeleteReview = async () => {
    await ReviewApi.deleteMyReview({ placeId })
    refreshStore()
    myReviewMutate()
  }
  const isSaved = bookmarks?.some((bookmark) => bookmark.isSaved)
  if (!store) return <Skeleton />

  return (
    <>
      <Container>
        <StickyHeader
        // showCardHead={showCardHead}
        >
          <span>{store.name}</span>
          <CloseButton onClick={handleClose}>
            <CloseIcon />
          </CloseButton>
        </StickyHeader>
        <ImageSlide photos={store.photos} />
        <MainInfo>
          <h3>{store.name}</h3>
          <div className="sub-info">
            <RatingStars rating={store.rating} />
            <span className="reviews">{store.userRatingsTotal} 則評論</span>
          </div>
          <button onClick={() => setOpenNotCafe(true)}>回報不是咖啡廳</button>
        </MainInfo>
        <Divider />
        <ButtonGroup>
          <ActionButton
            type="comment"
            text="評論"
            primary={store.isReview}
            onClick={handleOpenReview}
          />
          <ActionButton
            type="bookmark"
            text={isSaved ? "已儲存" : "儲存"}
            color={isSaved ? "#FB507D" : "#1B72E8"}
            primary={isSaved}
            onClick={(e) => setBookmarkAnchor(e.currentTarget)}
          />

          {store.isHide ? (
            <ActionButton
              type="hide"
              text="隱藏中"
              color="#90A4AE"
              primary
              onClick={handleUnHide}
            />
          ) : (
            <ActionButton type="show" text="顯示中" onClick={handleHide} />
          )}
          <ActionButton type="share" text="分享" onClick={() => onShare(id)} />
          <ActionButton
            type="navigate"
            text="導航"
            onClick={handleOpenGoogle}
          />
        </ButtonGroup>
        <Divider />
        <SecondaryInfo
          address={store.address}
          website={store.website}
          phone={store.phone}
          isOpenNow={store.isOpenNow}
          openingHours={store.openingHours}
        />
        <Divider />
        <UploadPhotoContainer>
          <StorePhotoUpload
            placeId={placeId}
            name={store.name}
            onSuccess={refreshStore}
          />
        </UploadPhotoContainer>
        <ReviewsBlock reviewReport={store.reviewReport} onClick={handleFaceClick} />
        <Divider />
        {store.myReview && (
          <>
            <GoogleReviews>
              <div className="review-header">
                <h4>你的評論</h4>
              </div>
              <ReviewCard
                {...store.myReview}
                noDivider
                isOwner
                onDelete={handleDeleteReview}
              />
            </GoogleReviews>
            <ChipContainer>
              <Chip text="編輯你的評論" onClick={handleOpenReview}>
                <RateReviewOutlinedIcon />
              </Chip>
            </ChipContainer>
            <Divider />
          </>
        )}
        <GoogleReviews>
          <div className="review-header">
            <h4>評論</h4>
          </div>
          {reviews?.reviews.map((review) => (
            <ReviewCard key={review.id} {...review} />
          ))}
        </GoogleReviews>
        <GoogleReviews>
          <div className="review-header">
            <h4>Google 評論</h4>
            <div className="sort">
              <SortIcon />
              <span>排序</span>
            </div>
          </div>
          {store.googleReviews?.map((review) => (
            <GoogleReviewCard key={review.authorName} {...review} />
          ))}
        </GoogleReviews>
      </Container>
      <Bookmarks
        placeId={placeId}
        anchorEl={bookmarkAnchor}
        onClose={() => setBookmarkAnchor(null)}
        bookmarks={bookmarks}
        onSubmit={handleBookmarkSubmit}
      />
      <ReviewForm
        placeId={placeId}
        open={openReview}
        name={store.name}
        onClose={() => setOpenReview(false)}
        onSave={refreshReview}
        isHide={store.isHide}
        myReview={myReview}
      />
      <NotCafeReport
        placeId={placeId}
        open={openNotCafe}
        onClose={() => setOpenNotCafe(false)}
      />
    </>
  )
}

export default StoreDetail
