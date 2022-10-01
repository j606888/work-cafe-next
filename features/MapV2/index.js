import Skeleton from 'components/Skeleton'
import GoogleMap from 'features/GoogleMap'
import useInitMap from 'hooks/useInitMap'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: fixed;
  left: 50%;
  top: 64px;
  width: 50%;
  height: calc(100vh - 64px);
`

const MapV2 = () => {
  const { isReady, myLocation, map, setMap, mapSettings } = useInitMap()

  function handleLoad(map) {
    setMap(map)
  }


  if (!isReady) return <Skeleton />

  return (
    <Container>
      <GoogleMap
        onLoad={handleLoad}
        mapSettings={mapSettings}
      >

      </GoogleMap>
    </Container>
  )
}

export default MapV2
