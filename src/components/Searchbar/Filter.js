import React, { useState } from 'react'
import styled from 'styled-components'

const Filter = () => {
  const [opening, setOpening] = useState(false)
  const [openWeekdays, setOpenWeekdays] = useState([])

  const handleWeekday = (weekday) => {
    setOpenWeekdays(prev => {
      if (prev.includes(weekday)) {
        return prev.filter((w) => w !== weekday)
      } else {
        return [...prev, weekday]
      }
    })
  }

  const weekday_exist = (weekday) => {
    return openWeekdays.includes(weekday)
  }

  return (
    <FilterContainer>
      <span>套用標籤</span>
      <div>
        <OpeningBox isSelect={!opening} onClick={() => setOpening(false)}>
          不限時間
        </OpeningBox>
        <OpeningBox isSelect={opening} onClick={() => setOpening(true)}>
          營業中
        </OpeningBox>
      </div>
      <BreakLine>或</BreakLine>
      <span>指定營業日</span>
      <div>
        <OpeningBox isSelect={weekday_exist(1)} onClick={() => handleWeekday(1)}>週一</OpeningBox>
        <OpeningBox isSelect={weekday_exist(2)} onClick={() => handleWeekday(2)}>週二</OpeningBox>
        <OpeningBox isSelect={weekday_exist(3)} onClick={() => handleWeekday(3)}>週三</OpeningBox>
        <OpeningBox isSelect={weekday_exist(4)} onClick={() => handleWeekday(4)}>週四</OpeningBox>
        <OpeningBox isSelect={weekday_exist(5)} onClick={() => handleWeekday(5)}>週五</OpeningBox>
        <OpeningBox isSelect={weekday_exist(6)} onClick={() => handleWeekday(6)}>週六</OpeningBox>
        <OpeningBox isSelect={weekday_exist(7)} onClick={() => handleWeekday(7)}>週日</OpeningBox>
      </div>
    </FilterContainer>
  )
}


const OpeningBox = ({ isSelect, children, onClick }) => {
  const selectedStyle = {
    backgroundColor: "#757575",
    color: "#fff",
  }
  if (isSelect) {
    return (
      <OptionContainer style={selectedStyle} onClick={onClick}>
        {children}
      </OptionContainer>
    )
  }
  return <OptionContainer onClick={onClick}>{children}</OptionContainer>
}

const BreakLine = ({ children }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", margin: "16px 0" }}>
      <Line />
      {children}
      <Line />
    </div>
  )
}

const FilterContainer = styled.div`
  box-sizing: border-box;
  border: 1px solid #757575;
  width: 480px;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  color: #757575;

  & > div {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 12px;
  }
`

const OptionContainer = styled.div`
  border: 1px solid #757575;
  border-radius: 12px;
  font-size: 16px;
  padding: 8px 16px;
  cursor: pointer;
`

const Line = styled.span`
  border-top: 1px solid #757575;
  flex: 1;
  height: 1px;
`

export default Filter
