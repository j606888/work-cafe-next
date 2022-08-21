
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import TableSortLabel from "@mui/material/TableSortLabel"
import { snakeCase } from "lodash"
import { useState } from "react"

function createCol(id, name, align) {
  return {
    id: id,
    label: name,
    align: align
  }
}

const columns = [
  createCol("name", "Name"),
  createCol("city", "City", "right"),
  createCol("rating", "Rating", "right"),
  createCol("phone", "Phone", "right"),
  createCol("userRatingsTotal", "UserRatingsTotal", "right"),
  createCol("url", "googleUrl", "right"),
]

const Header = ({  }) => {
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('name')

  const handleSort = (id) => {
    if (orderBy === id) {
      setOrder(curOrder => curOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setOrderBy(id)
      setOrder('asc')
    }
  }

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
            <TableSortLabel
              active={column.id === orderBy}
              direction={orderBy === column.id ? order : 'asc'}
              onClick={() => handleSort(column.id)}
            >
              {column.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default Header
