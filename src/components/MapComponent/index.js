import Map from './Map'
import Circle from './Circle'
import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import SearchModal from "./SearchModal"
import ControlPanel from './ControlPanel'
import Api from '@/api/index'

function buildCircle({ id, lat, lng, radius, color}) {
  return {
    id,
    radius,
    fillColor: color,
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

  const handleSearch = async () => {
    const lastId = crawlRecords[crawlRecords.length - 1].id
    const crawlRecord = {
      id: lastId + 1,
      lat: tempOptions.center.lat,
      lng: tempOptions.center.lng,
      radius: tempOptions.radius,
      color: "#009688"
    }
    await Api.createCrawlRecord(crawlRecord)
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
    // console.log("onIdle")
    // console.log(m.getZoom())
    // console.log(m.getCenter().toJSON())
  }

  const callAPI = async () => {
    const data = await Api.getCrawlRecords()
    const formattedData = data.map((d) => buildCircle(d))
    setCrawlRecords(formattedData)
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
      <SearchModal open={open} handleClose={() => setOpen(false)} handleSearch={handleSearch} />
      <Map onClick={onClick} onIdle={onIdle}>
        {show && circles}
        {open && <Circle options={tempOptions} />}
      </Map>
    </Box>
  )
}

export default MapComponent
