import * as React from "react"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import StoreIcon from "@mui/icons-material/Store"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import CircleIcon from "@mui/icons-material/Circle"
import { Box, Typography } from "@mui/material"
import parse from "autosuggest-highlight/parse"
import match from "autosuggest-highlight/match"
import { getHint } from "api/stores"

const LocationOption = ({ label, count, inputValue }) => {
  const matches = match(label, inputValue)
  const parts = parse(label, matches)

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          overflowX: "hidden",
          width: 200,
          whiteSpace: "nowrap",
        }}
      >
        <LocationOnIcon sx={{ color: "#999", fontSize: 16, mr: 1 }} />
        <Typography variant="body2">
          {parts.map((part, index) => (
            <span
              key={index}
              style={{ fontWeight: part.highlight ? 700 : 400 }}
            >
              {part.text}
            </span>
          ))}
        </Typography>
      </Box>
      <Box
        sx={{ width: 64, display: "flex", alignItems: "center", color: "#ccc" }}
      >
        <CircleIcon sx={{ fontSize: 18, mr: 1 }} />
        <Typography variant="body2">{count}</Typography>
      </Box>
    </Box>
  )
}

const StoreOption = ({ label, address, inputValue }) => {
  const matches = match(label, inputValue)
  const parts = parse(label, matches)

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          overflowX: "hidden",
          width: "90%",
          whiteSpace: "nowrap",
        }}
      >
        <StoreIcon sx={{ color: "#999", fontSize: 16, mr: 1 }} />
        <span style={{ fontSize: "12px" }}>
          {parts.map((part, index) => (
            <span
              key={index}
              style={{ fontWeight: part.highlight ? 700 : 400 }}
            >
              {part.text}
            </span>
          ))}
        </span>
        <span style={{ marginLeft: "12px", fontSize: "6px", color: "#666" }}>
          {address}
        </span>
      </Box>
    </Box>
  )
}

export default function ComboBox({
  options = [],
  onInputChange,
  onChange,
}) {
  const [value, setValue] = React.useState(null)
  const [inputValue, setInputValue] = React.useState("")
  const parsedOptions = options.map((option) => ({
    ...option,
    label: option.name,
  }))

  const [op, setOp] = React.useState([])

  function handleChange(_event, newValue) {
    setValue(newValue)
    if (onChange) onChange(newValue)
  }

  async function handleInputChange(_event, newInputValue) {
    setInputValue(newInputValue)

    if (newInputValue === "") {
      setOp([])
    } else {
      const res = await getHint({ keyword: newInputValue })
      const hints = res.results.map((option) => ({
        ...option,
        label: option.name,
      }))
      setOp(hints)
    }
    if (onInputChange) onInputChange(newInputValue)
  }

  return (
    <>
      <Autocomplete
        disableClearable
        freeSolo
        id="combo-box-demo"
        options={op}
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
