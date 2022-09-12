import styled from "styled-components"

export const Container = styled.div`
  padding: 1rem 1.5rem 0;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .user-info {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;

    span {
      font-size: 14px;
    }
  }

  p {
    white-space: pre-line;
    margin-top: 0.5rem;
    font-size: 14px;
    line-height: 150%;
  }
`

export const FaceContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 16px;
`

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`
