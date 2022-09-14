import { fetcher } from "api"
import React from "react"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { changeMode, updateFocusPlaceId, updatePlaceId, updateStores } from "store/slices/store"
import useSWR from "swr"
import { Container, Head, ListContainer } from "./styled"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ReviewStoreCard from "./ReviewStoreCard"

const ReviewList = () => {
  const { data } = useSWR("/reviews", fetcher)
  const dispatch = useDispatch()

  useEffect(() => {
    const stores = data?.reviews.map((review) => review.store)
    dispatch(updateStores(stores || []))
  }, [dispatch, data])

  const handleClose = () => {
    dispatch(updateStores([]))
    dispatch(updatePlaceId(null))
    dispatch(changeMode("MAP"))
  }
  const handleClick = (placeId) => {
    dispatch(updatePlaceId(placeId))
  }
  const handleMouseEnter = (placeId) => {
    dispatch(updateFocusPlaceId(placeId))
  }
  const handleMouseLeave = (_placeId) => {
    dispatch(updateFocusPlaceId(null))
  }


  return (
    <Container>
      <Head>
        <ArrowBackIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
        <h3>你的評論</h3>
      </Head>
      <ListContainer>
        {data?.reviews.map((review) => (
          <ReviewStoreCard key={review.id} {...review} 
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        ))}
      </ListContainer>
    </Container>
  )
}

export default ReviewList
