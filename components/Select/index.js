import { grey01, grey03 } from 'constants/color'
import React, { useState } from 'react'
import styled from 'styled-components'
import OptionList from './OptionList'

const Select = ({ options=[], onChange }) => {
  const [showOptions, setShowOptions] = useState(false)
  const [value, setValue] = useState("")

  function handleOptionClick(option) {
    setValue(option)
    setShowOptions(false)
  }
  return (
    <Wrapper>
      <Container
        onClick={() => setShowOptions(!showOptions)}
        onBlur={() => setShowOptions(false)}
      >
        {value.label}
        <DownButton src="/arrows/down-grey.svg" alt="arrow-down" />
      </Container>
      <OptionList
        show={showOptions}
        onClick={handleOptionClick}
        options={options}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 140px;
`

const Container = styled.div`
  border-radius: 12px;
  position: relative;
  padding: 0 20px;
  height: 48px;
  line-height: 48px;
  color: ${grey01};
  background-color: #ffffff;
  border: 1px solid ${grey03};
  cursor: pointer;
`

const DownButton = styled.img`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
`

export default Select
