import * as React from "react"
import Button from "@mui/material/Button"
import MuiMenu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import {
  Divider,
  ListItemIcon,
  ListItemText,
  MenuList,
  Paper,
  Typography,
} from "@mui/material"
import {
  Cloud,
  ContentCopy,
  ContentCut,
  ContentPaste,
} from "@mui/icons-material"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"

import styled from "styled-components"
const Container = styled.div`
  input {
    display: none;
  }

  label {
    box-sizing: border-box;
    display: inline-block;
    border: 1px solid #ccc;
    height: 36px;
    line-height: 36px;
    text-align: center;
    border-radius: 8px;
    margin: 6px;
    cursor: pointer;
  }

  input:checked ~ label {
    background-color: #E8F0FE;
    border: 2px solid #174FA6;
    color: #174FA6;
  }
`

const CustomRadio = ({ id, text, checked }) => {
  return (
  <Container>
    <input type="radio" name="select" id={id} checked={checked} />
    <label htmlFor={id} style={{ width: '84px' }}>
      {text}
    </label>
  </Container>
  )
}
export default function Menu() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <CustomRadio id="c-7" text="星期日"/>
      <CustomRadio id="c-1" text="星期一"/>
      <CustomRadio id="c-2" text="星期二"/>
      <CustomRadio id="c-3" text="星期三"/>
      <CustomRadio id="c-4" text="星期四"/>
      <CustomRadio id="c-5" text="星期五"/>
      <CustomRadio id="c-6" text="星期六"/>
      <Button id="basic-button" onClick={handleClick}>
        Dashboard
      </Button>
      <MuiMenu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <FormControl sx={{ width: "320px" }}>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <MenuItem sx={{ py: 0 }}>
              <FormControlLabel
                value="no-required"
                control={<Radio />}
                label="不限時間"
                sx={{ width: "100%" }}
              />
            </MenuItem>
            <MenuItem sx={{ py: 0 }}>
              <FormControlLabel
                value="open-now"
                control={<Radio />}
                label="營業中"
                sx={{ width: "100%" }}
              />
            </MenuItem>
            <Divider />
            <MenuItem sx={{ py: 0 }}>
              <FormControlLabel
                value="specific"
                control={<Radio />}
                label="營業時間"
                sx={{ width: "100%" }}
              />
            </MenuItem>
          </RadioGroup>
        </FormControl>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <ContentCut fontSize="small" />
          </ListItemIcon>
          <ListItemText>Cut</ListItemText>
          <Typography variant="body2" color="text.secondary">
            ⌘X
          </Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText>Copy</ListItemText>
          <Typography variant="body2" color="text.secondary">
            ⌘C
          </Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ContentPaste fontSize="small" />
          </ListItemIcon>
          <ListItemText>Paste</ListItemText>
          <Typography variant="body2" color="text.secondary">
            ⌘V
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Cloud fontSize="small" />
          </ListItemIcon>
          <ListItemText>Web Clipboard</ListItemText>
        </MenuItem>
      </MuiMenu>
    </div>
  )
}
