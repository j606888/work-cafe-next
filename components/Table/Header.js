import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material"
import { useEffect, useState } from "react"

const Header = ({ onHeaderClick, cols }) => {
  const [order, setOrder] = useState("asc")
  const [orderBy, setOrderBy] = useState("name")

  const handleSort = (id) => {
    if (orderBy === id) {
      setOrder((curOrder) => (curOrder === "asc" ? "desc" : "asc"))
    } else {
      setOrderBy(id)
      setOrder("asc")
    }

      // if (onHeaderClick) {
        onHeaderClick(order, orderBy)
      // }
  }

  // useEffect(() => {
  //   if (onHeaderClick) 
  // }, [order, orderBy])

  return (
    <TableHead onClick={() => console.log("HOOO")}>
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
