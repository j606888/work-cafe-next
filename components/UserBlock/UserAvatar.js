import { Avatar } from '@mui/material'
import React from 'react'

const UserAvatar = ({ user }) => {
  if (user.avatar_url) return <Avatar alt={user.name} src={user.avatar_url}/>

  return <Avatar>{ user.name[0]}</Avatar>
}

export default UserAvatar
