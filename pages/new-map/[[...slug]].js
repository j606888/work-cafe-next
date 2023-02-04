import { devices } from "constants/styled-theme"
import GoogleMap from "features/GoogleMap"
import Header from "features/v2/Header"
import styled from "styled-components"

export default function NewMap() {
  return <>
    <Header />
    <Container>
      <ContentContainer>
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
      </ContentContainer>
      <MapContainer>
        <GoogleMap></GoogleMap>
      </MapContainer>
    </Container>
  </>
}

const Box = styled.div`
  width: 64px;
  height: 64px;
  background-color: red;
  margin: 1rem;

  flex-shrink: 0;
`

const Container = styled.div`
  display: flex;
`

const ContentContainer = styled.div`
  width: 628px;
  height: calc(100% - 80px - 40px);
  position: fixed;
  left: 0;
  top: calc(80px + 40px);
  bottom: 0;
  overflow-y: auto;
  background-color: #1abc9c;

  @media ${devices.mobileXl} {
    width: 100%;
    height: 248px;
    bottom: 0;
    left: 0;
    right: 0;
    top: auto;
    overflow-x: auto;
    display: flex;
  }
`

const MapContainer = styled.div`
  width: calc(100% - 628px);
  height: calc(100% - 80px - 40px);
  position: fixed;
  top: calc(80px + 40px);
  right: 0;
  bottom: 0;

  @media ${devices.mobileXl} {
    position: fixed;

    width: 100%;
    height: calc(100% - 56px - 248px);
    top: 56px;
  }
`
