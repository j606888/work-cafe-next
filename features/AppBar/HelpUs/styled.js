import styled from "styled-components"
import { devices } from "constant/styled-theme"

const HEIGHT = {
  normal: '40px',
  mobileXl: '32px'
}

export const Container = styled.div`
  text-align: center;
  background: #222120;
  height: ${HEIGHT.normal};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #fff;

  @media ${devices.mobileXl} {
    height: ${HEIGHT.mobileXl};
    font-size: 12px;
  }
`

export const HelpButton = styled.button`
  background: none;
  border: none;
  font-weight: 500;
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
  color: #fff;

  @media ${devices.mobileXl} {
    font-size: 12px;
  }
`
