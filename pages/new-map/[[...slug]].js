import { devices } from "constants/styled-theme"
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
      <MapContainer>Map</MapContainer>
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
  width: 50%;
  height: calc(100% - 80px);
  position: fixed;
  left: 0;
  top: 80px;
  bottom: 0;
  overflow-y: auto;
  background-color: #1abc9c;
  border: 2px solid #2c3e50;

  @media ${devices.mobileXl} {
    width: 100%;
    height: 274px;
    bottom: 0;
    left: 0;
    right: 0;
    top: auto;
    overflow-x: auto;
    display: flex;
  }
`

const MapContainer = styled.div`
  width: 50%;
  height: calc(100% - 80px);
  position: fixed;
  right: 0;
  top: 80px;
  bottom: 0;
  background-color: #3498db;
  border: 2px solid #9b59b6;

  @media ${devices.mobileXl} {
    position: fixed;

    width: 100%;
    height: calc(100% - 56px - 274px);
    top: 56px;
  }
`
