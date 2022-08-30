import React from 'react'
import styled from 'styled-components'
import ForkRightIcon from '@mui/icons-material/ForkRight';

const Container = styled.div`
  text-align: center;
  display: inline-flex;
  flex-direction: column;
  align-items: center;

  span {
    color: #1B72E8;
    font-size: 12px;
    margin-top: 8px;
  }
`
const Circle = styled.div`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 50%;
  background-color: ${({primary}) => primary ? '#1B72E8' : '#fff'};
  border: 1px solid #1B72E8;
`

const ActionButton = ({type="road", primary=false}) => {

  return (
    <Container >
      <Circle primary={primary}>
        <ForkRightIcon sx={{color: primary ? '#fff' : '#1B72E8'}} />
      </Circle>
      <span>規劃路線</span>
    </Container>
  )
}

export default ActionButton
