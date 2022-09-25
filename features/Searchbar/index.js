import React, { useEffect } from "react"
import MuiAutocomplete from "@mui/material/Autocomplete"
import useSWR from "swr"
import OptionBox from "./OptionBox"
import InputBox from "./InputBox"

const Searchbar = ({
  hasResult = false,
  onSearch = () => {},
  onClear = () => {},
  onOpenDrawer = () => {},
}) => {
  const [keyword, setKeyword] = React.useState("")
  const [resetBool, setResetBool] = React.useState(true)
  const { data } = useSWR(
    keyword.length > 0 ? ["/stores/hint", { keyword }] : null
  )
  const hints = data?.results?.map((hint) => ({
    ...hint,
    label: hint.name,
  }))

  const handleInputChange = async (event, newInputValue) => {
    setKeyword(newInputValue)

    const eventName = event._reactName
    if (eventName === "onClick" || eventName === "onKeyDown") {
      onSearch(newInputValue)
    }
  }
  const handleSearch = () => {
    if (keyword.length === 0) return
    onSearch(keyword)
  }
  const handleClear = () => {
    setKeyword("")
    onClear()
    // Use key to reset AutoComplete
    setResetBool(false)
  }

  useEffect(() => {
    if (!resetBool) setResetBool(true)
  }, [resetBool])

  const handleOnClick = () => {
    onSearch(keyword)
  }
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSearch(keyword)
    }
  }

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
          onOpenDrawer={onOpenDrawer}
        />
      )}
      renderOption={(props, option, { inputValue }) => (
        <OptionBox props={props} option={option} inputValue={inputValue} onClick={handleOnClick} />
      )}
      onInputChange={handleInputChange}
      onKeyDown={handleKeyDown}
    />
  )
}

export default Searchbar
