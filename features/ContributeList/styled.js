import styled, { css } from "styled-components"

export const Container = styled.div`
  height: 100vh;
  background-color: #fff;
  width: ${props => props.theme.sidebarWidth};
  position: absolute;
  z-index: 2;
`

export const Head = styled.div`
  background-color: #1a73e8;
  width: ${props => props.theme.sidebarWidth};
  height: 80px;
  box-sizing: border-box;
  color: #fff;
  display: flex;
  align-items: center;
  padding-left: 1rem;
  gap: 1rem;
`

export const Tabs = styled.div`
  display: flex;
`

export const Tab = styled.div`
  flex: 1;
  text-align: center;
  height: 48px;
  border-bottom: 3px solid #ccc;
  line-height: 48px;
  cursor: pointer;
  box-sizing: border-box;

  ${({ active }) => (active ? activeTab : inactiveTab)}
`

const activeTab = css`
  color: #1a73e8;
  border-bottom-color: #1a73e8;
  font-weight: 500;
`

const inactiveTab = css`
  color: #333;
  border-bottom-color: #ccc;
`
