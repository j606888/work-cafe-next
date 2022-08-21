import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableContainer from "@mui/material/TableContainer"
import TablePagination from "@mui/material/TablePagination"
import Body from "./Body"
import Header from "./Header"

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
          <Body rows={rows} />
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
