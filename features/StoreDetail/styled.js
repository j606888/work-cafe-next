import styled, { css } from "styled-components";

export const Container = styled.div`
  background-color: #fff;
  position: relative;
`

export const UploadPhotoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  gap: 1rem;
`

export const MainInfo = styled.div`
  padding: 1rem 1.5rem;

  h3 {
    margin: 0;
    margin-bottom: 12px;
    font-weight: 400;
    font-size: 24px;
  }

  .sub-info {
    display: flex;
    align-items: center;
  }
  .reviews {
    margin-left: .5rem;
    color: #1B72E8;
    font-size: 14px;
  }
`

export const GoogleReviews = styled.div`
  .review-header {
    padding: 0 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    h4 {
      margin: 1rem 0;
      font-weight: 400;
    }

    .sort {
      border: 1px solid #ccc;
      border-radius: 24px;
      padding: 6px 12px;
      display: flex;
      gap: 6px;
      align-items: center;
      cursor: pointer;

      svg {
        color: #1B72E8;
        font-size: 16px;
      }

      span {
        font-size: 12px;
      }
    }
  }
`

export const ButtonGroup = styled.div`
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-around;
`

const showStyle = css`
  background-color: #fff;
  box-shadow: 0 2px 4px -2px rgba(0,0,0,0.4);

  span {
    display: block;
  }
`

export const ChipContainer = styled.div`
  text-align: center;
  margin-bottom: 1rem;
`
