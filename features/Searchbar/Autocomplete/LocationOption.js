import LocationOnIcon from "@mui/icons-material/LocationOn"
import CircleIcon from "@mui/icons-material/Circle"
import { Box, Typography } from "@mui/material"
import parse from "autosuggest-highlight/parse"
import match from "autosuggest-highlight/match"

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

export default LocationOption
