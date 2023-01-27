import React, { useRef, useReducer } from "react"
import styled from "styled-components"
import MyLocation from "features/MyLocation"
import ControlPanel from "./ControlPanel"
import SearchDialog from "./SearchDialog"
import Circle from "./Circle"
import { createCrawlRecord } from "api/map-crawlers"
import GoogleMap from "features/GoogleMap"
import { Marker } from "@react-google-maps/api"

const Container = styled.div`
  position: relative;
  height: calc(100vh - 64px);
  z-index: -2;
`

const MyLocationContainer = styled.div`
  position: absolute;
  right: 0.5rem;
  bottom: 7rem;
`

const INITIAL_STATE = {
  showArea: true,
  showModal: false,
  searchRadius: 100,
}

const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_AREA":
      return {
        ...state,
        showArea: !state.showArea,
      }
    case "TOGGLE_MODAL":
      return {
        ...state,
        showModal: !state.showModal,
      }
    case "UPDATE_SEARCH_RADIUS":
      return {
        ...state,
        searchRadius: action.payload.radius,
      }
    default:
      throw new Error("Action not exist")
  }
}

const AdminStoreCrawler = () => {
  const [controls, dispatch] = useReducer(reducer, INITIAL_STATE)
  const tempRef = useRef(null)
  // const { data: mapCrawlers } = useSWR(
  //   ["/admin/map-crawlers", { ...center, limit: 50 }],
  //   fetcher,
  //   { use: [laggy] }
  // )

  const handleFindMe = ({ lat, lng }) => {
    const center = { lat, lng }
    map.setZoom(15)
    // map.panTo(center)
  }

  const handleSearch = async () => {
    const crawlRecord = {
      ...tempRef.current,
      radius: controls.searchRadius,
    }
    await createCrawlRecord(crawlRecord)
    dispatch({ type: "TOGGLE_MODAL" })
  }

  const handleClick = ({ latLng }) => {
    tempRef.current = latLng.toJSON()
    dispatch({ type: "TOGGLE_MODAL" })
  }

  if (!isReady) return <div>NotReady</div>

  return (
    <Container>
      <ControlPanel
        show={controls.showArea}
        setShow={() => dispatch({ type: "TOGGLE_AREA" })}
        radius={controls.searchRadius}
        setRadius={(radius) =>
          dispatch({ type: "UPDATE_SEARCH_RADIUS", payload: { radius } })
        }
      />
      <SearchDialog
        open={controls.showModal}
        handleClose={() => dispatch({ type: "TOGGLE_MODAL" })}
        handleSearch={handleSearch}
      />
      <MyLocationContainer>
        <MyLocation onClick={handleFindMe} />
      </MyLocationContainer>
      <GoogleMap
        onClick={handleClick}
        mapSettings={mapSettings}
        style={{
          width: "100%",
          height: "90vh",
        }}
      >
        {controls.showModal && tempRef.current && (
          <Circle
            mapCrawler={{ ...tempRef.current, radius: controls.searchRadius }}
          />
        )}
        {controls.showArea &&
          mapCrawlers?.map((mapCrawler) => (
            <Circle key={mapCrawler.id} mapCrawler={mapCrawler} />
          ))}
        {mapCrawlers?.map((mapCrawler) => (
          <Marker
            key={mapCrawler.id}
            position={{
              lat: mapCrawler.lat,
              lng: mapCrawler.lng,
            }}
            label={{
              text: `${mapCrawler.newStoreCount}`,
              fontWeight: "bold",
            }}
          />
        ))}
      </GoogleMap>
    </Container>
  )
}

export default AdminStoreCrawler
