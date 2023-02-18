import styled from "styled-components"

export const RadioContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  svg {
    font-size: 64px;
  }

  span,
  svg {
    color: ${({ isChecked, color }) => (isChecked ? color : "#aaa")};
  }
`

export const RadioGroup = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 0 2rem;
`
