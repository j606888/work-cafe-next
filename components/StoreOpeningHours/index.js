import React from "react"
import styled from "styled-components"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import { Grid } from "@mui/material"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"

const Container = styled.div`
  width: 320px;

  p {
    margin: 0;
    padding: 0;
  }

  .closeText {
    color: #dc2b2b;
  }

  .openText {
    color: #2d9b31;
  }
`

const StoreOpeningHours = ({ openingHours, isOpen }) => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <AccessTimeIcon />
        </Grid>
        <Grid item xs={4}>
          {isOpen ? (
            <span className="openText">營業中</span>
          ) : (
            <span className="closeText">休息中</span>
          )}
        </Grid>
        <Grid item xs={6}>
          <KeyboardArrowUpIcon />
        </Grid>
        {openingHours.map((openingHour) => {
          const periods = openingHour.periods.map((period) => {
            return (
              <p key={`${period.start}${period.end}`}>
                {period.start} - {period.end}
              </p>
            )
          })
          return (
            <React.Fragment key={openingHour.label}>
              <Grid item xs={2}></Grid>
              <Grid item xs={4}>
                {openingHour.label}
              </Grid>
              <Grid item xs={6}>
                {periods.length === 0 ? "休息" : periods}
              </Grid>
            </React.Fragment>
          )
        })}
      </Grid>
    </Container>
  )
}

export default StoreOpeningHours
