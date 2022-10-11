import styled from "styled-components"
import { devices } from "constant/styled-theme"

export const Or = styled.p`
  text-align: center;
  color: #757575;
  font-size: 14px;
  padding: 0.5rem 0 1rem;

  @media ${devices.iphoneSE} {
    font-size: 12px;

    padding: 0;
  }
`

export const Upper = styled.div`
  background-color: #f9f9f9;
  padding-bottom: 1rem;
  position: relative;
`

export const SearchContainer = styled.div`
  display: flex;
  padding: 1rem 56px 0;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;

  @media ${devices.iphoneSE} {
  padding: 1rem 23px 0;
  }
`

export const HelloContainer = styled.div`
  padding: 56px 0 0 56px;
  color: #757575;

  p {
    font-size: 14px;
    margin: 4px 0 8px;
  }

  @media ${devices.iphoneSE} {
    padding: 0;
    text-align: center;

    p {
      font-size: 12px;
      margin: 4px auto;
    }

  }
`

export const SearchNearbyButton = styled.div`
  color: #757575;
  background-color: #f5f5f5;
  border: 1px solid #757575;
  border-radius: 8px;
  font-size: 16px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 50%);
  padding: 12px 25px 12px 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  cursor: pointer;
  z-index: 3;

  &:hover {
    background-color: #fcfcfc;
  }

  @media ${devices.iphoneSE} {
    padding: 6px 12px 6px 6px;
    font-size: 14px;
    white-space: nowrap;
    gap: 0.5rem;
  }
`
