import * as React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import styled from "styled-components"

const Container = styled.div`
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
`

export default function SearchDialog({ open, handleClose, handleSearch }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          position: "fixed",
          top: "15%",
          left: "50%",
          transform: "translateX(-50%)",
        },
      }}
    >
      <Container>
        <span>搜尋這兒？</span>
        <Button onClick={handleSearch} autoFocus variant="contained">
          GO
        </Button>
      </Container>
    </Dialog>
  )
}
