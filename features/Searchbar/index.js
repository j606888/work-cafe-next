import Autocomplete from "./Autocomplete"
import Menu from "./Menu"
import storeApi from "api/stores"
import useApi from "hooks/useApi"
import { useState } from "react"
import { useEffect } from "react"
import { Container } from "./styled"
import { Divider } from "@mui/material"
import Button from "components/Button"

const Searchbar = () => {
  const getHintApi = useApi(storeApi.getHint)
  const [results, setResults] = useState([])

  useEffect(() => {
    const hints = getHintApi.data?.results?.map((hint) => ({
      ...hint,
      label: hint.name,
    }))
    setResults(hints || [])
  }, [getHintApi.data])

  function handleInputChange(newInputValue) {
    if (newInputValue === "") {
      setResults([])
    } else {
      getHintApi.request({ keyword: newInputValue })
    }
  }

  return (
    <Container>
      <Autocomplete options={results} onInputChange={handleInputChange} />
      <Divider
        orientation="vertical"
        variant="middle"
        flexItem
        sx={{ mx: 1, borderColor: '#333' }}
      />
      <Menu />
      <Button text="搜尋" />
    </Container>
  )
}
export default Searchbar
