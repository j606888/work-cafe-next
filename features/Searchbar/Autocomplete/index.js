import React from "react"
import TextField from "@mui/material/TextField"
import MuiAutocomplete from "@mui/material/Autocomplete"
import { Box, InputAdornment } from "@mui/material"
import StoreOption from "./StoreOption"
import AccountCircle from "@mui/icons-material/AccountCircle"
import LocationOption from "./LocationOption"
import Circle from "@mui/icons-material/Circle"
import styled from "styled-components"
import Input from "components/Input"

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export default function Autocomplete({
  options = [],
  onInputChange,
  onChange,
}) {
  function handleChange(_event, newValue) {
    if (onChange) onChange(newValue)
  }

  async function handleInputChange(_event, newInputValue) {
    if (onInputChange) onInputChange(newInputValue)
  }

  return (
    <MuiAutocomplete
      freeSolo
      id="combo-box-demo"
      options={options}
      sx={{ width: 340 }}
      onChange={handleChange}
      onInputChange={handleInputChange}
      renderInput={(params) => (
        <Container ref={params.InputProps.ref}>
          <Circle sx={{color: '#ccc', mr:1, ml: .5 }} />
          <Input args={params.inputProps} placeholder="搜尋" />
        </Container>
      )}
      renderOption={(props, option, { inputValue }) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          {option.type === "store" ? (
            <StoreOption {...option} inputValue={inputValue} />
          ) : (
            <LocationOption {...option} inputValue={inputValue} />
          )}
        </Box>
      )}
    />
  )
}
