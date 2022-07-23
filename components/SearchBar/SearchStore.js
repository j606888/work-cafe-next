import * as React from "react"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import { InputAdornment } from "@mui/material"
import { Circle } from "@mui/icons-material"

export default function SearchStore() {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={countries}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <div ref={params.InputProps.ref}>
          <TextField
            {...params}
            placeholder="找哪裡的咖啡店？"
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position="start"
                  sx={{ marginRight: 0.9, marginLeft: 0.7 }}
                >
                  <Circle />
                </InputAdornment>
              ),
            }}
          />
        </div>
      )}
    />
  )
}

const countries = [
  { label: "台北市", text: "Taipei" },
  { label: "台北縣", text: "Taipei" },
  { label: "台中市", text: "Taipei" },
  { label: "台中縣", text: "Taipei" },
  { label: "台南市", text: "Taipei" },
  { label: "高雄市", text: "Taipei" },
]
