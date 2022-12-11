import React from "react"
import Option from "./Option"
import styled from "styled-components"

const OptionList = ({ show, hints, focusedIndex, onClick }) => {
  if (!show) return null
  if (!hints) return null
  if (hints.length === 0) return null

  const handleClick = ({ type, name, address }) => {
    const keyword = type === "district" ? address + name : name
    onClick(keyword)
  }

  return (
    <Container>
      {hints.map((result, index) => (
        <Option
          key={`${result.name}${result.placeId}`}
          result={result}
          onClick={() => handleClick(result)}
          focus={index === focusedIndex}
        />
      ))}
    </Container>
  )
}

const Container = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 56px;
  width: 100%;
  border: 1px solid #afaaa3;
  border-radius: 20px;
  background-color: #ffffff;
  z-index: 1;
  padding: 12px 0;
  overflow: hidden;
`

export default OptionList
