import { Box, Button, Paper, Slider, Stack, Switch } from '@mui/material'

const ControlPanel = ({
  show,
  setShow,
  radius,
  setRadius,
  handleReload,
  showButton,
}) => {
  return (
    <Paper
      sx={{
        marginBottom: 3,
        p: 2,
        position: "absolute",
        zIndex: 10,
        left: 12,
        top: 12,
      }}
    >
      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
        <Box sx={{ width: 200 }}>
          <span>Radius</span>
          <Slider
            value={radius}
            valueLabelDisplay="auto"
            step={200}
            marks
            min={100}
            max={2000}
            onChange={(e) => setRadius(e.target.value)}
          />
        </Box>
        <Box>
          <span>Show Area</span>
          <br />
          <Switch checked={show} onChange={() => setShow((cur) => !cur)} />
        </Box>
        <Box>
          <Button
            variant="contained"
            disabled={!showButton}
            onClick={() => {
              handleReload()
            }}
          >
            Search Here
          </Button>
        </Box>
      </Stack>
    </Paper>
  )
}

export default ControlPanel
