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
import { updateStore } from 'store/slices/store'
import { userIsLogin } from "utils/user"
import useAuthCheck from "hooks/useAuthCheck"
import ReviewForm from "features/ReviewForm"

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
  isHide,
  photos = [],
  reviews = [],
  openingHours = [],
  onReview = () => {},
  onHide = () => {},
  onUnhide = () => {},
  onShare = () => {},
}) => {
  const { mutate } = useSWRConfig()
  const authCheck = useAuthCheck()
  const [bookmarkAnchor, setBookmarkAnchor] = React.useState(null)
  const [openReview, setOpenReview] = React.useState(false)
  const { data: bookmarks } = useSWR(userIsLogin() ? `/stores/${placeId}/bookmarks` : null, fetcher)
  const dispatch = useDispatch()

  const handleBookmarkSubmit = () => {
    mutate(`/stores/${placeId}/bookmarks`)
  }
  const handleHide = async () => {
    authCheck()
    await storeApi.hideStore({ placeId })
    onHide(placeId)
  }
  const handleUnHide = async () => {
    authCheck()
    await storeApi.unhideStore({ placeId })
    onUnhide(placeId)
  }
  const handleClose = () => {
    dispatch(updateStore(null))
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
            onClick={() => setOpenReview(true)}
          />
          <ActionButton
            type="bookmark"
            text={isSaved ? "已儲存" : "儲存"}
            color={isSaved ? "#FB507D" : "#1B72E8"}
            primary={isSaved}
            onClick={(e) => setBookmarkAnchor(e.currentTarget)}
          />
          {/* <ActionButton text="不知道" /> */}
          {isHide ? (
            <ActionButton type="show" text="恢復" onClick={handleUnHide} />
          ) : (
            <ActionButton type="hide" text="隱藏" onClick={handleHide} />
          )}

          <ActionButton type="share" text="分享" onClick={() => onShare(id)} />
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
      />
    </>
  )
}

export default StoreDetail
