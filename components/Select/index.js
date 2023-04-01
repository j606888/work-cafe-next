import React, { useEffect, useState } from "react"
import styled, { css } from "styled-components"
import OptionList from "./OptionList"

const Select = ({
  options = [],
  onChange = () => {},
  disabled = false,
  defaultSelectedValue,
}) => {
  const [showOptions, setShowOptions] = useState(false)
  const [selectedValue, setSelectedValue] = useState(defaultSelectedValue)
  const selectedOption = options.find(
    (option) => option.value === selectedValue
  )

  function handleOnChange({ _label, value}) {
    setSelectedValue(value)
    setShowOptions(false)
    onChange(value)
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
    setSelectedValue(defaultSelectedValue)
  }, [defaultSelectedValue])

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
  color: ${({ theme }) => theme.colors.black01};
  background-color: #ffffff;
  border: 1px solid ${({ theme }) => theme.colors.grey01};
  cursor: pointer;

  ${({ disabled }) =>
    disabled &&
    css`
      color: ${({ theme }) => theme.colors.grey01};
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
