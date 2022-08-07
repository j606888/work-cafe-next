import Map from './Map'
import Circle from './Circle'
import { useEffect, useState } from 'react'

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

  return (
    <Map>
      {crawlRecords.map((circle) => (
        <Circle key={circle.id} options={circle} />
      ))}
    </Map>
  )
}

export default MapComponent
