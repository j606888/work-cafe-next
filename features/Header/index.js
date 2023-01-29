import React from "react"
import { Container } from "./styled"
import Link from "next/link"
import UserMenu from "./UserMenu"
import useUserStore from "stores/useUserStore"

const Header = () => {
  const user = useUserStore(state => state.user)
  const logout = useUserStore(state => state.logout)

  function handleLogout() {
    localStorage.clear()
    logout()
  }

  return (
    <Container>
      <Link href="/map">
        <h3>Work Cafe | Taiwan</h3>
      </Link>
      <div className="nav-links">
        <Link href="/map">Map</Link>
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
