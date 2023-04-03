import GoogleMap from "features/GoogleMap"
import Header from "features/Header"
import { useRouter } from "next/router"
import styled, { css } from "styled-components"

const MapStyle = {
  homePage: css`
    width: 100%;
    height: calc(100% - 80px - 40px);
    position: fixed;
    top: 120px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;

    @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      display: none;
    }
  `,
  storeList: css`
    position: fixed;
    height: calc(100% - 80px - 40px);
    left: 628px;
    right: 0;
    bottom: 0;
    z-index: -1;

    @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      left: 0;
      top: 56px;
      bottom: 240px;
      height: auto;
    }
  `,
  storeDetail: css`
    position: fixed;
    height: calc(100% - 80px - 40px);
    left: 628px;
    right: 0;
    bottom: 0;
    z-index: -1;

    @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      height: 1px;
      width: 1px;
      top: 0;
      left: 0;
      right: auto;
      bottom: auto;
    }
  `,
}

export function LayoutUser({ children }) {
  const router = useRouter()
  const { slug } = router.query

  if (!router.isReady) return null

  let style = null
  if (slug === undefined) {
    style = "homePage"
  } else if (slug[0] === "place") {
    style = "storeDetail"
  } else {
    style = "storeList"
  }
  return (
    <>
      <Header />
      {children}
      <GoogleMapContainer cssStyle={style}>
        <GoogleMap></GoogleMap>
      </GoogleMapContainer>
    </>
  )
}

const GoogleMapContainer = styled.div`
  ${({ cssStyle }) => MapStyle[cssStyle]}
  /* width: ${({ isLanding }) => (isLanding ? "100%" : "calc(100% - 628px)")};
  height: calc(100% - 80px - 40px);
  position: fixed;
  top: calc(80px + 40px);
  right: 0;
  bottom: 0;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    position: fixed;
    width: 100%;
    height: ${({ isLanding }) =>
      isLanding ? "calc(100% - 56px)" : "calc(100% - 56px - 248px)"};
    top: 56px;
  } */
`
