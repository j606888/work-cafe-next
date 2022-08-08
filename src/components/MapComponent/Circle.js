import { useEffect, useState } from 'react'

const Circle = ({map, options}) => {
  const [circle, setCircle] = useState()

  useEffect(() => {
    if (!circle) {
      setCircle(new google.maps.Circle())
    }

    return () => {
      if (circle) {
        circle.setMap(null)
      }
    }
  }, [circle])

  useEffect(() => {
    if (circle) {
      circle.setOptions({options, map})
    }
  }, [circle, options])

  return null
}

export default Circle
