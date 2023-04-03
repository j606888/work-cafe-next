import StoreDetail from "features/StoreDetail"
import { LayoutUser } from "layout/user"
import { useRouter } from "next/router"
import React from "react"
import styled from "styled-components"
import useSWR from "swr"

const StoreDetailPage = () => {
  const { asPath } = useRouter()
  const match = asPath.match(/\/map\/place\/([^\/]+)/)
  const placeId = match && match[1]
  const { data: store } = useSWR(placeId ? `/stores/${placeId}` : null)

  return (
    <Container>
      <ContentContainer>
        <StoreDetail store={store} />
      </ContentContainer>
    </Container>
  )
}

StoreDetailPage.PageLayout = LayoutUser

const Container = styled.div`
  position: fixed;
  top: calc(40px + 80px);
  left: 0;
  bottom: 0;
  display: flex;
  background-color: #FFFFFF;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    top: 56px;
    width: 100%;
    overflow-x: auto;
  }
`

const ContentContainer = styled.div`
  width: 628px;
  display: flex;
  flex-direction: column;
  z-index: 10;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
  }
`

const StoreListContainer = styled.div`
  overflow: auto;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-x: auto;
  }
`

const MapContainer = styled.div`
  flex: 1;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    position: fixed;
    width: 100%;
    height: calc(100% - 56px - 248px);
    top: 56px;
  }
`

export default StoreDetailPage
