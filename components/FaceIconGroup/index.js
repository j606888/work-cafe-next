import FaceIcon from 'components/FaceIcon'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  gap: 0.2rem;
`

const FaceIconGroup = ({ fontSize, mood }) => {
  return (
    <Container>
      <FaceIcon size={fontSize} type="bad" active={mood === "bad"} />
      <FaceIcon size={fontSize} type="normal" active={mood === "normal"} />
      <FaceIcon size={fontSize} type="happy" active={mood === "happy"} />
    </Container>
  )
}

export default FaceIconGroup
