import styled from "styled-components"

export const MarkerStyle = styled.div`
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
export const SearchHereContainer = styled.div`
  position: absolute;
  top: 4rem;
  transform: translateX(-50%);
  z-index: 5;

  ${({ left }) => `left: ${left}`}
`

export const SearchbarV2Container = styled.div`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  z-index: 3;
`

export const StoreDetailContainer = styled.div`
  position: absolute;
  background-color: #fff;
  top: 4rem;
  left: 24.5rem;
  z-index: 2;
  height: calc(100vh - 5rem);
  border-radius: 12px;
  /* overflow: hidden; */
  overflow-y: scroll;
  box-shadow: 0 1px 2px rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%);
`

export const StoreListContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  height: 100vh;
  overflow-y: scroll;
  background-color: #fff;
`

export const MenuContainer = styled.div`
  position: absolute;
  top: 1rem;
  left: 24.5rem;
  z-index: 2;
  display: flex;
  gap: 1rem;
  align-items: center;
`

export const MyLocationContainer = styled.div`
  position: absolute;
  right: 1rem;
  bottom: 7rem;
  z-index: 2;
`