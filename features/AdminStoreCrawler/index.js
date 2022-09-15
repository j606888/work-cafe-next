import GoogleMapWrapper from "features/GoogleMapWrapper"
import React, { useRef } from "react"
import { useEffect, useState, useReducer } from "react"
import styled from "styled-components"
import ControlPanel from "./ControlPanel"
import SearchDialog from "./SearchDialog"
import Router from "next/router"
import Circle from "./Circle"
import { createCrawlRecord } from "api/map-crawlers"
import useInitMap from "hooks/useInitMap"
import useSWR from "swr"
import { fetcher } from "api"
import MyLocation from "features/MyLocation"

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
  const { isReady, mapSettings, map, setMap } = useInitMap()
  const [controls, dispatch] = useReducer(reducer, INITIAL_STATE)
  const tempRef = useRef(null)
  const centerRef = useRef({
    lat: 23.546162,
    lng: 120.6402133,
    zoom: 8,
  })
  const { data: mapCrawlers } = useSWR(["/admin/map-crawlers", { ...centerRef.current }], fetcher)

   const handleFindMe = ({ lat, lng }) => {
    const center = { lat, lng }
    map.setZoom(15)
    map.panTo(center)
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
  }

  const circles = mapCrawlers?.map((mapCrawler) => (
    <Circle key={mapCrawler.id} mapCrawler={mapCrawler} />
  )) || []

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
      <GoogleMapWrapper
        map={map}
        setMap={setMap}
        onClick={handleOnClick}
        onIdle={handleOnIdle}
        mapSettings={mapSettings}
        marginTop='64px' 
      >
        {controls.showArea && circles}
        {controls.showModal && tempRef.current && (
          <Circle
            mapCrawler={{ ...tempRef.current, radius: controls.searchRadius }}
          />
        )}
      </GoogleMapWrapper>
      <MyLocationContainer>
        <MyLocation onClick={handleFindMe}/>
      </MyLocationContainer>
    </Container>
  )
}

export default AdminStoreCrawler
