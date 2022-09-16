import React from "react"
import MuiMenu from "@mui/material/Menu"
import { Button, Divider, FormControl, RadioGroup } from "@mui/material"
import RadioLabel from "features/Searchbar/Menu/RadioLabel"
import { Box } from "@mui/system"
import WeekHourPicker from "./WeekHourPicker"
import OpenButton from "./OpenButton"
import { OPEN_TYPES } from "constant/openTime"

const INITIAL_STATE = {
  openType: OPEN_TYPES.NONE,
  openWeek: null,
  openHour: null,
}

function reducer(state, action) {
  switch (action.type) {
    case "CHANGE_TYPE":
      if (action.payload === OPEN_TYPES.OPEN_AT) {
        return {
          openType: action.payload,
          openWeek: '0',
          openHour: '99'
        }
      } else {
        return {
          openType: action.payload,
          openWeek: null,
          openHour: null
        }
      }
    case "CHANGE_WEEK":
      return {
        ...state,
        openType: OPEN_TYPES.OPEN_AT,
        openWeek: action.payload,
      }
    case "CHANGE_HOUR":
      return {
        openType: OPEN_TYPES.OPEN_AT,
        openWeek: state.openWeek || 0,
        openHour: action.payload,
      }
    case "RESET":
      return INITIAL_STATE
    default:
      throw new Error("Action not exist")
  }
}

const OpenTime = ({ onChange = () => {} }) => {
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE)
  const cacheState = React.useRef(INITIAL_STATE)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  function handleOpen(event) {
    setAnchorEl(event.currentTarget)
  }
  function handleClose() {
    setAnchorEl(null)
    dispatch({ type: "RESET" })
  }
  function handleChange() {
    setAnchorEl(null)
    onChange(state)
    cacheState.current = state
  }

  return (
    <>
      <OpenButton {...cacheState.current} onClick={handleOpen} />
      <MuiMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <Box sx={{ mb: 1, textAlign: "center" }}>
          <Button
            sx={{ color: "#666" }}
            onClick={() => dispatch({ type: "RESET" })}
          >
            清除
          </Button>
          <Button onClick={handleChange}>套用</Button>
        </Box>
        <Divider />
        <FormControl sx={{ width: "100%", my: 1 }}>
          <RadioGroup
            value={state.openType}
            onChange={(e) =>
              dispatch({ type: "CHANGE_TYPE", payload: e.target.value })
            }
          >
            <RadioLabel label={"不限時間"} value={OPEN_TYPES.NONE} />
            <RadioLabel label={"營業中"} value={OPEN_TYPES.OPEN_NOW} />
            <Divider sx={{ my: 1 }} />
            <RadioLabel label={"營業時間"} value={OPEN_TYPES.OPEN_AT} />
          </RadioGroup>
        </FormControl>
        <WeekHourPicker
          active={state.openType === OPEN_TYPES.OPEN_AT}
          onOpenWeekChange={(week) =>
            dispatch({ type: "CHANGE_WEEK", payload: week })
          }
          onOpenHourChange={(hour) =>
            dispatch({ type: "CHANGE_HOUR", payload: hour })
          }
          curWeek={state.openWeek}
          curHour={state.openHour}
        />
      </MuiMenu>
    </>
  )
}

export default OpenTime
