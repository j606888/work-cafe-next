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
  Reviews,
} from "./styled"
import storeApi from "api/stores"
import SortIcon from "@mui/icons-material/Sort"
import ReviewCard from "./ReviewCard"
import "react-slideshow-image/dist/styles.css"
import ImageSlide from "./ImageSlide"
import Bookmarks from "./Bookmarks"
import useSWR, { useSWRConfig } from "swr"
import { fetcher } from "api"
import SecondaryInfo from "./SecondaryInfo"
import { useDispatch } from "react-redux"
import { updateStore } from "store/slices/store"
import { userIsLogin } from "utils/user"
import useAuthCheck from "hooks/useAuthCheck"
import ReviewForm from "features/ReviewForm"
import ReviewsBlock from "./ReviewsBlock"

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
  // const { data: reviews } = useSWR(`/stores/${placeId}/reviews`, fetcher)
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
    dispatch(updateStore(null))
  }
  const refreshReview = () => {
    onRefresh(placeId)
  }
  const handleOpenReview = () => {
    authCheck()
    setOpenReview(true)
  }
  const handleOpenGoogle = () => {
    window.open(url)
  }
  const isSaved = bookmarks?.some((bookmark) => bookmark.isSaved)

  return (
    <>
      <Container>
        <CloseButton onClick={handleClose}>
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
            type="comment"
            text="評論"
            primary
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
        <ReviewsBlock reviewReport={reviewReport} />
        <Divider />
        <Reviews>
          <div className="review-header">
            <h4>評論</h4>
            <div className="sort">
              <SortIcon />
              <span>排序</span>
            </div>
          </div>
          {googleReviews.map((review) => (
            <ReviewCard key={review.authorName} {...review} />
          ))}
        </Reviews>
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
      />
    </>
  )
}

export default StoreDetail
