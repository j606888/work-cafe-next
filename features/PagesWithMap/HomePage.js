import LandingSearch from 'features/LandingSearch'
import React from 'react'
import styled from 'styled-components'

const HomePage = () => {
  return (
    <Container>
      <LandingSearch />
    </Container>
  )
}

export default HomePage

const Container = styled.div`
  position: fixed;
  top: calc(40px + 80px);
  left: 0;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    top: 0;
    right: 0;
    bottom: 0;
  }
`
