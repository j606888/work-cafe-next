import React, { useEffect, useRef } from "react"
import styled from "styled-components"

const Container = styled.div`
  height: ${props => `calc(100vh - ${props.marginTop})`};
  width: 100%;
`

const DEFAULT_SETUP = {
  center: {
    lat: 23.546162,
    lng: 120.6402133,
  },
  zoom: 8,
  fullscreenControl: false,
  mapTypeControl: false,
  styles: [
    {
      featureType: "poi.business",
      stylers: [{ visibility: "off" }],
    },
  ],
}

const GoogleMap = ({ onClick, onIdle, children, map, setMap, initCenter, initZoom, marginTop }) => {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current && !map) {
      const setup = DEFAULT_SETUP
      if (initCenter) setup.center = { lat: +initCenter.lat, lng: +initCenter.lng }
      if (initZoom) setup.zoom = +initZoom

      setMap(new window.google.maps.Map(ref.current, setup))
    }
  }, [ref, map, initCenter, initZoom, setMap])

  useEffect(() => {
    if (map) {
      ;["click", "idle"].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      )

      if (onClick) map.addListener("click", onClick)
      if (onIdle) map.addListener("idle", () => onIdle(map))
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
