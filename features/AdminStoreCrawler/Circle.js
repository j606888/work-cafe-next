import { useEffect, useState } from 'react'

function buildOption({ id, lat, lng, radius, totalFound }) {
  const pickColor = (totalFound) => {
    if (totalFound === 60) return "#E67E22"
    else if (totalFound === 0) return "#111"
    else if (totalFound < 10) return "#888"
    else return "#009688"
  }

  if (!id) {
    return {
      center: { lat, lng },
      radius,
      fillColor: "#F1C40F",
      fillOpacity: 0.4,
      strokeOpacity: 8,
    }
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

const Circle = ({map, mapCrawler}) => {
  const [circle, setCircle] = useState()
  const options = buildOption(mapCrawler)

  useEffect(() => {
    if (!circle) setCircle(new google.maps.Circle())

    return () => {
      if (circle) circle.setMap(null)
    }
  }, [circle])

  useEffect(() => {
    if (circle) circle.setOptions({ map, options })
  }, [map, circle])

  return null
}

export default Circle
