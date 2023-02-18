import React from "react"
import ThumbDownIcon from "@mui/icons-material/ThumbDown"
import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import { FormControl, FormLabel, Radio } from "@mui/material"
import { RadioContainer, RadioGroup } from "./styled"

const FaceRadio = ({
  checked,
  label,
  icon,
  value,
  color,
  onChange = () => {},
}) => {
  const handleChange = () => {
    onChange(value)
  }

  return (
    <RadioContainer onClick={handleChange} isChecked={checked} color={color}>
      <Radio
        checked={checked}
        name="recommend"
        value={value}
        icon={icon}
        checkedIcon={icon}
      />
      <span>{label}</span>
    </RadioContainer>
  )
}

const OPTIONS = [
  {
    icon: <ThumbDownIcon />,
    value: "no",
    label: "不推薦",
    color: "#EF9A9A",
  },
  {
    icon: <ThumbUpIcon />,
    value: "yes",
    label: "推薦",
    color: "#54ADDB",
  },
]

const RecommendBlock = ({ onChange = () => {}, recommend }) => {
  return (
    <FormControl>
      <FormLabel>
        <sup>*</sup>你推薦給想辦公的人來嗎？
      </FormLabel>
      <RadioGroup>
        {OPTIONS.map(({ value, icon, label, color }) => (
          <FaceRadio
            key={value}
            checked={value === recommend}
            icon={icon}
            value={value}
            label={label}
            color={color}
            onChange={onChange}
          />
        ))}
      </RadioGroup>
    </FormControl>
  )
}

export default RecommendBlock
