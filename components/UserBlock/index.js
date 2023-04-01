import React from "react"
import styled from "styled-components"
import UserAvatar from "./UserAvatar"

const UserBlock = ({ user }) => {
  return (
    <Container>
      <UserAvatar user={user} />
      <div>
        <h4>{user.name}</h4>
        <span>{user.email}</span>
      </div>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  padding: 12px;
  gap: 6px;

  h4 {
    margin: 0;
  }

  span {
    font-size: 8px;
    color: ${({ theme }) => theme.colors.grey01};
  }
`

export default UserBlock
