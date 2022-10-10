import styled from "styled-components"
import { devices } from 'constant/styled-theme'

export const Container = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid #eee;

  h2 {
    font-size: 18px;
    font-weight: 700;
  }
`

export const HelpUs = styled.div`
  text-align: center;
  background-color: #A6A6A6;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;

  span {
    color: #fff;
  }

  a {
    color: #333;
    font-weight: 500;

    &:hover {
      color: #555;
    }
  }

  @media ${devices.iphoneSE} {
    height: 36px;
    font-size: 12px;
  }
`

export const Content = styled.div`
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

  div {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .hamburger {
    display: none;
  }

  @media ${devices.iphoneSE} {
    height: 64px;
    padding: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    h2 {
      font-size: 16px;
      line-height: 64px;
      margin: 0;
      padding: 0 24px;
    }

    .menu {
      display: ${({ showMenu }) => showMenu ? 'flex' : 'none'};
      flex-direction: column;
      width: 100%;
      min-height: calc(100vh - 100px);
      justify-content: space-between;
      background-color: #fff;
      z-index: 12;

      a {
        align-self: flex-start;
        padding: 24px;
        width: 100%;
      }
    }

    .hamburger {
      display: block;
      position: absolute;
      right: 24px;
      top: 16px;
    }

    .action-button {
      margin-bottom: 4rem;
    }
  }
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

export const HelpButton = styled.button`
  background: none;
  border: none;
  font-weight: 500;
  font-size: 14px;
  text-decoration:underline;
  cursor: pointer;

  &:hover {
    color: #555;
  }

  @media ${devices.iphoneSE} {
    font-size: 12px;
  }
`
