import { grey01, grey03 } from "constants/color"
import React, { useEffect, useState } from "react"
import styled, { css } from "styled-components"
import OptionList from "./OptionList"

const Select = ({
  options = [],
  onChange = () => {},
  disabled = false,
  defaultSelectedOption,
}) => {
  const [showOptions, setShowOptions] = useState(false)
  const [selectedOption, setSelectedOption] = useState(
    defaultSelectedOption || options[0]
  )

  function handleOnChange(option) {
    setSelectedOption(option)
    setShowOptions(false)
    onChange(option)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".custom-select")) {
        setShowOptions(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    setSelectedOption(defaultSelectedOption)
  }, [defaultSelectedOption])

  const src = disabled ? "/arrows/down-grey.svg" : "/arrows/down-black.svg"

  return (
    <Container className="custom-select">
      <SelectedOption
        disabled={disabled}
        onClick={() => !disabled && setShowOptions(!showOptions)}
        onBlur={() => setShowOptions(false)}
      >
        {selectedOption.label}
        <DownButton src={src} alt="arrow-down" />
      </SelectedOption>
      <OptionList
        disabled={disabled}
        show={showOptions}
        onChange={handleOnChange}
        options={options}
      />
    </Container>
  )
}

const Container = styled.div`
  display: inline-block;
  position: relative;
  width: 140px;
  cursor: pointer;
`

const SelectedOption = styled.div`
  border-radius: 12px;
  position: relative;
  padding: 0 20px;
  height: 48px;
  line-height: 48px;
  color: ${grey01};
  background-color: #ffffff;
  border: 1px solid ${grey03};
  cursor: pointer;

  ${({ disabled }) =>
    disabled &&
    css`
      color: ${grey03};
      cursor: not-allowed;
    `}
`

const DownButton = styled.img`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
`

export default Select
