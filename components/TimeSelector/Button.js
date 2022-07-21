import styled from "@emotion/styled"
import MuiButton from "@mui/material/Button"

const ColorButton = styled(MuiButton)(({ theme }) => ({
  color: '#757575',
  borderRadius: 8,
  borderColor: '#757575',
}))

const Button = ({ children }) => {
  return <ColorButton variant="outlined" size="small">{children}</ColorButton>
}

export default Button
