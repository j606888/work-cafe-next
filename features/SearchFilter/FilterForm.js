import { Divider } from "@mui/material"
import CloseButton from "components/CloseButton"
import { OPEN_HOURS, OPEN_WEEKS } from "constants/openTime"

import React, { useEffect, useState } from "react"
import styled from "styled-components"
import MapDisplayGroup from "./MapDisplayGroup"
import OpenTimeGroup from "./OpenTimeGroup"
import TagsGroup from "./TagsGroup"
import create from "zustand"

export const selectedTagIdsStore = create((set) => ({
  selectedTagIds: [],
  setSelectedTagIds: (selectedTagIds) => set({ selectedTagIds }),
}))

const FilterForm = ({
  onClose,
  _openType,
  _openWeek,
  _openHour,
  _wakeUp,
  _hideChain,
  _tagIds,
  onApply,
}) => {
  const [openType, setOpenType] = useState(_openType)
  const [openWeek, setOpenWeek] = useState(_openWeek)
  const [openHour, setOpenHour] = useState(_openHour)
  const [wakeUp, setWakeUp] = useState(_wakeUp)
  const [hideChain, setHideChain] = useState(_hideChain)
  const [tagIds, setTagIds] = useState(_tagIds)
  const { setSelectedTagIds } = selectedTagIdsStore((state) => ({
    setSelectedTagIds: state.setSelectedTagIds,
  }))

  useEffect(() => {
    setSelectedTagIds(tagIds)
  }, [tagIds, setSelectedTagIds])

  const setters = {
    openType: setOpenType,
    openWeek: setOpenWeek,
    openHour: setOpenHour,
    wakeUp: setWakeUp,
    hideChain: setHideChain,
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
    setHideChain(false)
    setTagIds([])
  }

  function handleApply() {
    if (openType !== "OPEN_AT") {
      onApply({ wakeUp, tagIds, hideChain, openType })
    } else {
      onApply({ wakeUp, tagIds, hideChain, openType, openWeek, openHour })
    }
  }

  return (
    <>
      <Header>
        <span>篩選條件</span>
        <CloseButton onClick={onClose} />
      </Header>
      <Divider />
      <Body>
        <OpenTimeGroup
          onChange={handleChange}
          openType={openType}
          openWeek={openWeek}
          openHour={openHour}
        />
        <TagsGroup tagIds={tagIds} onChange={handleChange} />
        <MapDisplayGroup wakeUp={wakeUp} hideChain={hideChain} onChange={handleChange} />
      </Body>
      <Divider />
      <Footer>
        <ClearText onClick={handleClear}>清除全部</ClearText>
        <ApplyButton onClick={handleApply}>套用搜尋</ApplyButton>
      </Footer>
    </>
  )
}

const Header = styled.div`
  height: 70px;
  text-align: center;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.black01};
  position: relative;

  span {
    margin: 0 auto;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 62px;
    flex-shrink: 0;
  }
`

const Body = styled.div`
  min-height: 300px;
  max-height: 650px;
  padding: 39px;
  max-height: calc(100% - 70px - 95px);
  overflow-y: auto;

  h3 {
    font-weight: 700;
    font-size: 24px;
    line-height: 33px;
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.black01};
    margin: 0;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 26px 29px;
    max-height: calc(100% - 62px - 80px);

    h3 {
      font-size: 20px;
      line-height: 27px;
      margin-bottom: 12px;
    }
  }
`

const Footer = styled.div`
  height: 95px;
  padding: 0 32px 0 41px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 80px;
    flex-shrink: 0;
  }
`

const ClearText = styled.span`
  text-decoration-line: underline;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.black01};
  cursor: pointer;
`

const ApplyButton = styled.button`
  border: none;
  background-color: ${({ theme }) => theme.colors.black01};
  border-radius: 12px;
  height: 44px;
  padding: 0 20px;
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
`

export default FilterForm
