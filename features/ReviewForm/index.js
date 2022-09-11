import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material"
import React from "react"
import RecommendBlock from "./RecommendBlock"
import { Temp, Form, Scroll, Buttons } from "./styled"

const ReviewForm = ({ name, onChange = () => {} }) => {
  const handleRecommendChange = (recommend) => {
    onChange({ recommend })
  }

  return (
    <Temp>
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
          />
          <FormControl>
            <FormLabel>音量</FormLabel>
            <RadioGroup name="roomVolume">
              <FormControlLabel
                value="quite"
                control={<Radio />}
                label="幾乎無人說話"
              />
              <FormControlLabel
                value="normal"
                control={<Radio />}
                label="輕聲交談"
              />
              <FormControlLabel
                value="loud"
                control={<Radio />}
                label="正常交談"
              />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel>限時規定</FormLabel>
            <RadioGroup name="timeLimit">
              <FormControlLabel value="no" control={<Radio />} label="無限時" />
              <FormControlLabel
                value="weekend"
                control={<Radio />}
                label="週末限時"
              />
              <FormControlLabel
                value="yes"
                control={<Radio />}
                label="有限時"
              />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel>插座供應</FormLabel>
            <RadioGroup name="socketSupport">
              <FormControlLabel
                value="yes"
                control={<Radio />}
                label="大部分有插座"
              />
              <FormControlLabel
                value="normal"
                control={<Radio />}
                label="些許插座"
              />
              <FormControlLabel
                value="no"
                control={<Radio />}
                label="沒有插座"
              />
            </RadioGroup>
          </FormControl>
        </Scroll>
        <Buttons>
          <Button variant="outlined">取消</Button>
          <Button variant="contained">送出</Button>
        </Buttons>
      </Form>
    </Temp>
  )
}

export default ReviewForm
