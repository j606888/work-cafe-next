import React from 'react'
import { Avatar } from '@mui/material'
import { Container } from './styled'

const Card = ({ title, value, icon, bgcolor }) => {
  const Icon = icon
  return (
    <Container>
      <div className="detail">
        <span>{title}</span>
        <h3>{value}</h3>
      </div>
      <Avatar sx={{ bgcolor: bgcolor, width: 48, height: 48 }}>
        <Icon />
      </Avatar>
    </Container>
  )
}

export default Card
