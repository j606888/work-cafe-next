import React from "react"
import styled from "styled-components"
import {
  InsertPhoto as InsertPhotoIcon,
  Comment as CommentIcon,
  Store as StoreIcon,
  Person as PersonIcon,
} from "@mui/icons-material"
import Card from "./Card"
import useSWR from "swr"
import { Skeleton } from "@mui/material"

const Container = styled.div`
  padding: 1.5rem;

  .cards {
    display: flex;
    gap: 2rem;
    justify-content: space-between;
  }
`

const REPORTS = [
  {
    title: "店家數量",
    key: "storeCount",
    icon: StoreIcon,
    bgcolor: "#D14343",
  },
  {
    title: "總用戶",
    key: "userCount",
    icon: PersonIcon,
    bgcolor: "#14B8A6",
  },
  {
    title: "照片量",
    key: "storePhotoCount",
    icon: InsertPhotoIcon,
    bgcolor: "#FEAF1F",
  },
  {
    title: "評論數",
    key: "reviewCount",
    icon: CommentIcon,
    bgcolor: "#5048E4",
  },
]

const SkeletonCard = () => (
  <Skeleton variant="rectangular" width={"100%"} height={180} />
)

const Dashboard = () => {
  const { data } = useSWR(`/admin/report/dashboard`)
  const loading = !Boolean(data)

  if (loading) {
    return (
      <Container>
        <div className="cards">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <div className="cards">
        {REPORTS.map(({ title, key, icon, bgcolor }) => (
          <Card
            key={key}
            title={title}
            icon={icon}
            bgcolor={bgcolor}
            value={data[key]}
          />
        ))}
      </div>
    </Container>
  )
}

export default Dashboard
