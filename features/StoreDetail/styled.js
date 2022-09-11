import styled from "styled-components";

export const Container = styled.div`
  background-color: #fff;
  width: 420px;
  position: relative;

  .image-box {
    width: 100%;
    height: 240px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`

export const CloseButton = styled.div`
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #eee;
  position: absolute;
  right: 12px;
  top: 12px;
  cursor: pointer;
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

export const Reviews = styled.div`
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
  padding: 1rem 3.5rem;
  display: flex;
  justify-content: space-between;
`
