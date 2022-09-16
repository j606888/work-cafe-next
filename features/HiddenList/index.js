import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import useSWR from "swr"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { updateStores, changeMode, updatePlaceId } from "store/slices/store"
import { fetcher } from "api"
import StoreList from "features/StoreList"
import { Container, Head } from "./styled"

const HiddenList = () => {
  const { data: stores } = useSWR("/stores/hidden", fetcher)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateStores(stores || []))
  }, [dispatch, stores])

  const handleClose = () => {
    dispatch(updateStores([]))
    dispatch(updatePlaceId(null))
    dispatch(changeMode("MAP"))
  }

  return (
    <Container>
      <Head>
        <ArrowBackIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
        <h3>隱藏店家</h3>
      </Head>
      <StoreList stores={stores || []} />
    </Container>
  )
}

export default HiddenList
