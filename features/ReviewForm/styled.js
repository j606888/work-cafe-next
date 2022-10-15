import styled, { css } from "styled-components"
import { devices } from "constant/styled-theme"

export const Form = styled.form`
  background-color: #fff;
  width: 540px;
  border-radius: 12px;
  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.2);

  h3 {
    padding: 1rem;
    text-align: center;
    background-color: #1B72E8;
    color: #fff;
    margin: 0;
  }

  @media ${devices.iphoneSE} {
    width: 100%;
  }
`

export const Scroll = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: .8rem;
  max-height: calc(80vh - 130px);
  overflow: scroll;

  @media ${devices.iphoneSE} {
    padding: 1rem;
    max-height: none;
    overflow: auto;
  }
`

export const Buttons = styled.div`
  border-top: 1px solid #ccc;
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
