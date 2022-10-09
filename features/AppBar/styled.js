import styled from "styled-components"

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
`

export const Content = styled.div`
  height: 80px;

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
`
