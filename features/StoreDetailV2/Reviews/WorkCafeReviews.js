import { Avatar } from "@mui/material"
import React from "react"
import styled, { css } from "styled-components"
import { devices } from "constant/styled-theme"

const Container = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  margin-bottom: 2rem;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;

  h6 {
    font-size: 16px;
    font-weight: 500;
    margin: 0;
  }

  span {
    font-size: 12px;
  }

  p {
    font-size: 14px;
  }

  @media ${devices.iphoneSE} {
    h6 {
      font-size: 14px;
    }

    span {
      font-size: 10px;
    }

    p {
      font-size: 12px;
    }

    max-width: calc(100% - 40px);
  }
`

const ImageList = styled.div`
  display: flex;
  gap: 8px;

  @media ${devices.iphoneSE} {
    flex-wrap: nowrap;
    overflow-x: scroll;
    white-space: nowrap;
  }
`

const ImageBox = styled.div`
  height: 120px;
  width: 120px;
  border-radius: 12px;
  background-color: #EDEDED;

  ${({ more }) => more && css`
    background-color: #bbb;
    &::after {
      content: '+1';
      font-size: 24px;
      color: #fff;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  `}

  @media ${devices.iphoneSE} {
    flex: none;
  }
`

const WorkCafeReviews = () => {
  return (
    <Container>
      <Avatar></Avatar>
      <Content>
        <h6>訪客</h6>
        <span>2022年10月9日・平日造訪</span>
        <p>
          這裡很適合平日來用電腦做事！空間明亮，又沒有限制時間。
          雖然不是每個座位都有插座，但平日空位都蠻多的，算容易找到有插座的位置。WiFi穩定，讚讚！
        </p>
        <ImageList>
          <ImageBox />
          <ImageBox />
          <ImageBox more/>
        </ImageList>
      </Content>
    </Container>
  )
}

export default WorkCafeReviews
