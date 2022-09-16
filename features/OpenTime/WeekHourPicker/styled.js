import styled from "styled-components"

export const Container = styled.div`
  padding-right: 2rem;

  input {
    display: none;
  }

  label {
    box-sizing: border-box;
    display: inline-block;
    border: 1px solid #ccc;
    height: 28px;
    line-height: 28px;
    text-align: center;
    border-radius: 6px;
    margin: 6px;
    cursor: pointer;
    color: #333;
    font-size: 12px;
  }

  input:checked + label {
    ${({ active }) =>
      active &&
      `
      background-color: #e8f0fe;
      border: 2px solid #174fa6;
      line-height: 26px;
      color: #174fa6;
    `}
  }
`

export const OpenHourGrid = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 484px;
`
