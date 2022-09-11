import {
  Button,
  Dialog,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material"
import React from "react"
import RecommendBlock from "./RecommendBlock"
import { Form, Scroll, Buttons } from "./styled"
import ReviewApi from "api/review"
import Snackbar from "components/Snackbar"

const option = (value, label) => ({
  value,
  label,
})

const RADIO_GROUPS = [
  {
    name: "roomVolume",
    label: "音量",
    options: [
      option("quite", "幾乎無人說話"),
      option("normal", "輕聲交談"),
      option("loud", "正常交談"),
    ],
  },
  {
    name: "timeLimit",
    label: "限時規定",
    options: [
      option("no", "無限時"),
      option("weekend", "週末限時"),
      option("yes", "有限時"),
    ],
  },
  {
    name: "socketSupport",
    label: "插座供應",
    options: [
      option("yes", "大部分有插座"),
      option("normal", "些許插座"),
      option("no", "沒有插座"),
    ],
  },
]

const ReviewForm = ({ placeId, open, name, onClose = () => {} }) => {
  const [data, setData] = React.useState({})
  const [showSnackbar, setShowSnackbar] = React.useState(null)

  const handleRecommendChange = (recommend) => {
    handleChange("recommend", recommend)
  }
  const handleChange = (key, value) => {
    setData((cur) => ({ ...cur, [key]: value }))
  }
  const handleSubmit = async () => {
    await ReviewApi.createReview({
      placeId,
      data,
    })
    setShowSnackbar("評論成功")
    onClose(data)
  }

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <Form>
          <h3>{name}</h3>
          <Scroll>
            <RecommendBlock onChange={handleRecommendChange} />
            <TextField
              name="description"
              multiline
              fullWidth
              rows={4}
              placeholder="說明你在這間店的體驗"
              onChange={(e) => handleChange("description", e.target.value)}
            />
            {RADIO_GROUPS.map(({ name, label, options }) => (
              <FormControl key={name}>
                <FormLabel>{label}</FormLabel>
                <RadioGroup
                  name={name}
                  onChange={(event) => handleChange(name, event.target.value)}
                >
                  {options.map(({ value, label }) => (
                    <FormControlLabel
                      key={value}
                      value={value}
                      control={<Radio />}
                      label={label}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            ))}
          </Scroll>
          <Buttons>
            <Button variant="outlined" onClick={onClose}>
              取消
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={!data.recommend}
            >
              送出
            </Button>
          </Buttons>
        </Form>
      </Dialog>
      {showSnackbar && (
        <Snackbar
          onClose={() => setShowSnackbar(false)}
          message={showSnackbar}
        />
      )}
    </>
  )
}

export default ReviewForm
