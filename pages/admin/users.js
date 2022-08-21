import React, { useState } from "react"
import AdminLayout from "components/AdminLayout"
import Table from "components/Table"
import { getUsers } from "api/users"
import { useEffect } from "react"
import Skeleton from "components/Skeleton"

const columns = [
  createCol('id', 'ID', 'left', true),
  createCol('name', 'Name', 'left', false),
  createCol('email', 'Email', 'right', false),
  createCol('createdAt', 'Created At', 'right', true),
]

function createCol(id, label, align, canOrder) {
  return {
    id,
    label,
    align,
    canOrder
  }
}
const Users = () => {  
  const [rows, setRows] = useState([])
  const [params, setParams] = useState({
    page: 1,
    per: 10,
    order: "desc",
    orderBy: "id",
  })
  const [totalCount, setTotalCount] = useState(0)
  
  useEffect(() => {
    async function callAPI() {
      const res = await getUsers(params)
      setRows(res.users)
      setTotalCount(res.paging.totalCount)
    }
    callAPI()
  }, [params])

  async function handleHeaderClick(order, orderBy) {
    setParams((curParams) => ({ ...curParams, order, orderBy }))
  }

  async function handleOnPageChange(newPage) {
    setParams((curParams) => ({ ...curParams, page: newPage }))
  }

  async function handleOnPerChange(newPer) {
    setParams((curParams) => ({ ...curParams, per: newPer, page: 1 }))
  }

  // TODO, use useReduce to refactor
  if (rows.length === 0) {
    return <Skeleton />
  }

  return (
    <AdminLayout>
      <Table 
        cols={columns}
        rows={rows}
        type='User'
        totalCount={totalCount}
        onPageChange={handleOnPageChange}
        onPerChange={handleOnPerChange}
        onHeaderClick={handleHeaderClick}
        {...params}
      />
    </AdminLayout>
  )
}

export default Users
