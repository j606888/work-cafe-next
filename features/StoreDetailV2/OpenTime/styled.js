import styled from "styled-components"
import { devices } from "constant/styled-theme"

export const Container = styled.div`
  margin-left: 104px;
  margin-top: 12px;

  @media ${devices.iphoneSE} {
    margin: 0 24px 12px;
  }
`

export const ToggleButton = styled.div`
  display: flex;
  gap: 8px;
  padding: 8px 0;
  font-size: 14px;
  color: #757575;
  cursor: pointer;
  align-items: center;

  a {
    color: #757575;
  }

  @media ${devices.iphoneSE} {
    a {
      display: none;
    }
  }
`

export const OpenHours = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  color: #757575;
`

export const DayBox = styled.div`
  display: flex;
  align-items: flex-start;
  margin-left: 32px;
  gap: 1rem;
  margin-bottom: 12px;

  .period {
    display: flex;
    flex-direction: column;
  }
`
