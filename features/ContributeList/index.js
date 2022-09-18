import React from "react"
import { useState } from "react"
import { changeMode, updatePlaceId, updateStores } from "store/slices/store"
import { Container, Head, Tabs, Tab } from "./styled"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ReviewList from "./ReviewList"
import StorePhotoList from "./StorePhotoList"
import { useDispatch } from "react-redux"

const ContributeList = () => {
  const [tab, setTab] = useState("review")
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(updateStores([]))
    dispatch(updatePlaceId(null))
    dispatch(changeMode("MAP"))
  }

  const handleChangeTab = (targetTab) => {
    dispatch(updateStores([]))
    dispatch(updatePlaceId(null))
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
