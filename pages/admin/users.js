import React, { useState } from "react"
import AdminLayout from "components/AdminLayout"
import StickyHeadTable from "components/StickyHeadTable"

function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
    if (+match === 0) return "" // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase()
  })
}

function createCol(id, name, align) {
  return {
    id: id,
    label: name,
    align,
    minWidth: 170,
    format: align === "right" ? (value) => value.toLocaleString("en-US") : null,
  }
}


function createData(id, name, email, addStore, likes, createdAt) {
  return { id, name, email, addStore, likes, createdAt }
}

const columns = [
  createCol("name", "Name"),
  createCol("email", "Email"),
  createCol("addStore", "AddStore", "right"),
  createCol("likes", "Likes", "right"),
  createCol("createdAt", "CreatedAt", "right"),
]

const rows = [
  createData(1, "James", "j606888@gmail.com", 24, 120, "2022/06/22"),
  createData(2, "Steve", "qwersteve8@gmail.com", 2, 22, "2022/08/13"),
  createData(3, "Bob", "bob@gmail.com", 99, 349, "2022/01/01"),
  createData(4, "Emily", "emily@gmail.com", 2, 0, "2022/09/30"),
  createData(5, "John", "john123@gmail.com", 3, 1, "2022/09/21"),
  createData(6, "Carol", "carol@gmail.com", 48, 231, "2022/05/08"),
  createData(7, "James", "j606888@gmail.com", 24, 120, "2022/06/22"),
  createData(8, "Steve", "qwersteve8@gmail.com", 2, 22, "2022/08/13"),
  createData(9, "Bob", "bob@gmail.com", 99, 349, "2022/01/01"),
  createData(10, "Emily", "emily@gmail.com", 2, 0, "2022/09/30"),
  createData(11, "John", "john123@gmail.com", 3, 1, "2022/09/21"),
  createData(12, "Carol", "carol@gmail.com", 48, 231, "2022/05/08"),
  createData(13, "James", "j606888@gmail.com", 24, 120, "2022/06/22"),
  createData(14, "Steve", "qwersteve8@gmail.com", 2, 22, "2022/08/13"),
  createData(15, "Bob", "bob@gmail.com", 99, 349, "2022/01/01"),
  createData(16, "Emily", "emily@gmail.com", 2, 0, "2022/09/30"),
  createData(17, "John", "john123@gmail.com", 3, 1, "2022/09/21"),
  createData(18, "Carol", "carol@gmail.com", 48, 231, "2022/05/08"),
]

const Users = () => {
  const [params, setParams] = useState({
    page: 1,
    per: 10
  })
  return (
    <AdminLayout>
      <StickyHeadTable
        columns={columns}
        rows={rows}
        params={params}
        setParams={setParams}
        totalCount={10}
      />
    </AdminLayout>
  )
}

export default Users
