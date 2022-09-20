import styled from "styled-components"

export const Container = styled.div`
  height: 100vh;
  background-color: #fff;
  width: ${props => props.theme.sidebarWidth};
  position: absolute;
`

export const Head = styled.div`
  background-color: #1a73e8;
  width: ${props => props.theme.sidebarWidth};
  box-sizing: border-box;
  color: #fff;
  padding: 0.5rem 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`
