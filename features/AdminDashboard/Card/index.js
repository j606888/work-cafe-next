import React from 'react'
import { Avatar } from '@mui/material'
import { Container } from './styled'

const Card = ({ title, number, icon, bgcolor }) => {
  const Icon = icon
  return (
    <Container>
      <div className="detail">
        <span>{title}</span>
        <h3>{number}</h3>
      </div>
      <Avatar sx={{ bgcolor: bgcolor, width: 48, height: 48 }}>
        <Icon />
      </Avatar>
    </Container>
  )
}

export default Card
