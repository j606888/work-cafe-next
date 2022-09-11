import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import useSWR from "swr"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { updateStores, changeMode } from "store/slices/store"
import { fetcher } from "api"
import StoreListV2 from "features/StoreListV2"
import { Container, Head } from "./styled"

const HiddenListV2 = () => {
  const { data: stores } = useSWR("/stores/hidden", fetcher)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateStores(stores || []))
  }, [dispatch, stores])

  const handleClose = () => {
    dispatch(updateStores([]))
    dispatch(changeMode("MAP"))
  }

  return (
    <Container>
      <Head>
        <ArrowBackIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
        <h3>隱藏店家</h3>
      </Head>
      <StoreListV2 stores={stores || []} />
    </Container>
  )
}

export default HiddenListV2
