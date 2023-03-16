import { Box, Button, Divider, Typography } from "@mui/material"
import React from "react"
import styled from "styled-components"
import RatingStars from "components/RatingStars"

const StoreCard = ({ store, onClick }) => {
  function handleClick() {
    onClick(store.placeId)
  }

  return (
    <Container>
      <Divider />
      <Typography variant="subtitle1">{store.name}</Typography>
      <RatingStars
        rating={store.rating}
        userRatingsTotal={store.userRatingsTotal}
        showRate
      />
      <Box>
        <Button size="small" variant="contained" onClick={handleClick}>
          新增這間店
        </Button>
      </Box>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 12px 0;
  gap: 8px;
`

export default StoreCard
