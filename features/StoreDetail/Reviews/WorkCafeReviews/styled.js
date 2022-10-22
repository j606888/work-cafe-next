import styled from "styled-components"
import { devices } from "constant/styled-theme"

export const Container = styled.div`
  position: relative;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  h6 {
    font-size: 16px;
    font-weight: 500;
    margin: 0;
  }

  span {
    font-size: 12px;
  }

  p {
    font-size: 14px;
    white-space: pre-line;
  }

  @media ${devices.mobileXl} {
    h6 {
      font-size: 14px;
    }

    span {
      font-size: 10px;
    }

    p {
      font-size: 12px;
    }

    max-width: calc(100% - 40px);
  }
`

export const EditBoxContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`
