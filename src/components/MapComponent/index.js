import Map from './Map'
import Circle from './Circle'
import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import SearchModal from "./SearchModal"
import ControlPanel from './ControlPanel'
import Api from '@/api/index'
import Router from 'next/router'

function pickColor(total_found) {
  if (total_found === 60) return "#E67E22"
  else if (total_found === 0) return "#111"
  else if (total_found < 10) return "#888"
  else return "#009688"
}

function buildCircle({ id, lat, lng, radius, total_found }) {
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
  const [crawlRecords, setCrawlRecords] = useState([])
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

  const callAPI = async () => {
    const data = await Api.getCrawlRecords(params)
    const formattedData = data.map((d) => buildCircle(d))
    setCrawlRecords(formattedData)
    setShowButton(false)
  }

  useEffect(() => {
    callAPI()
  }, [])

  const circles = crawlRecords.map((circle) => (
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
      />
      <SearchModal
        open={open}
        handleClose={() => setOpen(false)}
        handleSearch={handleSearch}
        loading={loading}
      />
      <Map onClick={onClick} onIdle={onIdle}>
        {show && circles}
        {open && <Circle options={tempOptions} />}
      </Map>
    </Box>
  )
}

export default MapComponent
