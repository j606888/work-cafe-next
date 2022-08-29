import React from 'react'
import styled from 'styled-components'

const Container = styled.input`
  border: none;
  font-size: 16px;
  outline: none;
  color: #666;
`

const Input = ({ placeholder, args, value }) => {
  return <Container {...args} placeholder={placeholder} value={value} />
}

export default Input
