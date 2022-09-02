import React from "react"
import { Container } from "./styled"
import Searchbar from "features/Searchbar"
import Link from "next/link"
import { getUser } from "utils/user"
import { useEffect } from "react"
import { useState } from "react"
import UserMenu from "./UserMenu"

const Header = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const u = getUser()
    setUser(u)
  }, [])

  function handleLogout() {
    localStorage.clear()
    setUser(null)
  }

  return (
    <Container>
      <Link href="/">
        <h3>Work Cafe | Taiwan</h3>
      </Link>
      <div className="nav-links">
        <Link href="/map">Map</Link>
        <Link href="/map/hidden">Hiddens</Link>
        <Link href="/">Bookmarks</Link>
      </div>
      <div>
        {user ? (
          <UserMenu user={user} onLogout={handleLogout} type="user" />
        ) : (
          <>
            <Link href="/signup">註冊</Link>
            <Link href="/login">登入</Link>
          </>
        )}
      </div>
    </Container>
  )
}

export default Header
