import { grey01, grey04 } from "constants/color"
import { devices } from "constants/styled-theme"
import React from "react"
import styled from "styled-components"
import OpenTimeGroup from "./OpenTimeGroup"



const FilterForm = ({ onClose }) => {

  function handleOpenTimeChange(option) {
    console.log(option)
  }

  return (
    <Container>
      <Title>
        <span>篩選條件</span>
        <CloseButton src="/cancel.svg" alt="cancel" onClick={onClose} />
      </Title>
      <Content>
        <OpenTimeGroup onChange={handleOpenTimeChange} />
        <h3>標籤</h3>
        <h3>地圖顯示</h3>
      </Content>
    </Container>
  )
}

const Container = styled.div`
  width: 596px;
`

const Title = styled.div`
  height: 70px;
  text-align: center;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  display: flex;
  align-items: center;
  color: ${grey01};
  position: relative;
  border: 1px solid ${grey04};

  span {
    margin: 0 auto;
  }
`

const CloseButton = styled.img`
  position: absolute;
  top: 24px;
  right: 28px;
  cursor: pointer;

  @media ${devices.mobileXl} {
    top: 16px;
    right: 20px;
  }
`

const Content = styled.div`
  min-height: 300px;
  padding: 39px;

  h3 {
    font-weight: 700;
    font-size: 24px;
    line-height: 33px;
    display: flex;
    align-items: center;
    color: ${grey01};
    margin: 0;
    margin-bottom: 16px;
  }
`

const Banana = styled.div`
  margin-bottom: 40px;
`



export default FilterForm
