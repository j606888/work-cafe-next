import styled from "styled-components"

export const Container = styled.div`
  padding: 1rem 1.5rem 0;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  p {
    white-space: pre-line;
    margin-top: 0.5rem;
    font-size: 14px;
    line-height: 150%;
  }
`

export const InfoBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: .5rem;

  .store-info {
    display: flex;
    flex-direction: column;
  }

  .name {
    font-size: 14px;
    font-weight: 500;
    display: block;
  }

  .address {
    font-size: 12px;
    color: #777;
  }
`

export const ScoreDateBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;

  span {
    font-size: 12px;
    color: #444;
  }
`

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

export const MoreContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
`
