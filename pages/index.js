import Button from "@/components/Button"
import CityList from "@/components/CityList"
import Introduce from "@/components/Introduce"
import Navbar from "@/components/Navbar"
import SearchBar from "@/components/SearchBar"
import TimeSelector from "@/components/TimeSelector"
import { Box, Container, Grid, Typography } from "@mui/material"

export default function RootPage() {
  return (
    <>
      <Navbar />
      <Box>
        <Container maxWidth="md">
          <Box mt={6}>
            <Typography variant="h4" component="h1" fontWeight="bold" mb={1}>
              尋找適合工作的咖啡店
            </Typography>
            <Typography variant="body2" component="h3" mb={4}>
              Work Cafe 幫你即時篩選 能靜心做事的咖啡店
            </Typography>
            <SearchBar />
            <Grid container justifyContent="center">
              <Button />
            </Grid>
          </Box>
          <TimeSelector />
        </Container>
      </Box>
      <Introduce />
      <CityList />
    </>
  )
}
