import { Box, LinearProgress as MuiLinearProgress } from "@mui/material"
import { styled } from "@mui/material/styles"
import  {
  linearProgressClasses,
} from "@mui/material/LinearProgress"
import { colors } from "constants/styled-theme"

const CustomLinear = styled(MuiLinearProgress)(({ theme }) => ({
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      colors.green01
  },
  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor: colors.green02
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
