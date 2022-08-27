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
  const [openTime, setOpenTime] = useState({})
  const [keyword, setKeyword] = useState("")

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
