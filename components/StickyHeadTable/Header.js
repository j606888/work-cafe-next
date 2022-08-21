import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material"
import { useEffect, useState } from "react"
import { snakeCase } from 'lodash'

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
  createCol("userRatingsTotal", "UserRatingsTotal", "right", true),
  createCol("url", "googleUrl", "right", false),
]

const Header = ({ onChange }) => {
  const [order, setOrder] = useState("asc")
  const [orderBy, setOrderBy] = useState("name")

  const handleSort = (id) => {
    const snakeId = snakeCase(id)
    if (orderBy === snakeId) {
      setOrder((curOrder) => (curOrder === "asc" ? "desc" : "asc"))
    } else {
      setOrderBy(snakeId)
      setOrder("asc")
    }
  }

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
