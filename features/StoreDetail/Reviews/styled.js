import styled from "styled-components"
import { devices } from "constant/styled-theme"

export const Container = styled.div`
  margin: 0 56px;
  color: #757575;
  font-family: "Noto Sans", sans-serif;

  @media ${devices.mobileXl} {
    margin: 0 24px;
  }
`

export const LeaveFirstReview = styled.div`
  padding: 2rem;
  margin: 1rem auto;
  border: 1px solid #757575;
  border-radius: 12px;
  text-align: center;
`
