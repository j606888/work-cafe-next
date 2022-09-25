import { Circle as GoogleCircle } from '@react-google-maps/api'

function buildOption({ id, radius, totalFound }) {
  const pickColor = (totalFound) => {
    if (totalFound === 60) return "#E67E22"
    else if (totalFound === 0) return "#111"
    else if (totalFound < 10) return "#888"
    else return "#009688"
  }

  if (!id) {
    return {
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
    fillOpacity: 0.4,
    strokeOpacity: 0,
  }
}

const Circle = ({mapCrawler}) => {
  const options = buildOption(mapCrawler)
  const center = {
    lat: mapCrawler.lat,
    lng: mapCrawler.lng
  }


  return <GoogleCircle center={center} options={options} />
}

export default Circle
