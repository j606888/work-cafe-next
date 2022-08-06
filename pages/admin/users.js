import React from "react"
import AdminLayout from "src/components/AdminLayout"
import StickyHeadTable from "src/components/StickyHeadTable"

function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
    if (+match === 0) return "" // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase()
  })
}

function createCol(name, align) {
  return {
    id: camelize(name),
    label: name,
    align,
    minWidth: 170,
    format: align === "right" ? (value) => value.toLocaleString("en-US") : null,
  }
}

function createData(name, email, addStore, likes, createdAt) {
  return { name, email, addStore, likes, createdAt }
}

const columns = [
  createCol("Name"),
  createCol("Email"),
  createCol("AddStore", "right"),
  createCol("Likes", "right"),
  createCol("CreatedAt", "right"),
]

const rows = [
  createData("James", "j606888@gmail.com", 24, 120, "2022/06/22"),
  createData("Steve", "qwersteve8@gmail.com", 2, 22, "2022/08/13"),
  createData("Bob", "bob@gmail.com", 99, 349, "2022/01/01"),
  createData("Emily", "emily@gmail.com", 2, 0, "2022/09/30"),
  createData("John", "john123@gmail.com", 3, 1, "2022/09/21"),
  createData("Carol", "carol@gmail.com", 48, 231, "2022/05/08"),
  createData("James", "j606888@gmail.com", 24, 120, "2022/06/22"),
  createData("Steve", "qwersteve8@gmail.com", 2, 22, "2022/08/13"),
  createData("Bob", "bob@gmail.com", 99, 349, "2022/01/01"),
  createData("Emily", "emily@gmail.com", 2, 0, "2022/09/30"),
  createData("John", "john123@gmail.com", 3, 1, "2022/09/21"),
  createData("Carol", "carol@gmail.com", 48, 231, "2022/05/08"),
  createData("James", "j606888@gmail.com", 24, 120, "2022/06/22"),
  createData("Steve", "qwersteve8@gmail.com", 2, 22, "2022/08/13"),
  createData("Bob", "bob@gmail.com", 99, 349, "2022/01/01"),
  createData("Emily", "emily@gmail.com", 2, 0, "2022/09/30"),
  createData("John", "john123@gmail.com", 3, 1, "2022/09/21"),
  createData("Carol", "carol@gmail.com", 48, 231, "2022/05/08"),
]

const Users = () => {
  return (
    <AdminLayout>
      <StickyHeadTable columns={columns} rows={rows} />
    </AdminLayout>
  )
}

export default Users
