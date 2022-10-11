import styled from "styled-components"
import { devices } from "constant/styled-theme"

export const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 36px;
  align-items: center;
  justify-content: space-around;
  padding: 0 56px;

  @media ${devices.iphoneSE} {
    flex-wrap: nowrap;
    width: 100%;
    overflow: scroll;
    position: fixed;
    left: 0;
    bottom: 0;
    padding: 25px 24px;
    gap: 10px;
    background-color: #ffffff;
    z-index: 1;
  }
`

export const StoreCount = styled.p`
  padding: 0 56px;
  font-size: 16px;
  color: #757575;
  margin-top: 0;

  @media ${devices.iphoneSE} {
    display: none;
  }
`
