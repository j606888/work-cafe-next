import styled from "styled-components"
import { devices } from "constant/styled-theme"

export const Container = styled.div`
  margin: 0 56px;
  color: #757575;
  font-family: "Noto Sans", sans-serif;

  @media ${devices.iphoneSE} {
    margin: 0 24px;
  }
`
