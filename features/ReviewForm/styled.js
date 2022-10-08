import styled, { css } from "styled-components"

export const Form = styled.form`
  background-color: #fff;
  width: 540px;
  border-radius: 12px;
  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.2);

  h3 {
    text-align: center;
    margin: 1rem;
  }
`

export const Scroll = styled.div`
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: .8rem;
`

export const Buttons = styled.div`
  padding: 1rem 2rem;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`
export const ChipContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`
