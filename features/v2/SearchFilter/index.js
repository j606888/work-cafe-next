import { Dialog, Drawer, useMediaQuery } from "@mui/material"
import { OPEN_HOURS, OPEN_WEEKS } from "constants/openTime"
import { devices } from "constants/styled-theme"
import { useEffect, useState } from "react"
import ButtonWithCount from "./ButtonWithCount"
import FilterForm from "./FilterForm"

const SearchFilter = () => {
  const [open, setOpen] = useState(false)
  const [filterCount, setFilterCount] = useState(0)
  const fullScreen = useMediaQuery(devices.mobileXl)
  const [openTime, setOpenTime] = useState("NONE")
  const [openWeek, setOpenWeek] = useState(OPEN_WEEKS[0].value)
  const [openHour, setOpenHour] = useState(OPEN_HOURS[0].value)
  const [wakeUp, setWakeUp] = useState(false)

  function handleClose() {
    setOpen(false)
  }

  function handleApply({ openTime, openWeek, openHour, wakeUp }) {
    if (openTime) setOpenTime(openTime)
    if (openWeek) setOpenWeek(openWeek)
    if (openHour) setOpenHour(openHour)
    if (wakeUp) setWakeUp(wakeUp)
    setOpen(false)
  }

  useEffect(() => {
    let count = 0
    if (openTime !== "NONE") count+=1
    if (wakeUp) count+=1
    setFilterCount(count)
  }, [openTime, wakeUp])

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
          />
        </Dialog>
      )}
    </>
  )
}

export default SearchFilter
