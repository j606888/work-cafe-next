import styled from "styled-components"

export const Container = styled.div`
  position: fixed;
  right: 0;
  top: 128px;
  width: calc(100% - 628px);
  height: calc(100vh - 128px);

  .labels {
    background-color: white;
    font-size: 12px;
    font-weight: bold;
    border-radius: 12px;
    padding: 4px 8px;
    border: 1px solid #999;
    box-sizing: border-box;
    position: absolute;
    bottom: 2.3rem;
    left: 0.8rem;
    overflow: hidden;
    max-width: 240px;
  }
`

export const MyLocationContainer = styled.div`
  position: absolute;
  bottom: 7rem;
  right: 0.7rem;
  z-index: 2;
`

export const SearchHereContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 1rem;
  transform: translateX(-50%);
  z-index: 2;
`
