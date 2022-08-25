import Autocomplete from "./Autocomplete"
import Menu from "./Menu"
import storeApi from "api/stores"
import useApi from "hooks/useApi"
import { useState } from "react"
import { useEffect } from "react"

const Searchbar = () => {
  const getHintApi = useApi(storeApi.getHint)
  const [results, setResults] = useState([])

  useEffect(() => {
    const hints = getHintApi.data?.results?.map(hint => ({
      ...hint,
      label: hint.name
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

  return <>
    <Autocomplete options={results} onInputChange={handleInputChange} />
    <Menu />
  </>
}
export default Searchbar
