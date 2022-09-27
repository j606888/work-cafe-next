import StoreOption from "../StoreOption"
import LocationOption from "../LocationOption"
import { Box } from "@mui/system"

const OptionBox = ({ props, option, inputValue }) => {
  return (
    <Box {...props} >
      {option.type === "store" ? (
        <StoreOption {...option} inputValue={inputValue} />
      ) : (
        <LocationOption {...option} inputValue={inputValue} />
      )}
    </Box>
  )
}

export default OptionBox
