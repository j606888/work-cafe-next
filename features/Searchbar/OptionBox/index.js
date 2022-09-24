import StoreOption from "../StoreOption"
import LocationOption from "../LocationOption"
import { Box } from "@mui/system"

const OptionBox = ({ props, option, inputValue, onClick }) => {
  return (
    <Box {...props} onClick={onClick}>
      {option.type === "store" ? (
        <StoreOption {...option} inputValue={inputValue} />
      ) : (
        <LocationOption {...option} inputValue={inputValue} />
      )}
    </Box>
  )
}

export default OptionBox
