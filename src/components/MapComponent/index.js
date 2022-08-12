import Map from './Map'
import Circle from './Circle'
import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import SearchModal from "./SearchModal"
import ControlPanel from './ControlPanel'
import Api from '@/api/index'
import Router, { useRouter } from 'next/router'
import { alreadyGranted, getCurrentPosition } from 'src/utils/navigator'

function buildCircle({ id, lat, lng, radius, total_found }) {
  const pickColor = (totalFound) => {
    if (totalFound === 60) return "#E67E22"
    else if (totalFound === 0) return "#111"
    else if (totalFound < 10) return "#888"
    else return "#009688"
  }

  return {
    id,
    radius,
    fillColor: pickColor(total_found),
    center: { lat, lng },
    fillOpacity: 0.4,
    strokeOpacity: 0,
  }
}

const MapComponent = () => {
  const [mapCrawlers, setMapCrawlers] = useState([])
  const [map, setMap] = useState(null)
  const [myLocation, setMyLocation] = useState(null)

  const [show, setShow] = useState(true)
  const [open, setOpen] = useState(false)
  const [radius, setRadius] = useState(100)
  const [tempOptions, setTempOptions] = useState(null)
  const [loading, setLoading] = useState(false)
  const [params, setParams] = useState({
    lat: 22.9918511,
    lng: 120.2066457,
    zoom: 15,
  })
  const [showButton, setShowButton] = useState(false)
  const [center, setCenter] = useState({
    center: {
      lat: 23.546162,
      lng: 120.6402133
    },
    zoom: 8
  })
  
  const router = useRouter()

  // Try to init current location
  useEffect(() => {
    async function trySetLocation() {
      const already = await alreadyGranted()
      if (!already) return

      const position = await getCurrentPosition()
      setMyLocation({
        center: position,
        zoom: 14,
      })
    }

    trySetLocation()
  }, [])

  const handleFineMe = async () => {
    if (!myLocation) {
      const position = await getCurrentPosition()

      setMyLocation({
        center: position,
        zoom: 14,
      })
      map.setCenter(position)
      map.setZoom(14)
    } else {
      map.setCenter(myLocation.center)
      map.setZoom(myLocation.zoom)
    }
  }

  const handleSearch = async () => {
    setLoading(true)
    const crawlRecord = {
      lat: tempOptions.center.lat,
      lng: tempOptions.center.lng,
      radius: tempOptions.radius,
      color: "#009688"
    }
    await Api.createCrawlRecord(crawlRecord)
    setOpen(false)
    setLoading(false)
  }

  const onClick = (e) => {
    const center = e.latLng.toJSON()
    const op = {
      center,
      radius: radius,
      fillColor: "#F1C40F",
      fillOpacity: 0.4,
      strokeOpacity: 8,
    }
    setTempOptions(op)
    setOpen(true)
  }

  const onIdle = (m) => {
    const center = m.getCenter()
    if (center) {
      const { lat, lng } = m.getCenter().toJSON()
      setParams({ lat, lng, zoom: m.getZoom() })
      Router.push({
        query: {
          lat: lat.toFixed(6),
          lng: lng.toFixed(6),
          zoom: m.getZoom()
        }
      })
      setShowButton(true)
    }
  }

  const callAPI = async () => {
    const data = await Api.getCrawlRecords(params)
    const formattedData = data.map((d) => buildCircle(d))
    setMapCrawlers(formattedData)
    setShowButton(false)
  }

  

  useEffect(() => {
    const query = router.query

    if (query.lng && query.lat && query.zoom) {
      const { lng, lat, zoom } = query
      setCenter({
        center: {
          lat: +lat,
          lng: +lng,
        },
        zoom: +zoom
      })
    }
    callAPI()
  }, [])

  const circles = mapCrawlers.map((circle) => (
    <Circle key={circle.id} options={circle} />
  ))

  return (
    <Box sx={{ position: "relative" }}>
      <ControlPanel
        show={show}
        setShow={setShow}
        radius={radius}
        setRadius={setRadius}
        handleReload={() => callAPI()}
        showButton={showButton}
        handleFindMe={() => handleFineMe()}
      />
      <SearchModal
        open={open}
        handleClose={() => setOpen(false)}
        handleSearch={handleSearch}
        loading={loading}
      />
      <Map onClick={onClick} onIdle={onIdle} center={center} map={map} setMap={setMap}>
        {show && circles}
        {open && <Circle options={tempOptions} />}
      </Map>
    </Box>
  )
}

export default MapComponent
