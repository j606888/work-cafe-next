import React from "react"
import { useState } from "react"
import { Container, Head, Tabs, Tab } from "./styled"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ReviewList from "./ReviewList"
import StorePhotoList from "./StorePhotoList"
import useMapStore from "hooks/useMapStore"

const ContributeList = () => {
  const setMode = useMapStore(state => state.setMode)
  const clearStores = useMapStore(state => state.clearStores)
  const setPlaceId = useMapStore(state => state.setPlaceId)
  const [tab, setTab] = useState("review")

  const handleClose = () => {
    clearStores()
    setPlaceId(null)
    setMode("MAP")
  }

  const handleChangeTab = (targetTab) => {
    clearStores()
    setPlaceId(null)
    setTab(targetTab)
  }

  return (
    <Container>
      <Head>
        <ArrowBackIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
        <h3>你的貢獻</h3>
      </Head>
      <Tabs>
        <Tab active={tab === "review"} onClick={() => handleChangeTab("review")}>評論</Tab>
        <Tab active={tab === "storePhoto"} onClick={() => handleChangeTab("storePhoto")}>照片</Tab>
      </Tabs>
      {tab === "review" && (<ReviewList />)}
      {tab === "storePhoto" && (<StorePhotoList />)}
    </Container>
  )
}

export default ContributeList
