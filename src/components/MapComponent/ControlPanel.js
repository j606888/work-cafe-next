import { Box, Paper, Slider, Stack, Switch } from '@mui/material'


const ControlPanel = ({ show, setShow, radius, setRadius }) => {
  return (
    <Paper sx={{ marginBottom: 3, p: 2 }}>
      <Stack direction="row" spacing={2}>
        <Box sx={{ width: 300 }}>
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
      </Stack>
    </Paper>
  )
}

export default ControlPanel
