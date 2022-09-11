import styled, { css } from "styled-components"

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
  }
`

export const RadioContainer = styled.div`
  svg {
    font-size: 64px;
  }

  ${({ isChecked }) =>
    isChecked &&
    css`
      span {
        color: #1e88e5;
      }
    `}
`
