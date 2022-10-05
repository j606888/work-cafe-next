import React from "react"
import {
  SentimentNeutralOutlined as NormalFace,
  SentimentDissatisfiedOutlined as BadFace,
  SentimentSatisfiedOutlined as HappyFace,
} from "@mui/icons-material"
import { FormControl, FormLabel, Radio } from "@mui/material"
import { Container, RadioContainer, RadioGroup } from "./styled"

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
    icon: <BadFace />,
    value: "no",
    label: "不適合",
    color: "#EF9A9A",
  },
  {
    icon: <NormalFace />,
    value: "normal",
    label: "普通",
    color: "#FFD54F",
  },
  {
    icon: <HappyFace />,
    value: "yes",
    label: "適合",
    color: "#A5D6A7",
  },
]

const RecommendBlock = ({ onChange = () => {}, recommend }) => {
  return (
    <FormControl>
      <FormLabel>適合安靜做事</FormLabel>
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
