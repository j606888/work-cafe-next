import React from "react"
import { useState } from "react"
import { changeMode, updatePlaceId, updateStores } from "store/slices/store"
import { Container, Head, Tabs, Tab } from "./styled"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ReviewList from "./ReviewList"

const ContributeList = () => {
  const [tab, setTab] = useState("review")

  const handleClose = () => {
    dispatch(updateStores([]))
    dispatch(updatePlaceId(null))
    dispatch(changeMode("MAP"))
  }

  return (
    <Container>
      <Head>
        <ArrowBackIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
        <h3>你的貢獻</h3>
      </Head>
      <Tabs>
        <Tab active={tab === "review"} onClick={() => setTab("review")}>評論</Tab>
        <Tab active={tab === "storePhoto"} onClick={() => setTab("storePhoto")}>照片</Tab>
      </Tabs>
      {tab === "review" && (<ReviewList />)}
    </Container>
  )
}

export default ContributeList
