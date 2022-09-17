import styled, { css } from "styled-components"

export const Container = styled.div`
  height: 100vh;
  background-color: #fff;
  width: 374px;
  position: absolute;
`

export const Head = styled.div`
  background-color: #1a73e8;
  width: 374px;
  height: 80px;
  box-sizing: border-box;
  color: #fff;
  display: flex;
  align-items: center;
  padding-left: 1rem;
  gap: 1rem;
`

export const ListContainer = styled.div`
  height: calc(100vh - 80px);
  overflow-y: scroll;
  width: 374px;
`

export const Tabs = styled.div`
  display: flex;
`

export const Tab = styled.div`
  flex: 1;
  text-align: center;
  padding: 0.6rem;
  border-bottom: 3px solid #ccc;
  cursor: pointer;

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
