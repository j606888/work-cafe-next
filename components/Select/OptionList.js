import React from "react"
import Option from "./Option"
import styled from "styled-components"

const OptionList = ({ show, options, onClick }) => {
  if (!show) return null
  if (options.length === 0) return null

  return (
    <Container>
      {options.map((option, index) => (
        <Option key={index} onClick={() => onClick(option)}>{option.label}</Option>
      ))}
    </Container>
  )
}

const Container = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 52px;
  width: 100%;
  border: 1px solid #afaaa3;
  border-radius: 12px;
  background-color: #ffffff;
  z-index: 1;
  padding: 4px 0;
  overflow: hidden;
  max-height: 156px;
  overflow-y: scroll;
`

export default OptionList
