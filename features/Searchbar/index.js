import Autocomplete from "./Autocomplete"
import Menu from "./Menu"
import storeApi from "api/stores"
import useApi from "hooks/useApi"
import { useState, useEffect, useContext } from "react"
import { Container } from "./styled"
import Button from "components/Button"
import FilterContext from "contexts/FilterContext"

const Searchbar = () => {
  const getHintApi = useApi(storeApi.getHint)
  const [results, setResults] = useState([])
  const { keyword, setKeyword, openTime, setOpenTime} = useContext(FilterContext)

  useEffect(() => {
    const hints = getHintApi.data?.results?.map((hint) => ({
      ...hint,
      label: hint.name,
    }))
    setResults(hints || [])
  }, [getHintApi.data])

  function handleInputChange(newInputValue) {
    setKeyword(newInputValue)
  }

  function changeOpenTimeChange(openType, openWeek, openHour) {
    if (openType === 'none') {
      setOpenTime({})
    } else if (openType === 'openNow') {
      setOpenTime({ openType })
    } else if (openType === 'openAt') {
      if (openHour === '99') {
        setOpenTime({ openType, openWeek: +openWeek })
      } else {
        setOpenTime({ openType, openWeek: +openWeek, openHour: +openHour })
      }
    }
  }

  useEffect(() => {
    if (keyword === "") {
      setResults([])
    } else {
      getHintApi.request({ ...openTime, keyword })
    }
  }, [openTime, keyword])

  return (
    <Container>
      <Autocomplete options={results} onInputChange={handleInputChange} />
      <div className="filter">
        <Menu onOpenTimeChange={changeOpenTimeChange} />
      </div>
      <Button text="搜尋" />
    </Container>
  )
}
export default Searchbar
