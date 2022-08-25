import React from "react"
import TextField from "@mui/material/TextField"
import MuiAutocomplete from "@mui/material/Autocomplete"
import { Box } from "@mui/material"
import StoreOption from "./StoreOption"
import LocationOption from "./LocationOption"

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
    <>
      <MuiAutocomplete
        disableClearable
        freeSolo
        id="combo-box-demo"
        options={options}
        sx={{ width: 360 }}
        onChange={handleChange}
        onInputChange={handleInputChange}
        renderInput={(params) => <TextField {...params} label="搜尋" />}
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
    </>
  )
}
