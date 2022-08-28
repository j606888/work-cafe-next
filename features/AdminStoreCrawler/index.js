import GoogleMapWrapper from "features/GoogleMapWrapper"
import React, { useRef } from "react"
import { useEffect, useState, useReducer } from "react"
import styled from "styled-components"
import ControlPanel from "./ControlPanel"
import SearchDialog from "./SearchDialog"
import Router, { useRouter } from "next/router"
import Circle from "./Circle"
import { createCrawlRecord, getCrawlRecords } from "api/map-crawlers"
import { getCurrentPosition } from "utils/navigator"

const Container = styled.div`
  position: relative;
`

const INITIAL_STATE = {
  showArea: true,
  showModal: false,
  allowRefresh: false,
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
    case "TOGGLE_REFRESH":
      return {
        ...state,
        allowRefresh: action.payload.refresh,
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
  const [mapCrawlers, setMapCrawlers] = useState([])
  const [map, setMap] = useState(null)
  const [tempOptions, setTempOptions] = useState(null)
  const [controls, dispatch] = useReducer(reducer, INITIAL_STATE)
  const myLocation = useRef(null)
  const tempRef = useRef(null)
  const centerRef = useRef({
    lat: 23.546162,
    lng: 120.6402133,
    zoom: 8,
  })
  const router = useRouter()

  // useEffect(() => {
  //   async function trySetLocation() {
  //     const already = await alreadyGranted()
  //     if (!already) return

  //     const { lat, lng } = await getCurrentPosition()
  //     setMyLocation({
  //       lat,
  //       lng,
  //       zoom: 14,
  //     })
  //   }

  //   trySetLocation()
  // }, [])

  const handleFineMe = async () => {
    if (!myLocation.current) {
      const { lat, lng } = await getCurrentPosition()
      myLocation.current = {
        lat,
        lng,
      }
    }

    map.setCenter(myLocation.current)
    map.setZoom(14)
  }

  const handleSearch = async () => {
    const crawlRecord = {
      ...tempRef.current,
      radius: controls.searchRadius,
    }
    await createCrawlRecord(crawlRecord)
    dispatch({ type: "TOGGLE_MODAL" })
  }

  const handleOnClick = ({ lat, lng }) => {
    tempRef.current = { lat, lng }
    dispatch({ type: "TOGGLE_MODAL" })
  }

  const handleOnIdle = (center) => {
    centerRef.current = center
    Router.push({ query: center })
    dispatch({ type: "TOGGLE_REFRESH", payload: { refresh: true } })
  }

  const callAPI = async () => {
    const data = await getCrawlRecords(centerRef.current)
    setMapCrawlers(data)
    dispatch({ type: "TOGGLE_REFRESH", payload: { refresh: false } })
  }

  useEffect(() => {
    const query = router.query

    if (query.lng && query.lat && query.zoom) {
      const { lng, lat, zoom } = query
      centerRef.current = {
        lat: +lat,
        lng: +lng,
        zoom: +zoom,
      }
    }
    callAPI()
  }, [])

  const circles = mapCrawlers.map((mapCrawler) => (
    <Circle key={mapCrawler.id} mapCrawler={mapCrawler} />
  ))

  return (
    <Container>
      <ControlPanel
        show={controls.showArea}
        setShow={() => dispatch({ type: "TOGGLE_AREA" })}
        radius={controls.searchRadius}
        setRadius={(radius) =>
          dispatch({ type: "UPDATE_SEARCH_RADIUS", payload: { radius } })
        }
        handleReload={() => callAPI()}
        showButton={controls.allowRefresh}
        handleFindMe={() => handleFineMe()}
      />
      <SearchDialog
        open={controls.showModal}
        handleClose={() => dispatch({ type: "TOGGLE_MODAL" })}
        handleSearch={handleSearch}
      />
      <GoogleMapWrapper
        map={map}
        setMap={setMap}
        onClick={handleOnClick}
        onIdle={handleOnIdle}
        marginTop="80px"
      >
        {controls.showArea && circles}
        {controls.showModal && tempRef.current && (
          <Circle
            mapCrawler={{ ...tempRef.current, radius: controls.searchRadius }}
          />
        )}
      </GoogleMapWrapper>
    </Container>
  )
}

export default AdminStoreCrawler
