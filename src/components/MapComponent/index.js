import Map from './Map'
import Circle from './Circle'
import { useEffect, useState } from 'react'
import Button from "@mui/material/Button"
import { Box } from '@mui/material'

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

const buttonStyle = {
  position: 'absolute',
  top: 50,
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 10
}

const MapComponent = () => {
  const [crawlRecords, setCrawlRecords] = useState([])
  const [show, setShow] = useState(true)
  
  const onClick = (e) => {
    console.log("You click ", e.latLng.toJSON())
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
      <Button variant="contained" sx={buttonStyle} onClick={() => setShow(cur => !cur)}>
        Show Area
      </Button>
      <Map onClick={onClick} onIdle={onIdle}>
        {show && circles}
      </Map>
    </Box>
  )
}

export default MapComponent
