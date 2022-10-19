import styled from "styled-components"
import { devices } from "constant/styled-theme"

const HEIGHT = {
  normal: '40px',
  iphoneSE: '32px'
}

export const Container = styled.div`
  text-align: center;
  background: linear-gradient(90deg, #94684A, #D7B997);
  height: ${HEIGHT.normal};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #fff;

  @media ${devices.iphoneSE} {
    height: ${HEIGHT.iphoneSE};
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

  @media ${devices.iphoneSE} {
    font-size: 12px;
  }
`
