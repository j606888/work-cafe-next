import React, { useState } from "react"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import CircleIcon from "@mui/icons-material/Circle"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { Menu, MenuItem } from "@mui/material"
import NotCafeReport from "features/StoreDetail/NotCafeReport"
import { Container, BackButton, ButtonGroup, Button } from "./styled"
import ShareButton from "./ShareButton"

const Header = ({ name, placeId, onClick }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [openNotCafe, setOpenNotCafe] = useState(false)
  const open = Boolean(anchorEl)

  function handleMoreClick(e) {
    setAnchorEl(e.currentTarget)
  }
  function handleClose() {
    setAnchorEl(null)
    setOpenNotCafe(false)
  }

  return (
    <>
      <Container>
        <BackButton onClick={onClick}>
          <ArrowBackIcon />
        </BackButton>
        <h3>{name}</h3>
        <ButtonGroup>
          <Button>
            <CircleIcon />
            <span>收藏</span>
          </Button>
          <ShareButton />
          <Button onClick={handleMoreClick}>
            <MoreVertIcon />
          </Button>
        </ButtonGroup>
      </Container>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => setOpenNotCafe(true)}>回報不是咖啡廳</MenuItem>
      </Menu>
      <NotCafeReport
        placeId={placeId}
        open={openNotCafe}
        onClose={handleClose}
      />
    </>
  )
}

export default Header