import Map from './Map'
import Circle from './Circle'

function buildCircle(id, lat, lng, radius, fillColor) {
  return {
    id,
    center: { lat, lng },
    radius,
    fillColor,
    fillOpacity: 0.4,
    strokeOpacity: 0,
  }
}

const circles = [
  buildCircle(1, 22.9976545, 120.2117627, 100, "#F44336"),
  buildCircle(3, 23.0042387, 120.2222701, 1300, "#009688"),
  buildCircle(4, 22.983208, 120.220497, 2000, "#FFEB3B"),
  buildCircle(2, 23.003753, 120.205631, 1500, "#5C6BC0"),
  buildCircle(5, 22.9976545, 120.2117627, 200, "#795548"),
]

const MapComponent = () => {
  return (
    <Map>
      {circles.map((circle) => (
        <Circle key={circle.id} options={circle} />
      ))}
    </Map>
  )
}

export default MapComponent
