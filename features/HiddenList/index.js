import React, { useEffect } from "react"
import useSWR from "swr"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import StoreList from "features/StoreList"
import { Container, Head } from "./styled"
import useMapStore from "hooks/useMapStore"
import useStoreStore from "stores/useStoreStore"

const HiddenList = () => {
  const setMode = useMapStore(state => state.setMode)
  const clearStores = useStoreStore(state => state.clearStores)
  const setStores = useStoreStore(state => state.setStores)
  const setPlaceId = useStoreStore(state => state.setPlaceId)
  const { data: stores } = useSWR("/stores/hidden")

  useEffect(() => {
    if (stores) {
      setStores(stores)
    } else {
      clearStores()
    }
  }, [stores])

  const handleClose = () => {
    clearStores
    setPlaceId(null)
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
