import { grey01, grey04 } from "constants/color"
import { OPEN_HOURS, OPEN_WEEKS } from "constants/openTime"
import { devices } from "constants/styled-theme"
import React, { useState } from "react"
import styled from "styled-components"
import MapDisplayGroup from "./MapDisplayGroup"
import OpenTimeGroup from "./OpenTimeGroup"
import TagsGroup from "./TagsGroup"

const FilterForm = ({
  onClose,
  _openType,
  _openWeek,
  _openHour,
  _wakeUp,
  _tagIds,
  onApply,
}) => {
  const [openType, setOpenType] = useState(_openType)
  const [openWeek, setOpenWeek] = useState(_openWeek)
  const [openHour, setOpenHour] = useState(_openHour)
  const [wakeUp, setWakeUp] = useState(_wakeUp)
  const [tagIds, setTagIds] = useState(_tagIds)

  const setters = {
    openType: setOpenType,
    openWeek: setOpenWeek,
    openHour: setOpenHour,
    wakeUp: setWakeUp,
    tagIds: setTagIds,
  }

  function handleChange(key, value) {
    setters[key](value)
  }

  function handleClear() {
    setOpenType("NONE")
    setOpenWeek(OPEN_WEEKS[0].value)
    setOpenHour(OPEN_HOURS[0].value)
    setWakeUp(false)
    setTagIds([])
  }

  function handleApply() {
    if (openType !== "OPEN_AT") {
      onApply({ wakeUp, tagIds, openType })
    } else {
      onApply({ wakeUp, tagIds, openType, openWeek, openHour })
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
          onChange={handleChange}
          openType={openType}
          openWeek={openWeek}
          openHour={openHour}
        />
        <TagsGroup tagIds={tagIds} onChange={handleChange} />
        <MapDisplayGroup wakeUp={wakeUp} onChange={handleChange} />
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

  @media ${devices.mobileXl} {
    width: 100%;
  }
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

  @media ${devices.mobileXl} {
    height: 62px;
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

  @media ${devices.mobileXl} {
    max-height: calc(100% - 62px - 80px);
    overflow-y: scroll;
    padding: 26px 29px;

    h3 {
      font-size: 20px;
      line-height: 27px;
      margin-bottom: 12px;
    }
  }
`

const FilterActions = styled.div`
  height: 95px;
  padding: 0 32px 0 41px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid ${grey04};

  @media ${devices.mobileXl} {
    height: 80px;
  }
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
