import React from "react"
import { Container } from "./styled"
import Searchbar from "features/Searchbar"
import Link from "next/link"

const Header = ({ withSearchBar = false }) => {
  return (
    <Container>
      <Link href="/">
        <h3>Work Cafe | Taiwan</h3>
      </Link>
      {withSearchBar && <Searchbar />}
      <div>
        <Link href="/signup">註冊</Link>
        <Link href="/login">登入</Link>
      </div>
    </Container>
  )
}

export default Header
