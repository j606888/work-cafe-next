import * as React from "react"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import StoreIcon from '@mui/icons-material/Store';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CircleIcon from '@mui/icons-material/Circle';
import { Box, Typography } from "@mui/material"
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';


const DEFAULT_OPTIONS = [
  {
    label: "台南鹿柴咖啡",
    type: "store",
    address: "某個地址",
    placeId: "abc123",
    count: 1,
  },
  { label: "台南市", type: "city", address: null, placeId: null, count: 120 },
  { label: "台中市", type: "city", address: null, placeId: null, count: 33 },
  {
    label: "中西區",
    type: "district",
    address: null,
    placeId: null,
    count: 23,
  },
]

const LocationOption = ({ label, count, inputValue }) => {
  const matches = match(label, inputValue)
  const parts = parse(label, matches)

  return <Box sx={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
    <Box sx={{display: 'flex', alignItems: 'center' }}>
      <LocationOnIcon sx={{ color: '#999', fontSize: 16, mr: 1 }}/>
      <Typography variant="body2">
        {parts.map((part, index) => (<span key={index} style={{fontWeight: part.highlight ? 700 : 400}}>{part.text}</span>))}
      </Typography>
    </Box>
    <Box sx={{width: 64, display: 'flex', alignItems: 'center', color: '#ccc'}}>
      <CircleIcon sx={{ fontSize: 20, mr: 1 }} />
      <Typography variant="span">{count}</Typography>
    </Box>
  </Box>
}


export default function ComboBox({
  options = DEFAULT_OPTIONS,
  onInputChange,
  onChange,
}) {
  const [value, setValue] = React.useState(null)
  const [inputValue, setInputValue] = React.useState("")

  function handleChange(event, newValue) {
    setValue(newValue)
    if (onChange) onChange(newValue)
  }

  function handleInputChange(event, newInputValue) {
    setInputValue(newInputValue)
    if (onInputChange) onInputChange(newInputValue)
  }

  return (
    <>
      <Autocomplete
        disableClearable
        id="combo-box-demo"
        options={options}
        sx={{ width: 360 }}
        onChange={handleChange}
        onInputChange={handleInputChange}
        renderInput={(params) => <TextField {...params} label="搜尋" />}
        renderOption={(props, option, { inputValue }) => (
          <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
            <LocationOption {...option} inputValue={inputValue} />
            {/* <StoreIcon /> */}

            
            {/* {option.label} {option.address} {option.count} */}
          </Box>
        )}
      />
    </>
  )
}
