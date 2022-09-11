import React from "react"
import styled from "styled-components"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import StoreListV2 from "features/StoreListV2"

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
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  width: 428px;
  box-sizing: border-box;
`

const Bookmark = ({ stores = [], onBack = () => {} }) => {

  return (
    <Container>
      <Head>
        <ArrowBackIcon sx={{ cursor: "pointer" }} onClick={onBack} />
        <h3>已儲存</h3>
      </Head>
      <StoreListV2 stores={stores || []} />
    </Container>
  )
}

export default Bookmark
