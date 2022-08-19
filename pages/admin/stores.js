import React, { useEffect, useState } from 'react'
import AdminLayout from "src/components/AdminLayout"
import StickyHeadTable from 'src/components/StickyHeadTable'
import { getStores  } from "@api/stores"
import Select from '@/components/Select'
import cityMap from '@/config/cityMap'
import { Box } from '@mui/material'
import RatingSelect from '@/components/Select/RatingSelect'

const cityList = cityMap.map((city) => city.name)

function createCol(id, name, align) {
  return {
    id: id,
    label: name,
    align,
    minWidth: 170,
    format: (align === 'right') ? (value) => value.toLocaleString("en-US") : null
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
    order: 'desc',
    orderBy: 'name',
  })
  const [totalCount, setTotalCount] = useState(0)

  const fetchStores = async () => {
    const data = await getStores(params)
    setRows(data.stores)
    setTotalCount(data.paging.totalCount)
  }

  const handleChange = (e) => {
    const cities = e.map((l) => l.value)
    setParams(curParams => ({ ...curParams, cities: cities }))
  }

  useEffect(() => {
    fetchStores()
  }, [params])

  return (
    <AdminLayout>
      <Box mb={1}>
        <RatingSelect params={params} setParams={setParams} />
      </Box>
      <Box mb={2}>
        <Select options={cityList} handleChange={handleChange} />
      </Box>
      {rows && (
        <StickyHeadTable
          columns={columns}
          rows={rows}
          params={params}
          setParams={setParams}
          totalCount={totalCount}
        />
      )}
    </AdminLayout>
  )
}

export default Stores
