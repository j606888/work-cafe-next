import React from "react"
import styled from "styled-components"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import StoreList from "features/StoreList"

const Container = styled.div`
  height: 100vh;
  background-color: #fff;
  width: ${props => props.theme.sidebarWidth};
`

const Head = styled.div`
  background-color: #1a73e8;
  color: #fff;
  padding: 0.5rem 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  width: ${props => props.theme.sidebarWidth};
  box-sizing: border-box;
`

const Bookmark = ({ bookmark, stores = [], onBack = () => {} }) => {
  return (
    <Container>
      <Head>
        <ArrowBackIcon sx={{ cursor: "pointer" }} onClick={onBack} />
        <h3>{bookmark.name}</h3>
      </Head>
      <StoreList stores={stores || []} />
    </Container>
  )
}

export default Bookmark