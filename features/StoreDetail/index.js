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
import useSWR, { useSWRConfig } from "swr"
import { fetcher } from "api"
import SecondaryInfo from "./SecondaryInfo"
import { useDispatch } from "react-redux"
import { updatePlaceId } from "store/slices/store"
import { userIsLogin } from "utils/user"
import useAuthCheck from "hooks/useAuthCheck"
import ReviewForm from "features/ReviewForm"
import ReviewsBlock from "./ReviewsBlock"
import ReviewCard from "./ReviewCard"
import StorePhotoUpload from "./StorePhotoUpload"
import { useEffect } from "react"
import Chip from "components/Chip"
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined"

const StoreDetail = ({
  id,
  placeId,
  name,
  rating,
  userRatingsTotal,
  isOpenNow,
  address,
  website,
  phone,
  url,
  isHide,
  isReview,
  showCardHead = false,
  photos = [],
  reviewReport = {},
  reviews: googleReviews = [],
  openingHours = [],
  onShare = () => {},
  onRefresh = () => {},
}) => {
  const { mutate } = useSWRConfig()
  const authCheck = useAuthCheck()
  const [bookmarkAnchor, setBookmarkAnchor] = React.useState(null)
  const [openReview, setOpenReview] = React.useState(false)
  const { data: bookmarks } = useSWR(
    userIsLogin() ? `/stores/${placeId}/bookmarks` : null,
    fetcher
  )
  const { data: reviews, mutate: reviewsMutate } = useSWR(
    `/stores/${placeId}/reviews`,
    fetcher
  )
  const { data: myReview, mutate: myReviewMutate } = useSWR(
    `/stores/${placeId}/reviews/me`,
    fetcher
  )
  const dispatch = useDispatch()

  const handleBookmarkSubmit = () => {
    mutate(`/stores/${placeId}/bookmarks`)
  }
  const handleHide = async () => {
    authCheck()
    await storeApi.hideStore({ placeId })
    onRefresh(placeId)
  }
  const handleUnHide = async () => {
    authCheck()
    await storeApi.unhideStore({ placeId })
    onRefresh(placeId)
  }
  const handleClose = () => {
    dispatch(updatePlaceId(null))
  }
  const refreshReview = () => {
    reviewsMutate()
    myReviewMutate()
    onRefresh(placeId)
  }
  const handleOpenReview = () => {
    authCheck()
    setOpenReview(true)
  }
  const handleFaceClick = (recommend) => {
    authCheck()
    setOpenReview(recommend)
  }
  const handleOpenGoogle = () => {
    window.open(url)
  }
  const isSaved = bookmarks?.some((bookmark) => bookmark.isSaved)

  return (
    <>
      <Container>
        <StickyHeader showCardHead={showCardHead}>
          <span>{name}</span>
          <CloseButton onClick={handleClose}>
            <CloseIcon />
          </CloseButton>
        </StickyHeader>
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
            type="comment"
            text="評論"
            primary={isReview}
            onClick={handleOpenReview}
          />
          <ActionButton
            type="bookmark"
            text={isSaved ? "已儲存" : "儲存"}
            color={isSaved ? "#FB507D" : "#1B72E8"}
            primary={isSaved}
            onClick={(e) => setBookmarkAnchor(e.currentTarget)}
          />

          {isHide ? (
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
          address={address}
          website={website}
          phone={phone}
          isOpenNow={isOpenNow}
          openingHours={openingHours}
        />
        <Divider />
        <UploadPhotoContainer>
          <StorePhotoUpload
            placeId={placeId}
            name={name}
            onSuccess={() => onRefresh(placeId)}
          />
        </UploadPhotoContainer>
        <ReviewsBlock reviewReport={reviewReport} onClick={handleFaceClick} />
        <Divider />
        {myReview && (
          <>
            <GoogleReviews>
              <div className="review-header">
                <h4>你的評論</h4>
              </div>
              <ReviewCard {...myReview} noDivider />
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
          {googleReviews.map((review) => (
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
        name={name}
        onClose={() => setOpenReview(false)}
        onSave={refreshReview}
        isHide={isHide}
        myReview={myReview}
      />
    </>
  )
}

export default StoreDetail
