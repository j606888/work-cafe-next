import styled, { css } from "styled-components"
import { devices } from "constants/styled-theme"

const mobileStyle = {
  expand: css`
    width: 100%;
    background-color: #ffffff;
    padding: 0 24px;
  `,
  unExpand: css`
    flex-wrap: initial;
    justify-content: flex-start;
    width: 100%;
    overflow-x: scroll;
    padding: 12px 12px;
    gap: 10px;
    background-color: #ffffff;
  `,
}
export const Container = styled.div`
  min-height: 240px;
  box-sizing: border-box;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 16px;
  align-items: flex-start;
  justify-content: space-around;
  padding: 0 28px;
  flex-shrink: 0;

  @media ${devices.mobileXl} {
    ${({ expand }) => (expand ? mobileStyle.expand : mobileStyle.unExpand)}
  }
`

export const StoreCount = styled.p`
  padding: 0 45px;
  font-size: 16px;
  font-weight: 400;
  color: #222120;
  margin-top: 0;

  @media ${devices.mobileXl} {
    display: none;
  }
`
