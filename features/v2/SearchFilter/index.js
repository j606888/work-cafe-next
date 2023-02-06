import { Dialog, Drawer, useMediaQuery } from "@mui/material"
import { devices } from "constants/styled-theme"
import { useState } from "react"
import ButtonWithCount from "./ButtonWithCount"
import FilterForm from "./FilterForm"

const SearchFilter = () => {
  const [open, setOpen] = useState(false)
  const [filterCount, setFilterCount] = useState(0)
  const fullScreen = useMediaQuery(devices.mobileXl)

  function handleClose() {
    setOpen(false)
  }

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
          <FilterForm onClose={handleClose} />
        </Dialog>
      )}
    </>
  )
}

export default SearchFilter
