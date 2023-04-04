import SearchHere from "components/Button/SearchHere"
import GoogleMap from "features/GoogleMap"
import { labelStyles } from "features/GoogleMap/labelStyles"
import MyLocationMarker from "features/GoogleMap/MyLocationMarker"
import ShowLabelCheckbox from "features/GoogleMap/ShowLabelCheckbox"
import StoreMarkers from "features/GoogleMap/StoreMarkers"
import Header from "features/Header"
import MyPosition from "features/MyPosition"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import styled, { css } from "styled-components"

const MapStyle = {
  homePage: css`
    left: 0;

    @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      display: none;
    }
  `,
  storeList: css`
    @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      left: 0;
      top: 56px;
      bottom: 240px;
      height: auto;
    }
  `,
  storeDetail: css`
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
  const { pathname } = router
  const [mapStyle, setMapStyle] = useState("homePage")
  const mapEnabled = mapStyle !== "homePage"

  useEffect(() => {
    if (pathname === "/map") {
      setMapStyle("homePage")
    } else if (pathname === "/map/place/[placeId]/[location]") {
      setMapStyle("storeDetail")
    } else {
      setMapStyle("storeList")
    }
  }, [pathname])

  return (
    <>
      <Header />
      {children}
      <GoogleMapContainer cssStyle={mapStyle}>
        {mapEnabled && (
          <>
            <SearchHere />
            <ShowLabelCheckbox />
          </>
        )}
        <GoogleMap>
          {mapEnabled && (
            <>
              <StoreMarkers />
              <MyLocationMarker />
              <MyPosition />
            </>
          )}
        </GoogleMap>
      </GoogleMapContainer>
    </>
  )
}

const GoogleMapContainer = styled.div`
  ${labelStyles};
  position: fixed;
  top: 120px;
  left: 628px;
  right: 0;
  bottom: 0;
  z-index: -1;
  height: calc(100% - 80px - 40px);
  ${({ cssStyle }) => MapStyle[cssStyle]}
`
