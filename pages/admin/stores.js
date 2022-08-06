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

function createData(name, city, likes, photos, comments) {
  return { name, city, likes, photos, comments }
}

const columns = [
  createCol("Name"),
  createCol("City"),
  createCol("Likes", "right"),
  createCol("Photos", "right"),
  createCol("Comments", "right"),
]

const rows = [
  createData("南島夢遊", "台南市", 124, 20, 15),
  createData("亮家", "台南市", 15, 2, 2),
  createData("自己的房間", "台南市", 240, 43, 24),
  createData("叁七茶房", "台南市", 15, 22, 5),
  createData("木卯咖啡", "台南市", 31, 2, 0),
  createData("鬼咖啡", "台南市", 312, 22, 9),
  createData("南島夢遊", "台南市", 124, 20, 15),
  createData("亮家", "台南市", 15, 2, 2),
  createData("自己的房間", "台南市", 240, 43, 24),
  createData("叁七茶房", "台南市", 15, 22, 5),
  createData("木卯咖啡", "台南市", 31, 2, 0),
  createData("鬼咖啡", "台南市", 312, 22, 9),
  createData("鬼咖啡", "台南市", 312, 22, 9),
  createData("南島夢遊", "台南市", 124, 20, 15),
  createData("亮家", "台南市", 15, 2, 2),
  createData("自己的房間", "台南市", 240, 43, 24),
  createData("叁七茶房", "台南市", 15, 22, 5),
  createData("木卯咖啡", "台南市", 31, 2, 0),
  createData("鬼咖啡", "台南市", 312, 22, 9),
]

const Stores = () => {
  return (
    <AdminLayout>
      <StickyHeadTable columns={columns} rows={rows} />
    </AdminLayout>
  )
}

export default Stores
