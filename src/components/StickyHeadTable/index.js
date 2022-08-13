import * as React from "react"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"
import Header from "./Header"
import Link from 'next/link'

export default function StickyHeadTable({ columns, rows, params, setParams, totalCount }) {
  const handleChangePage = (event, newPage) => {
    setParams((curParams) => ({ ...curParams, page: newPage+1 }))
  }

  const handleChangeRowsPerPage = (event) => {
    setParams((curParams) => ({
      ...curParams,
      per: +event.target.value,
      page: 1,
    }))
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ height: 'calc(100vh - 18rem)' }}>
        <Table stickyHeader aria-label="sticky table">
          <Header columns={columns} params={params} setParams={setParams} />
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id]
                    if (column.id === "name") {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          <Link href={`/admin/stores/${row.place_id}`}>{value}</Link>
                          {/* <a target="_blank" href={row.url}>
                            {value}
                          </a> */}
                        </TableCell>
                      )
                    }
                    if (column.id === "url") {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          <a target="_blank" href={row.url}>
                            Google Map
                          </a>
                        </TableCell>
                      )
                    }
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={totalCount}
        rowsPerPage={params.per}
        page={params.page-1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
