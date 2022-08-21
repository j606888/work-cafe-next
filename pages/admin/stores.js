import React, { useEffect, useState } from "react"
import AdminLayout from "components/AdminLayout"
import StickyHeadTable from "components/StickyHeadTable"
import { getStores } from "api/stores"
import Select from "components/Select"
import cityMap from "config/cityMap"
import { Box } from "@mui/material"
import RatingSelect from "components/Select/RatingSelect"
import Skeleton from "components/Skeleton"

const cityList = cityMap.map((city) => city.name)

function createCol(id, name, align) {
  return {
    id: id,
    label: name,
    align,
    minWidth: 170,
    format: align === "right" ? (value) => value.toLocaleString("en-US") : null,
  }
}

const columns = [
  createCol("name", "Name"),
  createCol("city", "City"),
  createCol("rating", "Rating", "right"),
  createCol("phone", "Phone", "right"),
  createCol("userRatingsTotal", "UserRatingsTotal", "right"),
  createCol("url", "googleUrl", "right"),
]

const Stores = () => {
  const [rows, setRows] = useState([])
  const [params, setParams] = useState({
    page: 1,
    per: 10,
    rating: null,
    cities: [],
    order: "desc",
    orderBy: "name",
  })
  const [totalCount, setTotalCount] = useState(0)

  const handleChange = (e) => {
    const cities = e.map((l) => l.value)
    setParams((curParams) => ({ ...curParams, cities: cities }))
  }

  useEffect(() => {
    async function fetchStores() {
      const data = await getStores(params)
      setRows(data.stores)
      setTotalCount(data.paging.totalCount)
    }
    fetchStores()
  }, [params])

  if (rows.length === 0) {
    return <Skeleton />
  }

  async function handleOnChange(order, orderBy) {
    setParams((curParams) => ({ ...curParams, order, orderBy }))
  }

  async function handleOnPageChange(newPage) {
    setParams((curParams) => ({ ...curParams, page: newPage }))
  }

  async function handleOnPerChange(newPer) {
    setParams((curParams) => ({ ...curParams, per: newPer, page: 1 }))
  }

  async function handleOnRatingChange(newRating) {
    setParams((curParams) => ({ ...curParams, rating: newRating }))
  }

  return (
    <AdminLayout>
      <Box mb={1}>
        <RatingSelect rating={params.rating} onChange={handleOnRatingChange} />
      </Box>
      <Box mb={2}>
        <Select options={cityList} handleChange={handleChange} />
      </Box>
      <StickyHeadTable
        columns={columns}
        rows={rows}
        totalCount={totalCount}
        onChange={handleOnChange}
        onPageChange={handleOnPageChange}
        onPerChange={handleOnPerChange}
        {...params}
      />
    </AdminLayout>
  )
}

export default Stores
