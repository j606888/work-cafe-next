import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import useSWR from "swr"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { updateStores, updatePlaceId } from "store/slices/store"
import StoreList from "features/StoreList"
import { Container, Head } from "./styled"
import useMapStore from "hooks/useMapStore"

const HiddenList = () => {
  const setMode = useMapStore(state => state.setMode)
  const { data: stores } = useSWR("/stores/hidden")
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateStores(stores || []))
  }, [dispatch, stores])

  const handleClose = () => {
    dispatch(updateStores([]))
    dispatch(updatePlaceId(null))
    setMode("MAP")
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
