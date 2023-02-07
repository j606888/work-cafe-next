import { Dialog, Drawer, useMediaQuery } from "@mui/material"
import { OPEN_HOURS, OPEN_WEEKS } from "constants/openTime"
import { devices } from "constants/styled-theme"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import ButtonWithCount from "./ButtonWithCount"
import FilterForm from "./FilterForm"

const SearchFilter = () => {
  const storedFilters = JSON.parse(localStorage.getItem("filters"))
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [filterCount, setFilterCount] = useState(+localStorage.getItem("filterCount"))
  const fullScreen = useMediaQuery(devices.mobileXl)

  const [openTime, setOpenTime] = useState(storedFilters?.openTime || "NONE")
  const [openWeek, setOpenWeek] = useState(storedFilters?.openWeek || OPEN_WEEKS[0].value)
  const [openHour, setOpenHour] = useState(storedFilters?.openHour || OPEN_HOURS[0].value)
  const [wakeUp, setWakeUp] = useState(storedFilters?.wakeUp || false)
  const [tagIds, setTagIds] = useState(storedFilters?.tagIds || [])

  function handleClose() {
    setOpen(false)
  }

  function handleApply({ openTime, openWeek, openHour, wakeUp, tagIds }) {
    let count = 0
    if (openTime !== "NONE") count+=1
    if (wakeUp) count+=1
    count += tagIds.length
    setFilterCount(count)

    if (openTime) setOpenTime(openTime)
    if (openWeek) setOpenWeek(openWeek)
    if (openHour) setOpenHour(openHour)
    setWakeUp(wakeUp)
    setTagIds(tagIds)

    let query = {
      openTime,
      openWeek,
      openHour,
      wakeUp,
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
      {fullScreen ? (
        <Drawer open={open} onClose={handleClose} anchor="bottom">
          This is drawer
        </Drawer>
      ) : (
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{ sx: { borderRadius: "20px" } }}
        >
          <FilterForm
            onClose={handleClose}
            onApply={handleApply}
            _openTime={openTime}
            _openWeek={openWeek}
            _openHour={openHour}
            _wakeUp={wakeUp}
            _tagIds={tagIds}
          />
        </Dialog>
      )}
    </>
  )
}

function _filterCleanSettings(settings) {
  const result = {}

  if (settings.openTime !== 'NONE') result.openTime = settings.openTime
  if (settings.openTime === "OPEN_AT") {
    result.openWeek = settings.openWeek
    if (settings.openHour !== 99) {
      result.openHour = settings.openHour
    }
  }

  if (!!settings.wakeUp) result.wakeUp = settings.wakeUp
  if (settings.tagIds.length !== 0) result.tagIds = settings.tagIds

  return result
}

export default SearchFilter
