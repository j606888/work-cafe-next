import { OPEN_HOURS, OPEN_WEEKS } from "constants/openTime"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import ButtonWithCount from "./ButtonWithCount"
import FilterForm from "./FilterForm"
import Wrapper from "./Ｗrapper"

const SearchFilter = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [filterCount, setFilterCount] = useState(0)

  const [openType, setOpenType] = useState("NONE")
  const [openWeek, setOpenWeek] = useState(OPEN_WEEKS[0].value)
  const [openHour, setOpenHour] = useState(OPEN_HOURS[0].value)
  const [wakeUp, setWakeUp] = useState(false)
  const [hideChain, setHideChain] = useState(false)
  const [tagIds, setTagIds] = useState([])

  useEffect(() => {
    const _filterCount = +localStorage.getItem("filterCount")
    setFilterCount(_filterCount)

    const storedFilters = JSON.parse(localStorage.getItem("filters"))
    if (storedFilters?.openType) setOpenType(storedFilters?.openType)
    if (storedFilters?.openWeek) setOpenWeek(storedFilters?.openWeek)
    if (storedFilters?.openHour) setOpenHour(storedFilters?.openHour)
    if (storedFilters?.wakeUp) setWakeUp(storedFilters?.wakeUp)
    if (storedFilters?.hideChain) setHideChain(storedFilters?.hideChain)
    if (storedFilters?.tagIds) setTagIds(storedFilters?.tagIds)
  }, [])

  function handleClose() {
    setOpen(false)
  }

  function handleApply({
    openType,
    openWeek,
    openHour,
    wakeUp,
    hideChain,
    tagIds,
  }) {
    let count = 0
    if (openType !== "NONE") count += 1
    if (wakeUp) count += 1
    if (hideChain) count += 1
    count += tagIds.length
    setFilterCount(count)

    if (openType) setOpenType(openType)
    if (openWeek) setOpenWeek(openWeek)
    if (openHour) setOpenHour(openHour)
    setWakeUp(wakeUp)
    setHideChain(hideChain)
    setTagIds(tagIds)

    let query = {
      openType,
      openWeek,
      openHour,
      wakeUp,
      hideChain,
      tagIds,
    }
    query = _filterCleanSettings(query)
    localStorage.setItem("filters", JSON.stringify(query))
    const pathWithoutQuery = router.asPath.split("?")[0]
    router.push({ pathname: pathWithoutQuery, query })

    setOpen(false)
  }

  useEffect(() => {
    localStorage.setItem("filterCount", filterCount)
  }, [filterCount])

  return (
    <>
      <ButtonWithCount onClick={() => setOpen(true)} count={filterCount} />
      <Wrapper open={open} onClose={handleClose}>
        <FilterForm
          onClose={handleClose}
          onApply={handleApply}
          _openType={openType}
          _openWeek={openWeek}
          _openHour={openHour}
          _wakeUp={wakeUp}
          _hideChain={hideChain}
          _tagIds={tagIds}
        />
      </Wrapper>
    </>
  )
}

function _filterCleanSettings(settings) {
  const result = {}

  if (settings.openType !== "NONE") result.openType = settings.openType
  if (settings.openType === "OPEN_AT") {
    result.openWeek = settings.openWeek
    if (settings.openHour !== 99) {
      result.openHour = settings.openHour
    }
  }

  if (!!settings.wakeUp) result.wakeUp = settings.wakeUp
  if (!!settings.hideChain) result.hideChain = settings.hideChain
  if (settings.tagIds.length !== 0) result.tagIds = settings.tagIds

  return result
}

export default SearchFilter
