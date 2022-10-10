import styled from "styled-components"
import { devices } from 'constant/styled-theme'

export const Container = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
`

export const Link = styled.a`
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  color: #666;
  gap: 0.5rem;
  padding-bottom: 2px;

  &:hover {
    border-bottom: 1px solid #666;
  }
`

export const NavbarContainer = styled.div`
  height: 80px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 56px;
  background: #EDEDED;

  h2 {
    font-family: 'Noto Sans', sans-serif;
    font-size: 24px;
    font-weight: 700;
    color: #757575;
  }

  @media ${devices.iphoneSE} {
    padding : 0 24px;
    height: 64px;

    h2 {
      font-size: 16px;
    }
  }
`

export const NavLinks = styled.div`
  display: flex;
  gap: 1.3rem;
  align-items: center;

  @media ${devices.iphoneSE} {
    display: ${({ show }) => show ? 'flex' : 'none'};
    position: absolute;
    top: 64px;
    left: 0;
    width: 100%;
    height: calc(100vh - 64px - 36px);
    background-color: #FFFFFF;
    flex-direction: column;

    button:last-child {
      margin-bottom: 3rem;
    }
  }
`

export const GreyLink = styled.a`
  color: #757575;
  font-size: 20px;
  margin-right: 1rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  @media ${devices.iphoneSE} {
    align-self: flex-start;
    padding: 1.5rem;
    margin-bottom: auto;
    margin-right: auto;
  }
`

export const Button = styled.button`
  font-size: 20px;
  border-radius: 12px;
  padding: 8px 20px;
  border: 1px solid #757575;
  color: #757575;
  cursor: pointer;
  background-color: inherit;

  @media ${devices.iphoneSE} {
    width: 200px;
  }
`

export const CtaButton = styled(Button)`
  color: #FFFFFF;
  background-color: #757575;
`

export const IconContainer = styled.div`
  display: none;

  @media ${devices.iphoneSE} {
    display: block;
  }
`
