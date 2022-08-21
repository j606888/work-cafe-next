import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material"
import { useEffect, useState } from "react"

function createCol(id, label, align, allowOrder) {
  return {
    id,
    label,
    align,
    allowOrder,
  }
}

const columns = [
  createCol("name", "Name", "left", true),
  createCol("city", "City", "right", true),
  createCol("rating", "Rating", "right", true),
  createCol("phone", "Phone", "right", false),
  createCol("userRatingsTotal", "UserRatingsTotal", "right", true),
  createCol("url", "googleUrl", "right", false),
]

const Header = ({ onChange }) => {
  const [order, setOrder] = useState("asc")
  const [orderBy, setOrderBy] = useState("name")

  const handleSort = (id) => {
    if (orderBy === id) {
      setOrder((curOrder) => (curOrder === "asc" ? "desc" : "asc"))
    } else {
      setOrderBy(id)
      setOrder("asc")
    }
  }

  // TODO, Ask, if I use like this will cause Maximum update depth exceed, but how to make it without warning?
  useEffect(() => {
    if (onChange) onChange(order, orderBy)
  }, [order, orderBy])

  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.align}
            style={{ minWidth: 170 }}
            sortDirection={order}
          >
            {column.allowOrder ? (
              <TableSortLabel
                active={column.id === orderBy}
                direction={orderBy === column.id ? order : "asc"}
                onClick={() => handleSort(column.id)}
              >
                {column.label}
              </TableSortLabel>
            ) : (
              column.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default Header
