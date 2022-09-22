import { Checkbox, FormControlLabel } from "@mui/material"
import React, { useState } from "react"
import styled from "styled-components"

const Container = styled.div`
  position: absolute;
  left: 41rem;
  top: 1rem;
  padding: 0 0.7rem;
  border-radius: 12px;
  box-shadow: 0 0 4px 2px rgba(0,0,0,0.3);
  background-color: #ffffff;
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
        control={<Checkbox checked={checked} onChange={handleChange} />}
        label="顯示店名"
      />
    </Container>
  )
}

export default ShowLabelCheckbox
