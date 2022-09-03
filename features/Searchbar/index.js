import Autocomplete from "./Autocomplete"
import Menu from "./Menu"
import storeApi from "api/stores"
import { Container } from "./styled"
import Button from "components/Button"
import { useSelector, useDispatch } from 'react-redux'
import { updateOpenFilter, updateKeyword } from 'store/slices/search'
import useSWR from "swr"

const Searchbar = ({ onClick }) => {
  const dispatch = useDispatch()
  const filter = useSelector(state => state.search)
  const { data: hints } = useSWR(filter.keyword ? ["/stores/hint", filter] : null, storeApi.fetcher2)

  function handleInputChange(newInputValue) {
    dispatch(updateKeyword(newInputValue))
  }

  function changeOpenTimeChange(openType, openWeek, openHour) {
    dispatch(updateOpenFilter({ openType, openWeek: +openWeek, openHour: +openHour}))
  }

  function handleOnClick() {
    if(onClick) onClick()
  }

  const coolHints = (hints?.results || []).map(hint => ({
    ...hint,
    label: hint.name
  }))

  return (
    <Container>
      <Autocomplete options={coolHints} onInputChange={handleInputChange} keyword={filter.keyword}  />
      <div className="filter">
        <Menu onOpenTimeChange={changeOpenTimeChange} initValue={filter} />
      </div>
      <Button text="搜尋" onClick={handleOnClick} />
    </Container>
  )
}
export default Searchbar
