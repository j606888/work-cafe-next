import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material"
import { useState } from "react"
import { snakeCase } from 'lodash'

const Header = ({ onHeaderClick, cols }) => {
  const [order, setOrder] = useState("desc")
  const [orderBy, setOrderBy] = useState("id")

  const handleSort = (id) => {
    const snakeId = snakeCase(id)
    if (orderBy === snakeId) {
      setOrder((curOrder) => (curOrder === "asc" ? "desc" : "asc"))
    } else {
      setOrderBy(snakeId)
      setOrder("asc")
    }

    if (onHeaderClick) onHeaderClick(order, orderBy)
  }

  return (
    <TableHead>
      <TableRow>
        {cols.map((column) => (
          <TableCell
            key={column.id}
            align={column.align}
            style={{ minWidth: 170 }}
            sortDirection={order}
          >
            {column.canOrder ? (
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
