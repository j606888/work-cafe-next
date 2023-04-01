import { FormControlLabel, Switch } from "@mui/material"
import React from "react"
import styled from "styled-components"

import store from "stores/store"
import { alpha, styled as muiStyled } from  '@mui/material/styles'
import { colors } from 'constants/styled-theme'

const CustomSwitch = muiStyled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: colors.grey01,
    "&:hover": {
      backgroundColor: alpha(colors.grey01, theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: colors.grey02,
  },
  "& .MuiSwitch-track": {
    backgroundColor: colors.grey02,
  },
}))

const ShowLabelCheckbox = () => {
  const { showLabel, setShowLabel } = store((state) => ({
    showLabel: state.showLabel,
    setShowLabel: state.setShowLabel,
  }))
  const handleChange = () => {
    setShowLabel(!showLabel)
  }
  return (
    <Container>
      <FormControlLabel
        control={
          <CustomSwitch
            checked={showLabel}
            onChange={handleChange}
          />
        }
        label={<Span>店名</Span>}
      />
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  right: 28px;
  top: 32px;
  padding-left: 0.7rem;
  border: 1px solid #e8e6e4;
  border-radius: 20px;
  width: 114px;
  height: 56px;
  background-color: #ffffff;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`

const Span = styled.span`
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #222120;
`

export default ShowLabelCheckbox
