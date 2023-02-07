import { Checkbox, FormControlLabel } from "@mui/material"
import { orange100 } from "constants/color"
import React from "react"
import styled from "styled-components"

const MapDisplayGroup = ({ wakeUp, onChange = () => {} }) => {
  function handleChange(e) {
    onChange('wakeUp', e.target.checked)
  }

  return (
    <Container>
      <h3>地圖顯示</h3>
      <FormControlLabel
        control={
          <Checkbox
            sx={{ "&.Mui-checked": { color: orange100 } }}
            checked={wakeUp}
            onChange={handleChange}
          />
        }
        label="只顯示有評論的店家"
      />
    </Container>
  )
}

const Container = styled.div``
export default MapDisplayGroup
