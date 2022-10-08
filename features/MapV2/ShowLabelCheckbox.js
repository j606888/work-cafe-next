import { Checkbox, FormControlLabel, Switch } from "@mui/material"
import React, { useState } from "react"
import styled from "styled-components"

const Container = styled.div`
  position: absolute;
  left: 1rem;
  top: 1rem;
  padding-left: 0.7rem;
  border-radius: 12px;
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.3);
  background-color: #ffffff;
  z-index: 2;

  span {
    font-size: 12px;
  }
`

const ShowLabelCheckbox = ({ onChange = () => {} }) => {
  const [checked, setChecked] = useState(true)
  const handleChange = (event) => {
    setChecked(event.target.checked)
    onChange(event.target.checked)
  }
  return (
    <Container>
      <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} />}
        label={<span>顯示店名</span>}
      />
    </Container>
  )
}

export default ShowLabelCheckbox
