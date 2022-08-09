import React, { useEffect, useState } from 'react'
import AdminLayout from "src/components/AdminLayout"
import StickyHeadTable from 'src/components/StickyHeadTable'
import Api from '@/api/index'
import Select from '@/components/Select'
import cityMap from '@/config/cityMap'
import { Box } from '@mui/material'

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

function createData({ id, name, city, rating, user_ratings_total, phone }) {
  return {
    id, name, city, rating, user_ratings_total, phone
  }
}

const columns = [
  createCol("name", "Name"),
  createCol("city", "City"),
  createCol("rating", "Rating", "right"),
  createCol("phone", "Phone", "right"),
  createCol("user_ratings_total", "UserRatingsTotal", "right"),
]

const Stores = () => {
  const [rows, setRows] = useState([])
  const [page, setPage] = useState(1)
  const [per, setPer] = useState(5)
  const [cities, setCities] = useState([])
  const [paging, setPaging] = useState({
    current_page: 1,
    total_count: 0,
    total_pages: 0
  })

  const fetchStores = async () => {
    const params = {
      page: page,
      per: per,
      cities: cities,
    }
    const data = await Api.getStores(params)
    const formattedData = data.stores.map((d) => createData(d))
    setRows(formattedData)
    setPaging(data.paging)
  }

  const handleChange = (e) => {
    setCities(e.map((l) => l.value))
  }

  useEffect(() => {
    fetchStores()
  }, [per, page, cities])

  return (
    <AdminLayout>
      <Box mb={3}>
        <Select options={cityList} handleChange={handleChange} />
      </Box>
      <StickyHeadTable
        columns={columns}
        rows={rows}
        page={page - 1}
        setPage={setPage}
        paging={paging}
        per={per}
        setPer={setPer}
      />
    </AdminLayout>
  )
}

export default Stores
