import styled from "styled-components"
import { devices } from "constant/styled-theme"

export const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 36px;
  align-items: flex-start;
  justify-content: space-around;
  padding: 0 56px;

  @media ${devices.mobileXl} {
    flex-wrap: initial;
    justify-content: flex-start;
    width: 100%;
    overflow-x: scroll;
    position: fixed;
    left: 0;
    bottom: 0;
    padding: 12px 12px;
    gap: 10px;
    background-color: #ffffff;
  }
`

export const StoreCount = styled.p`
  padding: 0 56px;
  font-size: 16px;
  color: #757575;
  margin-top: 0;

  @media ${devices.mobileXl} {
    display: none;
  }
`
