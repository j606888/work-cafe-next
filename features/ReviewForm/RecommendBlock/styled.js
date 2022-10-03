import styled, { css } from "styled-components"

export const Container = styled.div`

`

export const RadioContainer = styled.div`
  svg {
    font-size: 64px;
  }

  ${({ isChecked, color }) =>
    isChecked &&
    css`
      span {
        color: ${color};
      }

      svg {
        color: ${color};
      }
    `}
`

export const RadioGroup = styled.div`
  display: flex;
  justify-content: flex-start;
`
