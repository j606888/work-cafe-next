import { grey01, grey03 } from 'constants/color'
import React from 'react'
import styled from 'styled-components'

const Select = ({ options=[1,2,3], onClick }) => {
  return (
    <Container>
      星期日
      <DownButton src="/arrows/down-grey.svg" alt="arrow-down" />
    </Container>
  )
}

const Container = styled.div`
  display: inline;
  min-width: 140px;
  max-width: 140px;
  border-radius: 12px;
  position: relative;
  padding: 0 20px;
  height: 48px;
  line-height: 48px;
  color: ${grey03};
  background-color: #ffffff;
  border: 1px solid ${grey03};
`

const DownButton = styled.img`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
`

export default Select
