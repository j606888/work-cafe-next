import React from 'react'
import AdminLayout from "src/components/AdminLayout"
import StickyHeadTable from 'src/components/StickyHeadTable'

function createCol(name, align) {
  return {
    id: name.toLowerCase(),
    label: name,
    align,
    minWidth: 170,
    format: (align === 'right') ? (value) => value.toLocaleString("en-US") : null
  }
}

function createData(id, name, city, likes, photos, comments) {
  return { id, name, city, likes, photos, comments }
}

const columns = [
  createCol("Name"),
  createCol("City"),
  createCol("Likes", "right"),
  createCol("Photos", "right"),
  createCol("Comments", "right"),
]

const rows = [
  createData(1, "南島夢遊", "台南市", 124, 20, 15),
  createData(2, "亮家", "台南市", 15, 2, 2),
  createData(3, "自己的房間", "台南市", 240, 43, 24),
  createData(4, "叁七茶房", "台南市", 15, 22, 5),
  createData(5, "木卯咖啡", "台南市", 31, 2, 0),
  createData(6, "鬼咖啡", "台南市", 312, 22, 9),
  createData(7, "南島夢遊", "台南市", 124, 20, 15),
  createData(8, "亮家", "台南市", 15, 2, 2),
  createData(9, "自己的房間", "台南市", 240, 43, 24),
  createData(10, "叁七茶房", "台南市", 15, 22, 5),
  createData(11, "木卯咖啡", "台南市", 31, 2, 0),
  createData(12, "鬼咖啡", "台南市", 312, 22, 9),
  createData(13, "鬼咖啡", "台南市", 312, 22, 9),
  createData(14, "南島夢遊", "台南市", 124, 20, 15),
  createData(15, "亮家", "台南市", 15, 2, 2),
  createData(16, "自己的房間", "台南市", 240, 43, 24),
  createData(17, "叁七茶房", "台南市", 15, 22, 5),
  createData(18, "木卯咖啡", "台南市", 31, 2, 0),
  createData(19, "鬼咖啡", "台南市", 312, 22, 9),
]

const Stores = () => {
  return (
    <AdminLayout>
      <StickyHeadTable columns={columns} rows={rows} />
    </AdminLayout>
  )
}

export default Stores
