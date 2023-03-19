import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
} from "@mui/material"
import Dialog from "components/Dialog"
import React, { useState } from "react"
import CityCenter from "constants/city-center"
import { createStore, storeGoogleSearch } from "api/stores"
import StoreCard from "./StoreCard"

const REPORT_URL = "https://forms.gle/ievHHnQT6U3UNQEdA"

const NewStore = ({ open, onClose }) => {
  const [location, setLocation] = useState("")
  const [keyword, setKeyword] = useState("")
  const [stores, setStores] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const canSearch = location && keyword

  const handleLocationChange = (event) => {
    setLocation(event.target.value)
  }

  const handleSearch = async () => {
    setIsLoading(true)
    try {
      const res = await storeGoogleSearch({ keyword, location })
      setStores(res)
    } catch (error) {
      setNotFound(true)
    }
    setIsLoading(false)
  }

  const handleCreateStore = async (placeId) => {
    setIsLoading(true)
    await createStore({ placeId })
    setIsLoading(false)
    window.location.href = `/share/${placeId}`
  }

  function handleClose() {
    setNotFound(false)
    setStores([])
    setLocation("")
    setKeyword("")
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box sx={{ maxWidth: 420 }}>
        <h3>新增店家</h3>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="select-city-label">店家縣市</InputLabel>
          <Select
            labelId="select-city-label"
            id="select-city"
            label="店家縣市"
            onChange={handleLocationChange}
            value={location}
            fullWidth
          >
            {CityCenter.map((city) => (
              <MenuItem key={city.name} value={city.center}>
                {city.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 180 }} size="small">
          <TextField
            size="small"
            label="店家名稱"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ m: 1 }} size="small">
          <Button
            variant="contained"
            onClick={handleSearch}
            disabled={!canSearch}
          >
            查詢
          </Button>
        </FormControl>
        {notFound && (
          <Alert severity="error" sx={{ mt: 2 }}>
            搜尋不到店家QQ，只能麻煩你
            <a href={REPORT_URL} target="_blank" rel="noreferrer">
              回報
            </a>
            了
          </Alert>
        )}
        {stores.map((store) => (
          <StoreCard
            store={store}
            key={store.placeId}
            onClick={handleCreateStore}
          />
        ))}
        {isLoading && <LinearProgress />}
      </Box>
    </Dialog>
  )
}

export default NewStore
