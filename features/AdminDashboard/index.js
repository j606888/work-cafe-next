import React from 'react'
import styled from 'styled-components'
import {
  InsertPhoto as InsertPhotoIcon,
  Comment as CommentIcon,
  Store as StoreIcon,
  Person as PersonIcon,
} from '@mui/icons-material'
import Card from './Card'

const Container = styled.div`
  padding: 1.5rem;

  .cards {
    display: flex;
    gap: 2rem;
    justify-content: space-between;
  }
`

const mockData = [
  {
    title: "Total Store",
    number: "3,600",
    icon: StoreIcon,
    bgcolor: "#D14343",
  },
  {
    title: "Total User",
    number: "230",
    icon: PersonIcon,
    bgcolor: "#14B8A6",
  },
  {
    title: "Total Photo",
    number: "1,350",
    icon: InsertPhotoIcon,
    bgcolor: "#FEAF1F",
  },
  {
    title: "Total Comments",
    number: "2,400",
    icon: CommentIcon,
    bgcolor: "#5048E4",
  },
]

const Dashboard = () => {
  return (
    <Container>
      <div className="cards">
        {mockData.map((data) => (
          <Card key={data.title} {...data} />
        ))}
      </div>
    </Container>
  )
}

export default Dashboard