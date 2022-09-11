import { LinearProgress, Tooltip } from "@mui/material"
import React from "react"
import styled, { css } from "styled-components"

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  .label {
    width: 30%;
    font-size: 12px;

    ${({ win }) =>
      win
        ? css`
            color: #222;
            font-weight: 500;
          `
        : css`
            color: #888;
          `}
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
  const win = percentage === 100

  return (
    <Tooltip title={number} placement="right">
      <Container win={win}>
        <span className="label">{label}</span>
        <div>
          <LinearProgress variant="determinate" value={percentage} />
        </div>
      </Container>
    </Tooltip>
  )
}

export default ProgressLabel
