import { Checkbox, FormControlLabel } from "@mui/material"
import { orange100 } from "constants/color"
import React from "react"
import styled from "styled-components"

const MapDisplayGroup = ({ wakeUp, hideChain, onChange = () => {} }) => {
  function handleChangeWakeUp(e) {
    onChange("wakeUp", e.target.checked)
  }
  function handleChangeHideChain(e) {
    onChange("hideChain", e.target.checked)
  }

  return (
    <Container>
      <h3>地圖顯示</h3>
      <FormControlLabel
        control={
          <Checkbox
            sx={{ "&.Mui-checked": { color: orange100 } }}
            checked={wakeUp}
            onChange={handleChangeWakeUp}
          />
        }
        label="只顯示有評論的店家"
      />
      <br />
      <FormControlLabel
        control={
          <Checkbox
            sx={{ "&.Mui-checked": { color: orange100 } }}
            checked={hideChain}
            onChange={handleChangeHideChain}
          />
        }
        label="隱藏連鎖店家"
      />
    </Container>
  )
}

const Container = styled.div``
export default MapDisplayGroup
