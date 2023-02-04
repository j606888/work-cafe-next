import { devices } from "constants/styled-theme"
import styled from "styled-components"

export default function NewMap() {
  return <>
    <Header />
    <Container>
      <LeftSide>
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
      </LeftSide>
      <RightSide>Map</RightSide>
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

const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
  background-color: #f1c40f;
`

const Container = styled.div`
  display: flex;
`

const LeftSide = styled.div`
  width: 50%;
  height: calc(100% - 50px);
  position: fixed;
  left: 0;
  top: 50px;
  bottom: 0;
  overflow-y: auto;
  background-color: #1abc9c;
  border: 2px solid #2c3e50;

  @media ${devices.mobileXl} {
    width: 100%;
    height: 300px;
    bottom: 0;
    left: 0;
    right: 0;
    top: auto;
    overflow-x: auto;
    display: flex;
    
  }
`

const RightSide = styled.div`
  width: 50%;
  height: calc(100% - 50px);
  position: fixed;
  right: 0;
  top: 50px;
  bottom: 0;
  background-color: #3498db;
  border: 2px solid #9b59b6;

  @media ${devices.mobileXl} {
    position: fixed;

    width: 100%;
    height: calc(100% - 50px - 300px);
    top: 50px;
  }
`
