import React, { useEffect, useState } from 'react'
import AdminLayout from "src/components/AdminLayout"
import StickyHeadTable from 'src/components/StickyHeadTable'
import Api from '@/api/index'

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
  const [paging, setPaging] = useState({
    current_page: 1,
    total_count: 0,
    total_pages: 0
  })

  const fetchStores = async () => {
    const params = {
      page: page,
      per: per
    }
    const data = await Api.getStores(params)
    const formattedData = data.stores.map((d) => createData(d))
    setRows(formattedData)
    setPaging(data.paging)
  }

  useEffect(() => {
    fetchStores()
  }, [per, page])

  return (
    <AdminLayout>
      <StickyHeadTable
        columns={columns}
        rows={rows}
        page={page-1}
        setPage={setPage}
        paging={paging}
        per={per}
        setPer={setPer}
      />
    </AdminLayout>
  )
}

export default Stores
