import styled, { css } from "styled-components"
import { devices } from "constant/styled-theme"

export const Container = styled.div`
  position: relative;
  width: 100%;

  @media ${devices.iphoneSE} {
    ${({ hide }) => hide && `
      display: none;
    `}
  }
`

export const SearchBox = styled.div`
  box-sizing: border-box;
  background: #fff;
  border: 1px solid #493425;
  border-radius: 12px;
  height: 52px;
  padding: 0 8px 0 1.2rem;
  display: flex;
  align-items: center;
  gap: 9px;
  color: #493425;

  input {
    ::placeholder {
      color: #493425;
    }
  }

  @media ${devices.iphoneSE} {
    height: 44px;
    padding-left: 16px;
  }
`

export const Input = styled.input`
  flex: 1;
  background: transparent;
  border: 0;
  outline: none;
  padding: 240x 20px;
  font-size: 16px;

  @media ${devices.iphoneSE} {
    font-size: 14px;
  }
`

export const Options = styled.div`
  display: ${({ hasResult }) => (hasResult ? "block" : "none")};
  background: #fff;
  padding: 7px 0;
  border-radius: 12px;
  border: 1px solid #757575;
  overflow-y: auto;
  max-height: 12rem;
  position: absolute;
  left: 0;
  top: calc(100% + 4px);
  z-index: 20;
  width: 100%;
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

export const SearchButton = styled.div`
  ${({ noBg }) => noBg ? null : `
    background-color:#94684A;
  `}
  ${({ noBg }) => noBg ? `color: #757575;` : `
    color: #fff;
  `}
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  @media ${devices.iphoneSE} {
    width: 28px;
    height: 28px;

    svg {
      font-size: 20px;
    }
  }
`
