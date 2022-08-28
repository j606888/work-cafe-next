import React from "react"
import styled, { css } from "styled-components"

const themes = {
  main: css`
    background: #757575;
    color: #ffffff;
  `
}

const sizes = {
  small: css`
    font-size: 12px;
    padding: 6px 12px;
    border-radius: 5px;
  `
}

const Outer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;

  ${({theme}) => themes[theme]}
  ${({size}) => sizes[size]}
`

const Button = ({ text, theme = 'main', size = 'small', link, onClick = null }) => {
  function handleOnClick() {
    if (onClick) onClick()
  }
  const btn = (
    <Outer theme={theme} size={size} onClick={handleOnClick}>
      {text}
    </Outer>
  )

  return link ? (<a href={link}>{btn}</a>) : (btn)
}

export default Button
