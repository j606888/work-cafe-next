import { Button, Checkbox, Dialog, FormControlLabel } from "@mui/material"
import React from "react"
import { useState } from "react"
import styled from "styled-components"

const Container = styled.div`
  width: 420px;
  padding: 2rem;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`

const SearchFilter = ({ defaultChecked = false, onChange = () => {} }) => {
  const [open, setOpen] = useState(defaultChecked)
  const [checked, setChecked] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setChecked(defaultChecked)
    setOpen(false)
  }
  const handleChange = (event) => {
    setChecked(event.target.checked)
  }
  const handleApply = () => {
    onChange(checked)
    setOpen(false)
  }

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        打開篩選器
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Container>
          <h2>篩選器</h2>
          <div>
            <FormControlLabel
              control={<Checkbox checked={checked} onChange={handleChange} />}
              label="只顯示評論過、被儲存過的店家"
            />
          </div>
          <ButtonGroup>
            <Button variant="outlined" onClick={handleClose}>
              取消
            </Button>
            <Button variant="contained" onClick={handleApply}>
              套用
            </Button>
          </ButtonGroup>
        </Container>
      </Dialog>
    </>
  )
}

export default SearchFilter
