import StoreIcon from "@mui/icons-material/Store"
import { Box } from "@mui/material"
import parse from "autosuggest-highlight/parse"
import match from "autosuggest-highlight/match"

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
          width: "95%",
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
export default StoreOption
