import {
  Button,
  Checkbox,
  Dialog,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Slider,
  Tooltip,
} from "@mui/material"
import RecommendBlock from "features/ReviewForm/RecommendBlock"
import React from "react"
import { useRef, useState } from "react"
import styled from "styled-components"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"

const Container = styled.div`
  width: 420px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`

const CheckboxOption = styled.div`
  display: flex;
  align-items: center;
`

const option = (value, label) => ({
  value,
  label,
})

const marks = [
  {
    value: 10,
    label: '10'
  },
  {
    value: 100,
    label: '100'
  },
]

const RADIO_GROUPS = [
  {
    name: "roomVolume",
    label: "音量",
    options: [
      option("quiet", "幾乎無人說話"),
      option("normal", "輕聲交談"),
      option("loud", "正常交談"),
    ],
  },
  {
    name: "timeLimit",
    label: "限時規定",
    options: [
      option("yes", "無限時"),
      option("weekend", "週末限時"),
      option("no", "有限時"),
    ],
  },
  {
    name: "socketSupply",
    label: "插座供應",
    options: [
      option("yes", "大部分有插座"),
      option("rare", "些許插座"),
      option("no", "沒有插座"),
    ],
  },
]

const SearchFilter = ({ onChange = () => {} }) => {
  const [open, setOpen] = useState(false)
  const [wakeUp, setWakeUp] = useState(false)
  const [exploreMode, setExploreMode] = useState(false)
  const [recommend, setRecommend] = useState(null)
  const [data, setData] = React.useState({
    roomVolume: "",
    timeLimit: "",
    socketSupply: "",
  })
  const [limit, setLimit] = useState(30)
  const initState = useRef({
    wakeUp: false,
    recommend: null,
    roomVolume: "",
    timeLimit: "",
    socketSupply: "",
    exploreMode: false,
    limit: 30,
  })

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
    setWakeUp(initState.current.wakeUp)
    setLimit(initState.current.limit)
    setRecommend(initState.current.recommend)
    setExploreMode(initState.current.exploreMode)
    const { roomVolume, timeLimit, socketSupply } = initState.current
    setData({ roomVolume, timeLimit, socketSupply })
  }
  const handleWakeUpChange = (event) => {
    setWakeUp(event.target.checked)
  }
  const handleFaceChange = (value) => {
    setRecommend(value)
  }
  const handleChange = (key, value) => {
    setData((cur) => ({ ...cur, [key]: value }))
  }
  const handleSliderChange = (event, newValue) => {
    setLimit(newValue)
  }
  const handleApply = () => {
    onChange({ ...data, wakeUp, recommend, exploreMode, limit })
    initState.current = {
      ...data,
      recommend,
      wakeUp,
      exploreMode,
      limit
    }
    setOpen(false)
  }
  const handleReset = () => {
    setWakeUp(false)
    setExploreMode(false)
    setRecommend(null)
    setLimit(50)
    setData({
      roomVolume: "",
      timeLimit: "",
      socketSupply: "",
    })
  }

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        打開篩選器
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Container>
          <h2>篩選器</h2>
          <Button onClick={handleReset} variant="contained">
            重置
          </Button>
          <div>
            <CheckboxOption>
              <FormControlLabel
                control={
                  <Checkbox checked={wakeUp} onChange={handleWakeUpChange} />
                }
                label="別人已探索"
              />
              <Tooltip title="只顯示被評論過或被儲存的店家"  placement="right">
                <HelpOutlineIcon fontSize="small" sx={{color: '#333'}} />
              </Tooltip>
            </CheckboxOption>
            <CheckboxOption>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={exploreMode}
                    onChange={(e) => setExploreMode(e.target.checked)}
                  />
                }
                label="拓荒模式"
              />
              <Tooltip title="被你評論、儲存的店家都不顯示" placement="right">
                <HelpOutlineIcon fontSize="small" sx={{color: '#333'}} />
              </Tooltip>
            </CheckboxOption>
          </div>
          <div>
            <span>一次顯示店家數</span>
            <Slider
              value={limit}
              step={10}
              min={10}
              max={100}
              valueLabelDisplay="on"
              marks={marks}
              onChange={handleSliderChange}
            />
          </div>
          <h4>最多人選擇</h4>
          <RecommendBlock onChange={handleFaceChange} initFace={recommend} />
          {RADIO_GROUPS.map(({ name, label, options }) => (
            <FormControl key={name}>
              <FormLabel>{label}</FormLabel>
              <RadioGroup
                defaultValue={data[name]}
                name={name}
                value={data[name]}
              >
                {options.map(({ value, label }) => (
                  <FormControlLabel
                    key={value}
                    value={value}
                    control={
                      <Radio
                        onClick={(event) =>
                          handleChange(name, event.target.value)
                        }
                      />
                    }
                    label={label}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          ))}

          <ButtonGroup>
            <Button variant="outlined" onClick={handleClose}>
              取消
            </Button>
            <Button variant="contained" onClick={handleApply}>
              套用
            </Button>
          </ButtonGroup>
        </Container>
      </Dialog>
    </>
  )
}

export default SearchFilter
