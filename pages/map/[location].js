import SearchStores from "features/SearchStores"
import StoreList from "features/StoreList"
import { LayoutUser } from "layout/user"
import Head from "next/head"
import React from "react"
import styled from "styled-components"

const StoreListPage = () => {
  return (
    <>
      <Head>
        <title>Work Cafe | Taiwan</title>
        <link rel="icon" href="/v2/face-green.svg" type="image/svg" />
        <meta name="description" content="Work Cafe - Taiwan" />
      </Head>
      <Container>
        <ContentContainer>
          <SearchStores />
          <StoreListContainer>
            <StoreList />
          </StoreListContainer>
        </ContentContainer>
      </Container>
    </>
  )
}

StoreListPage.PageLayout = LayoutUser

const Container = styled.div`
  position: fixed;
  top: calc(40px + 80px);
  left: 0;
  bottom: 0;
  display: flex;
  background-color: #ffffff;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    top: 56px;
  }
`

const ContentContainer = styled.div`
  width: 628px;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    z-index: -2;
  }
`

const StoreListContainer = styled.div`
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 0;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 4;
    top: auto;
  }
`

export default StoreListPage
