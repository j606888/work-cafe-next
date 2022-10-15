import styled from "styled-components"
import { devices } from "constant/styled-theme"

export const Container = styled.div`
  display: flex;
  align-items: start;
  margin: 0 56px;
  position: relative;

  h3 {
    margin: 0 auto 0 1rem;
    font-size: 24px;
    color: #757575;
    max-width: 50%;
  }

  @media ${devices.iphoneSE} {
    margin: 0 24px;
    flex-direction: column;
    gap: 12px;

    h3 {
      font-size: 20px;
      margin: 0;
      max-width: 90%;
    }
  }
`

export const MobileGoogleUrl = styled.a`
  height: 28px;
  width: 28px;
  background-color: green;
  text-decoration: none;
  display: none;
  border-radius: 50%;

  @media ${devices.iphoneSE} {
    display: inline-block;
  }
`

export const BackButton = styled.button`
  border: 1px solid #757575;
  border-radius: 50%;
  height: 32px;
  width: 32px;
  color: #757575;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  cursor: pointer;

  svg {
    font-size: 20px;
  }

  &:hover {
    background-color: #f2f2f2;
  }
`

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media ${devices.iphoneSE} {
    position: absolute;
    top: 0;
    right: 0;
    gap: 0;
  }
`

export const Button = styled.button`
  height: 36px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 6px;
  border: 1px solid #757575;
  border-radius: 12px;
  background-color: #fff;
  cursor: pointer;

  svg {
    color: #757575;
  }

  @media ${devices.iphoneSE} {
    border: none;

    span {
      display: none;
    }

    svg {
      font-size: 32px;
      color: red;
    }
  }
`
