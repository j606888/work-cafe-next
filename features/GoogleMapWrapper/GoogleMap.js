import React, { useEffect, useRef } from "react"
import styled from "styled-components"

const Container = styled.div`
  position: absolute;
  z-index: 1;
  height: ${(props) => `calc(100vh - ${props.marginTop})`};
  width: 100%;
`

const GoogleMap = ({
  onClick,
  onIdle,
  children,
  map,
  setMap,
  marginTop,
  mapSettings,
}) => {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, mapSettings))
    }
  }, [ref, map, setMap, mapSettings])

  useEffect(() => {
    if (map) {
      ;["click", "idle"].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      )

      if (onClick)
        map.addListener("click", (mapsMouseEvent) => {
          const { lat, lng } = mapsMouseEvent.latLng.toJSON()
          onClick({ lat, lng })
        })

      if (onIdle)
        map.addListener("idle", () => {
          const { lat, lng } = map.getCenter().toJSON()
          const zoom = map.getZoom()
          const shortRes = {
            lat: +lat.toFixed(6),
            lng: +lng.toFixed(6),
            zoom,
          }

          onIdle(shortRes)
        })
    }
  }, [map, onClick, onIdle])

  return (
    <>
      <Container ref={ref} marginTop={marginTop} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { map })
        }
      })}
    </>
  )
}

export default GoogleMap
