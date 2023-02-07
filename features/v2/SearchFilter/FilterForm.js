import { grey01, grey04 } from "constants/color"
import { OPEN_HOURS, OPEN_WEEKS } from "constants/openTime"
import { devices } from "constants/styled-theme"
import React, { useState } from "react"
import styled from "styled-components"
import OpenTimeGroup from "./OpenTimeGroup"


const FilterForm = ({ onClose, _openTime, _openWeek, _openHour, onApply }) => {
  const [openTime, setOpenTime] = useState(_openTime)
  const [openWeek, setOpenWeek] = useState(_openWeek)
  const [openHour, setOpenHour] = useState(_openHour)

  const setters = {
    openTime: setOpenTime,
    openWeek: setOpenWeek,
    openHour: setOpenHour,
  }

  function handleOpenTimeChange(key, value) {
    setters[key](value)
  }

  function handleClear() {
    setOpenTime("NONE")
    setOpenWeek(OPEN_WEEKS[0].value)
    setOpenHour(OPEN_HOURS[0].value)
  }

  function handleApply() {
    if (openTime !== "OPEN_AT") {
      onApply({ openTime })
    } else {
      onApply({ openTime, openWeek, openHour })
    }
  }

  return (
    <Container>
      <Title>
        <span>篩選條件</span>
        <CloseButton src="/cancel.svg" alt="cancel" onClick={onClose} />
      </Title>
      <Content>
        <OpenTimeGroup
          onChange={handleOpenTimeChange}
          openTime={openTime}
          openWeek={openWeek}
          openHour={openHour}
        />
        <h3>標籤</h3>
        <h3>地圖顯示</h3>
      </Content>
      <FilterActions>
        <ClearText onClick={handleClear}>清除全部</ClearText>
        <ApplyButton onClick={handleApply}>套用搜尋</ApplyButton>
      </FilterActions>
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

const FilterActions = styled.div`
  height: 95px;
  padding: 0 32px 0 41px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid ${grey04};
`

const ClearText = styled.span`
  text-decoration-line: underline;
  font-size: 16px;
  color: ${grey01};
  cursor: pointer;
`

const ApplyButton = styled.button`
  border: none;
  background-color: ${grey01};
  border-radius: 12px;
  height: 44px;
  padding: 0 20px;
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
`

export default FilterForm
