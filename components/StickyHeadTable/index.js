import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableContainer from "@mui/material/TableContainer"
import TablePagination from "@mui/material/TablePagination"
import Body from "./Body"
import Header from "./Header"

export default function StickyHeadTable({
  rows,
  totalCount,
  onChange,
  per,
  page,
  onPageChange,
  onPerChange,
}) {
  const handleChangePage = (_event, newPage) => {
    if (onPageChange) onPageChange(newPage + 1)
  }

  const handleChangeRowsPerPage = (event) => {
    if (onPerChange) onPerChange(+event.target.value)
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ height: "calc(100vh - 18rem)" }}>
        <Table stickyHeader aria-label="sticky table">
          <Header onChange={onChange} />
          <Body rows={rows} />
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={totalCount}
        rowsPerPage={per}
        page={page - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
