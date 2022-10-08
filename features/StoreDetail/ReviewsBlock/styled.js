import styled from "styled-components"

export const Container = styled.div`
  padding: 1rem;
`

export const FaceBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  & > div {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    svg {
      font-size: 48px;
    }

    span {
      font-size: 24px;
      font-weight: 500;
    }
  }
`

export const DetailContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  & > div {
    flex: 1;
  }
`

export const Details = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0 1rem;
  flex-wrap: wrap;
`
