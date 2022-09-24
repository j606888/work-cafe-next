import {
  Menu as MenuIcon,
  Search as SearchIcon,
  WhereToVote as WhereToVoteIcon,
  Clear as ClearIcon,
} from "@mui/icons-material"
import { Divider, Tooltip } from "@mui/material"
import { Container, Input } from "./styled"

const InputBox = ({
  args,
  hasResult = false,
  onSearch = () => {},
  onClear = () => {},
  onOpenDrawer = () => {},
}) => {
  const handleSearch = () => {
    onSearch()
  }
  const handleClear = () => {
    onClear()
  }

  return (
    <Container ref={args.InputProps.ref}>
      <Tooltip title="選單" onClick={onOpenDrawer}>
        <MenuIcon sx={{ color: "#333333", cursor: "pointer" }} />
      </Tooltip>
      <Input {...args.inputProps} placeholder="搜尋 縣市、區域或店名" />
      <Tooltip title="搜尋" onClick={handleSearch}>
        <SearchIcon sx={{ color: "#CCCCCC", cursor: "pointer" }} />
      </Tooltip>
      <Divider orientation="vertical" flexItem />
      {hasResult ? (
        <Tooltip title="清除搜尋" onClick={handleClear}>
          <ClearIcon sx={{ color: "#8AB4F8", cursor: "pointer" }} />
        </Tooltip>
      ) : (
        <Tooltip title="這裡">
          <WhereToVoteIcon sx={{ color: "#8AB4F8", cursor: "pointer" }} />
        </Tooltip>
      )}
    </Container>
  )
}

export default InputBox
