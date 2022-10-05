import styled, { css } from "styled-components"

const WIDTH = '320px'

export const Container = styled.div`
  width: ${WIDTH};
  position: relative;
`

export const SearchBox = styled.div`
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 24px;
  padding: 0.8rem 1.2rem;
  display: flex;
  align-items: center;
  gap: .3rem;
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
  border-radius: 12px;
  border: 1px solid #ccc;
  overflow-y: auto;
  max-height: 12rem;
  position: absolute;
  left: 0;
  top: calc(100% + 4px);
  width: ${WIDTH};
  z-index: 20;
`

export const Option = styled.div`
  padding: 8px 16px;
  font-size: 14px;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  color: #333;
  white-space: nowrap;

  ${({ focus }) =>
    focus &&
    css`
      background-color: #f2f2f2;
    `}

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
