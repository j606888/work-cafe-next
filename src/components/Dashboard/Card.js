import React from 'react'
import styled from 'styled-components'
import { Avatar } from '@mui/material'

const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  background-color: white;
  align-items: center;
  padding: 2rem;
  border: none;
  border-radius: 8px;
  box-shadow: 
    0px 1px 1px rgb(100 116 139 / 6%),
    0px 1px 2px rgb(100 116 139 / 10%);
  gap: 1rem;

  .detail {
    h3 {
      font-weight: 600;
      margin: 0;
      font-size: 1.5rem;
      color: #000;
    }

    span {
      color: #555;
    }
  }
`

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
