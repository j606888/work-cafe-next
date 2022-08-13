import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  height: calc(100vh - 64px - 3rem);
  width: 100%;
`
const DEFAULT_SETUP = {
  center: {
    lat: 23.546162,
    lng: 120.6402133
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

const Map = ({ onClick, onIdle, children, map, setMap }) => {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, DEFAULT_SETUP))
    }
  }, [ref, map])

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
      <Container ref={ref} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { map })
        }
      })}
    </>
  )
}

export default Map
