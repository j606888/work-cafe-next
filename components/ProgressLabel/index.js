import { LinearProgress, Tooltip } from "@mui/material"
import React from "react"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  align-items: center;

  .label {
    width: 20%;
    font-size: 12px;
    color: #333;
  }

  .number {
    width: 1rem;
    font-size: 12px;
    color: #333;
  }

  div {
    flex: 1;
  }
`

const ProgressLabel = ({ label, number, percentage }) => {
  return (
    <Tooltip title={number} placement="right">
      <Container>
        <span className="label">{label}</span>
        <div>
          <LinearProgress variant="determinate" value={percentage} />
        </div>
      </Container>
    </Tooltip>
  )
}

export default ProgressLabel
