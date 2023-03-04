import { Checkbox, Tooltip, FormControlLabel, Box } from "@mui/material"
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
      <h3>其他</h3>
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
        label={
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <span>隱藏連鎖店家</span>
            <Tooltip placement="right" title="如：星巴克、路易莎、cama café 等連鎖店家">
              <img src="/help.svg" alt="help" width="28px" height="28px" />
            </Tooltip>
          </Box>
        }
      />
    </Container>
  )
}

const Container = styled.div``
export default MapDisplayGroup
