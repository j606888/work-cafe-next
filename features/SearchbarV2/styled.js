import styled, { css } from "styled-components"

export const Container = styled.div`
  width: 100%;
  max-width: 380px;
  box-sizing: border-box;
`

export const SearchBox = styled.div`
  background: #fff;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  padding: 0.8rem 1.2rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  ${({ hasResult }) => {
    if (hasResult) {
      return css`
        border-bottom: 2px solid #ccc;
      `
    } else {
      return css`
        border-radius: 12px;
      `
    }
  }}
`

export const Input = styled.input`
  flex: 1;
  background: transparent;
  border: 0;
  outline: none;
  padding: 240x 20px;
  font-size: 16px;
`

export const Options = styled.div`
  display: ${({ hasResult }) => (hasResult ? "block" : "none")};
  background: #fff;
  padding: 7px 0;
  border-bottom-right-radius: 12px;
  border-bottom-left-radius: 12px;
  overflow-y: auto;
  max-height: 12rem;
`

export const Option = styled.div`
  padding: 8px 16px;
  font-size: 14px;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  color: #333;
  white-space: nowrap;

  svg {
    font-size: 16px;
    color: #666;
  }

  &:hover {
    background-color: #f2f2f2;
    cursor: pointer;
  }

  .city-name {
    flex: 1;
  }

  .city-count {
    width: 2rem;
  }

  .address {
    font-size: 8px;
    color: #888;
    margin-left: 0.5rem;
  }

  .hidden {
    overflow: hidden;
  }
`
