import {
  Box,
  Divider,
  Grid,
  Paper,
} from "@mui/material"
import useSWR from "swr"

const AdminBlacklist = () => {
  const { data: chainStores } = useSWR("/admin/chain-stores")
  if (!chainStores) return <div>Loading...</div>

  return (
    <Paper sx={{ p: 4 }}>
      <h1>連鎖店清單</h1>
      <Divider sx={{ marginY: 4 }} />
      <h3>白名單</h3>
      <Grid container spacing={2}>
        {chainStores
          .filter((chainStore) => !chainStore.isBlacklist)
          .map((chainStore) => {
            return (
              <Grid
                item
                key={chainStore.id}
                xs={4}
                md={3}
                lg={2}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Box component="span" ml={1}>
                  {chainStore.name}({chainStore.chainStoreMapsCount})
                </Box>
              </Grid>
            )
          })}
      </Grid>
      <Divider sx={{ marginY: 4 }} />
      <h3>黑名單</h3>
      <Grid container spacing={2}>
        {chainStores
          .filter((chainStore) => chainStore.isBlacklist)
          .map((chainStore) => {
            return (
              <Grid
                item
                key={chainStore.id}
                xs={4}
                md={3}
                lg={2}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Box component="span" ml={1}>
                  {chainStore.name}({chainStore.chainStoreMapsCount})
                </Box>
              </Grid>
            )
          })}
      </Grid>
    </Paper>
  )
}

export default AdminBlacklist
