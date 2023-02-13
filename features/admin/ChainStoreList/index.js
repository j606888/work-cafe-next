import { Box, Chip, Divider, Grid, Paper, Typography } from "@mui/material"
import useSWR from "swr"

const ChainStoreList = () => {
  const { data: chainStores } = useSWR("/admin/chain-stores")
  if (!chainStores) return <div>Loading...</div>

  const whitelist = chainStores.filter((s) => !s.isBlacklist)
  const blacklist = chainStores.filter((s) => s.isBlacklist)

  return (
    <Paper sx={{ p: 4, m: 4 }}>
      <Typography variant="h3">連鎖店清單</Typography>
      <Divider sx={{ marginY: 4 }} />
      <Typography variant="h6" sx={{ mb: 2 }}>
        白名單
      </Typography>
      <Grid container spacing={2}>
        {whitelist.map((chainStore) => (
          <StoreItem key={chainStore.id} chainStore={chainStore} />
        ))}
      </Grid>
      <Divider sx={{ marginY: 4 }} />
      <Typography variant="h6" sx={{ mb: 2 }}>
        黑名單
      </Typography>
      <Grid container spacing={2}>
        {blacklist.map((chainStore) => (
          <StoreItem key={chainStore.id} chainStore={chainStore} />
        ))}
      </Grid>
    </Paper>
  )
}

const StoreItem = ({ chainStore }) => {
  return (
    <Grid
      item
      key={chainStore.id}
      xs={4}
      md={3}
      lg={2}
      sx={{ display: "flex", alignItems: "center", gap: 1 }}
    >
      <Box component="span">{chainStore.name}</Box>
      <Chip
        label={chainStore.chainStoreMapsCount}
        size="small"
        color="primary"
        variant="outlined"
      />
    </Grid>
  )
}

export default ChainStoreList
