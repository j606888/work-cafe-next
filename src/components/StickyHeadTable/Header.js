import * as React from "react"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import TableSortLabel from '@mui/material/TableSortLabel';
import { snakeCase } from 'lodash'

const Header = ({ columns, params, setParams }) => {
  const handleSort = (id) => {
    if (params.orderBy === snakeCase(id)) {
      setParams((curParams) => ({ ...curParams, order: curParams.order === 'asc' ? 'desc' : 'asc' }))
    } else {
      setParams((curParams) => ({
        ...curParams,
        orderBy: snakeCase(id),
        order: "asc",
      }))
    }
  }

  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.align}
            style={{ minWidth: column.minWidth }}
            sortDirection={params.order}
          >
            <TableSortLabel
              active={column.id === params.orderBy}
              direction={params.order}
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
