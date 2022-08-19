import Map from "./Map"
import Circle from "./Circle"
import { useEffect, useState, useReducer } from "react"
import { Box } from "@mui/material"
import ControlPanel from "./ControlPanel"
import { createCrawlRecord, getCrawlRecords } from "@api/map-crawlers"
import Router, { useRouter } from "next/router"
import { alreadyGranted, getCurrentPosition } from "src/utils/navigator"
import SearchDialog from "./SearchDialog"

function buildCircle({ id, lat, lng, radius, totalFound }) {
  const pickColor = (totalFound) => {
    if (totalFound === 60) return "#E67E22"
    else if (totalFound === 0) return "#111"
    else if (totalFound < 10) return "#888"
    else return "#009688"
  }

  return {
    id,
    radius,
    fillColor: pickColor(totalFound),
    center: { lat, lng },
    fillOpacity: 0.4,
    strokeOpacity: 0,
  }
}

const INITIAL_STATE = {
  showArea: true,
  showModal: false,
  allowRefresh: false,
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
    default:
      throw new Error("Action not exist")
  }
}

const MapComponent = () => {
  const [mapCrawlers, setMapCrawlers] = useState([])
  const [map, setMap] = useState(null)
  const [myLocation, setMyLocation] = useState(null)
  const [controls, dispatch] = useReducer(reducer, INITIAL_STATE)
  const [searchRadius, setSearchRadius] = useState(100)
  const [tempOptions, setTempOptions] = useState(null)
  const [center, setCenter] = useState({
    lat: 23.546162,
    lng: 120.6402133,
    zoom: 8,
  })

  const router = useRouter()

  useEffect(() => {
    async function trySetLocation() {
      const already = await alreadyGranted()
      if (!already) return

      const { lat, lng } = await getCurrentPosition()
      setMyLocation({
        lat,
        lng,
        zoom: 14,
      })
    }

    trySetLocation()
  }, [])

  useEffect(() => {
    const query = router.query

    if (query.lng && query.lat && query.zoom) {
      const { lng, lat, zoom } = query
      setCenter({
        lat: +lat,
        lng: +lng,
        zoom: +zoom,
      })
    }
    callAPI()
  }, [])

  const handleFineMe = async () => {
    if (!myLocation) {
      const { lat, lng } = await getCurrentPosition()

      setMyLocation({
        lat,
        lng,
        zoom: 14,
      })
      map.setCenter({ lat, lng })
      map.setZoom(14)
    } else {
      const { lat, lng, zoom } = myLocation
      map.setCenter({ lat, lng })
      map.setZoom(zoom)
    }
  }

  const handleSearch = async () => {
    const crawlRecord = {
      lat: tempOptions.center.lat,
      lng: tempOptions.center.lng,
      radius: tempOptions.radius,
      color: "#009688",
    }
    await createCrawlRecord(crawlRecord)
    dispatch({ type: "TOGGLE_MODAL" })
  }

  const onClick = (e) => {
    const center = e.latLng.toJSON()
    const op = {
      center,
      radius: searchRadius,
      fillColor: "#F1C40F",
      fillOpacity: 0.4,
      strokeOpacity: 8,
    }
    setTempOptions(op)
    dispatch({ type: "TOGGLE_MODAL" })
  }

  const onIdle = (m) => {
    const center = m.getCenter()
    if (center) {
      const { lat, lng } = m.getCenter().toJSON()
      setCenter({
        lat,
        lng,
        zoom: m.getZoom(),
      })
      Router.push({
        query: {
          lat: lat.toFixed(6),
          lng: lng.toFixed(6),
          zoom: m.getZoom(),
        },
      })
      dispatch({ type: "TOGGLE_REFRESH", payload: { refresh: true } })
    }
  }

  const callAPI = async () => {
    const params = {
      lat: center.lat,
      lng: center.lng,
      zoom: center.zoom,
    }
    const data = await getCrawlRecords(params)
    const formattedData = data.map((d) => buildCircle(d))
    setMapCrawlers(formattedData)
    dispatch({ type: "TOGGLE_REFRESH", payload: { refresh: false } })
  }

  const circles = mapCrawlers.map((circle) => (
    <Circle key={circle.id} options={circle} />
  ))

  return (
    <Box sx={{ position: "relative" }}>
      <ControlPanel
        show={controls.showArea}
        setShow={() => dispatch({ type: "TOGGLE_AREA" })}
        radius={searchRadius}
        setRadius={(r) => setSearchRadius(r)}
        handleReload={() => callAPI()}
        showButton={controls.allowRefresh}
        handleFindMe={() => handleFineMe()}
      />
      {/* <SearchModal
        open={controls.showModal}
        handleClose={() => dispatch({ type: "TOGGLE_MODAL" })}
        handleSearch={handleSearch}
      /> */}
      <SearchDialog
        open={controls.showModal}
        handleClose={() => dispatch({ type: "TOGGLE_MODAL" })}
        handleSearch={handleSearch}
      />
      <Map
        onClick={onClick}
        onIdle={onIdle}
        center={{ lat: center.lat, lng: center.lng }}
        map={map}
        setMap={setMap}
      >
        {controls.showArea && circles}
        {controls.showModal && <Circle options={tempOptions} />}
      </Map>
    </Box>
  )
}

export default MapComponent
