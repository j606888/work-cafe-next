import { Box, LinearProgress as MuiLinearProgress } from "@mui/material"
import { styled } from "@mui/material/styles"
import  {
  linearProgressClasses,
} from "@mui/material/LinearProgress"
import { orange100, orange50 } from "constants/color"


const CustomLinear = styled(MuiLinearProgress)(({ theme }) => ({
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      orange100
  },
  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor: orange50
  },
}))

const LinearProgress = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <CustomLinear />
    </Box>
  )
}

export default LinearProgress
