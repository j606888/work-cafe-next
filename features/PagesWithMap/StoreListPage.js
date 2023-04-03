import SearchStores from 'features/SearchStores'
import StoreList from 'features/StoreList'
import React from 'react'
import styled from 'styled-components'

const StoreListPage = () => {
  return (
    <Container>
      <ContentContainer>
        <SearchStores />
        <StoreListContainer>
          <StoreList />
        </StoreListContainer>
      </ContentContainer>
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  top: calc(40px + 80px);
  left: 0;
  bottom: 0;
  display: flex;

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
  overflow: auto;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 4;
    top: auto;
  }
`

const MapContainer = styled.div`
  flex: 1;

  /* width: ${({ isLanding }) => (isLanding ? "100%" : "calc(100% - 628px)")};
  height: calc(100% - 80px - 40px);
  position: fixed;
  top: calc(80px + 40px);
  right: 0;
  bottom: 0; */
  /* ${labelStyles}; */

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    position: fixed;
    width: 100%;
    height: calc(100% - 56px - 248px);
    top: 56px;
  }
`


export default StoreListPage
