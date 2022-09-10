import Drawer from "features/Drawer"
import React from "react"
import styled from "styled-components"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import CardList from "features/Drawer/CardList"

const Container = styled.div`
  height: 100vh;
  background-color: #fff;
  width: 428px;
`

const Head = styled.div`
  background-color: #1a73e8;
  color: #fff;
  padding: 0.5rem 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`

const BookmarkStore = ({ stores = [], onClick = () => {} }) => {
  const handleClick = () => {
    onClick()
  }
  return (
    <Container>
      <Head>
        <ArrowBackIcon sx={{ cursor: "pointer" }} onClick={handleClick} />
        <h3>已儲存</h3>
      </Head>
      <CardList stores={stores} onClick={handleClick} />
    </Container>
  )
}

export default BookmarkStore
