import Map from './Map'
import Circle from './Circle'
import { useEffect, useState } from 'react'
import Button from "@mui/material/Button"
import { Box } from '@mui/material'
import SearchModal from "./SearchModal"
import ControlPanel from './ControlPanel'

function buildCircle({ id, lat, lng, radius, color}) {
  return {
    id,
    center: { lat, lng },
    radius,
    fillColor: color,
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

  const handleClose = () => {
    setOpen(false)
  }
  
  const handleSearch = async () => {
    const lastId = crawlRecords[crawlRecords.length - 1].id
    const crawlRecord = {
      id: lastId + 1,
      lat: tempOptions.center.lat,
      lng: tempOptions.center.lng,
      radius: tempOptions.radius,
      color: "#009688"
    }
    const config = {
      method: "POST",
      headers: {
        'content-Type': 'application/json'
      },
      body: JSON.stringify(crawlRecord),
    }
    await fetch(`http://localhost:3003/crawl-records`, config)
    await callAPI()
    setOpen(false)
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
    console.log("onIdle")
    console.log(m.getZoom())
    console.log(m.getCenter().toJSON())
  }

  const callAPI = async () => {
    try {
      const res = await fetch(`http://localhost:3003/crawl-records`)
      const data = await res.json()
      const formattedData = data.map((d) => buildCircle(d))
      setCrawlRecords(formattedData)
    } catch (err) {
      console.log(err)
    }
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
      />
      <SearchModal open={open} handleClose={handleClose} handleSearch={handleSearch} />
      <Map onClick={onClick} onIdle={onIdle}>
        {show && circles}
        {open && <Circle options={tempOptions} />}
      </Map>
    </Box>
  )
}

export default MapComponent
