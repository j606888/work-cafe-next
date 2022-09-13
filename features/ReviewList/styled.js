import styled from "styled-components"

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
