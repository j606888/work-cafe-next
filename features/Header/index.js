import React from 'react'
import { Container } from './styled'
import Searchbar from 'features/Searchbar'

const Header = ({ withSearchBar = false }) => {
  return (
    <Container>
      <h3>Work Cafe | Taiwan</h3>
      {withSearchBar && <Searchbar />}
      <div>
        <a href="#">註冊</a>
        <a href="#">登入</a>
      </div>
    </Container>
  )
}

export default Header
