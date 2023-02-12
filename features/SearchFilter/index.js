import { Dialog, Drawer, useMediaQuery } from "@mui/material"
import { OPEN_HOURS, OPEN_WEEKS } from "constants/openTime"
import { devices } from "constants/styled-theme"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import ButtonWithCount from "./ButtonWithCount"
import FilterForm from "./FilterForm"

const MobileDrawerStyle = {
  borderTopLeftRadius: "20px",
  borderTopRightRadius: "20px",
  maxHeight: "85%",
}
const SearchFilter = () => {
  const storedFilters = JSON.parse(localStorage.getItem("filters"))
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [filterCount, setFilterCount] = useState(
    +localStorage.getItem("filterCount")
  )
  const fullScreen = useMediaQuery(devices.mobileXl)

  const [openType, setOpenType] = useState(storedFilters?.openType || "NONE")
  const [openWeek, setOpenWeek] = useState(
    storedFilters?.openWeek || OPEN_WEEKS[0].value
  )
  const [openHour, setOpenHour] = useState(
    storedFilters?.openHour || OPEN_HOURS[0].value
  )
  const [wakeUp, setWakeUp] = useState(storedFilters?.wakeUp || false)
  const [hideChain, setHideChain] = useState(storedFilters?.hideChain || false)
  const [tagIds, setTagIds] = useState(storedFilters?.tagIds || [])

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
      {fullScreen ? (
        <Drawer
          open={open}
          onClose={handleClose}
          anchor="bottom"
          PaperProps={fullScreen && { sx: MobileDrawerStyle }}
        >
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
            _openType={openType}
            _openWeek={openWeek}
            _openHour={openHour}
            _wakeUp={wakeUp}
            _hideChain={hideChain}
            _tagIds={tagIds}
          />
        </Dialog>
      )}
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
