import React, { useEffect } from "react"
import styled from "styled-components"
import MenuIcon from "@mui/icons-material/Menu"
import SearchIcon from "@mui/icons-material/Search"
import WhereToVoteIcon from "@mui/icons-material/WhereToVote"
import { Divider, Tooltip } from "@mui/material"
import MuiAutocomplete from "@mui/material/Autocomplete"
import { Box } from "@mui/system"
import StoreOption from "features/Searchbar/Autocomplete/StoreOption"
import LocationOption from "features/Searchbar/Autocomplete/LocationOption"
import useSWR from "swr"
import { fetcher } from "api"
import ClearIcon from "@mui/icons-material/Clear"

const Container = styled.div`
  background-color: #fff;
  display: inline-flex;
  align-items: center;
  padding: 12px 16px;
  border: 1px solid #ccc;
  border-radius: 12px;
  gap: 0.8rem;
`

const Input = styled.input`
  width: 240px;
  border: none;
  outline: none;
  font-size: 16px;
`

const InputBox = ({
  args,
  hasResult = false,
  onSearch = () => {},
  onClear = () => {},
}) => {
  const handleSearch = () => {
    onSearch()
  }

  const handleClear = () => {
    onClear()
  }

  return (
    <Container ref={args.InputProps.ref}>
      <Tooltip title="選單">
        <MenuIcon sx={{ color: "#333333", cursor: "pointer" }} />
      </Tooltip>
      <Input {...args.inputProps} placeholder="搜尋 Google 地圖" />
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

const SearchbarV2 = ({
  onSearch = () => {},
  hasResult = false,
  onClear = () => {},
}) => {
  const [resetBool, setResetBool] = React.useState(true)
  const [params, setParams] = React.useState({
    keyword: "",
  })
  const { data } = useSWR(
    params.keyword.length > 0 ? ["/stores/hint", params] : null,
    fetcher
  )
  const hints = data?.results?.map((hint) => ({
    ...hint,
    label: hint.name,
  }))

  async function handleInputChange(event, newInputValue) {
    setParams({ keyword: newInputValue })

    const eventName = event._reactName
    console.log(eventName)
    if (eventName === 'onClick') {
      onSearch(params.keyword)
    }
  }

  const handleSearch = () => {
    if (params.keyword.length === 0) return

    onSearch(params.keyword)
  }

  const handleClear = () => {
    setParams({ keyword: "" })
    onClear()
    // Use key to reset AutoComplete
    setResetBool(false)
  }

  useEffect(() => {
    if (!resetBool) setResetBool(true)
  }, [resetBool])

  return (
    <MuiAutocomplete
      freeSolo
      id="cool"
      options={hints || []}
      key={resetBool}
      renderInput={(args) => (
        <InputBox
          args={args}
          hasResult={hasResult}
          onSearch={handleSearch}
          onClear={handleClear}
        />
      )}
      renderOption={(props, option, { inputValue }) => (
        <OptionBox props={props} option={option} inputValue={inputValue}  />
      )}
      onInputChange={handleInputChange}
    />
  )
}

export default SearchbarV2
