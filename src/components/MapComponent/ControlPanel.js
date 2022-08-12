import { Box, Button, Paper, Slider, Stack, Switch } from '@mui/material'

const ControlPanel = ({
  show,
  setShow,
  radius,
  setRadius,
  handleReload,
  showButton,
  handleFindMe,
  
}) => {
  function showAreaOnchange() {
    if (setShow) setShow()
  }

  function sliderOnChange(e) {
    if (setRadius) setRadius(e.target.value)
  }

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
            onChange={sliderOnChange}
          />
        </Box>
        <Box>
          <span>Show Area</span>
          <br />
          <Switch checked={show} onChange={showAreaOnchange} />
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
        <Box>
          <Button
            variant="contained"
            onClick={() => {
              handleFindMe()
            }}
          >
            Find me
          </Button>
        </Box>
      </Stack>
    </Paper>
  )
}

export default ControlPanel
