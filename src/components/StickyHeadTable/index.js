import * as React from "react"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"
import Header from "./Header"

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "city", label: "City", minWidth: 100 },
  {
    id: "likes",
    label: "Likes",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "photos",
    label: "Photos",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "comments",
    label: "Comments",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
]

function createData(name, city, likes, photos, comments) {
  return { name, city, likes, photos, comments }
}

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

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <Header columns={columns} />
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id]
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
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
