import styled from "styled-components"

export const Container = styled.div`
  padding: 1rem 1.5rem;
`

export const FaceBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  & > div {
    display: flex;
    flex-direction: column;
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

export const MoreInfoButton = styled.div`
  margin-top: 0.5rem;
  color: #1b72e8;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  span {
    font-size: 14px;
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
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`
