import styled, { css } from "styled-components"
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
  padding: 0 60px;
  background: #ffffff;
`

export const NavLinks = styled.div`
  display: flex;
  gap: 1.3rem;
  align-items: center;
`

export const GreyLink = styled.a`
  color: #757575;
  font-size: 20px;
  margin-right: 1rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

export const Button = styled.button`
  font-size: 16px;
  width: 68px;
  height: 44px;
  border-radius: 12px;
  
  border: 1px solid #222120;
  color: #222120;
  cursor: pointer;
  background-color: inherit;
`

export const CtaButton = styled(Button)`
  color: #FFFFFF;
  background-color: #222120;
`

export const IconContainer = styled.div`
  display: none;
`

export const HomeLink = styled.a`
  font-family: 'Noto Sans',sans-serif;
  font-size: 20px;
  font-weight: 900;
  line-height: 27px;
  color: #222120;
  text-decoration: none;
`
