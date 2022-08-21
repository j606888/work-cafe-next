import React from "react"
import Paper from "@mui/material/Paper"
import TableContainer from "@mui/material/TableContainer"
import Header from "./Header"
import Body from "./Body"
import { TablePagination } from "@mui/material"

const Table = ({
  type,
  rows,
  cols,
  totalCount = 999,
  per = 10,
  page = 1,
  onPageChange,
  onPerChange,
}) => {
  function handlePageChange(_event, newPage) {
    if (onPageChange) onPageChange(newPage + 1)
  }

  function handlePerChange(event) {
    if (onPerChange) onPerChange(+event.target.value)
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", minHeigh: "100vh" }}>
      {/* <TableContainer sx={{ height: "calc(100vh - 18rem)" }}> */}
      <TableContainer sx={{ height: "calc(100vh - 6rem)" }}>
        <Header cols={cols} />
        <Body rows={rows} type={type} />
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={totalCount}
        rowsPerPage={per}
        page={page - 1}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handlePerChange}
      />
    </Paper>
  )
}

export default Table
