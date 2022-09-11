import React from "react"
import {
  SentimentNeutralOutlined as BadFace,
  SentimentDissatisfiedOutlined as NormalFace,
  SentimentSatisfiedOutlined as HappyFace,
} from "@mui/icons-material"
import { Radio } from "@mui/material"
import { Container, RadioContainer } from "./styled"

const FaceRadio = ({
  selectedValue,
  label,
  icon,
  value,
  onChange = () => {},
}) => {
  const handleChange = () => {
    onChange(value)
  }
  const isChecked = selectedValue === value

  return (
    <RadioContainer onClick={handleChange} isChecked={isChecked}>
      <Radio
        checked={isChecked}
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
    value: "bad",
    label: "不推薦",
  },
  {
    icon: <NormalFace />,
    value: "normal",
    label: "一般",
  },
  {
    icon: <HappyFace />,
    value: "good",
    label: "推薦",
  },
]

const RecommendBlock = ({ onChange = () => {} }) => {
  const [selectedValue, setSelectedValue] = React.useState(null)

  const handleChange = (value) => {
    setSelectedValue(value)
    onChange(value)
  }

  return (
    <Container>
      {OPTIONS.map(({ value, icon, label }) => (
        <FaceRadio
          key={value}
          selectedValue={selectedValue}
          icon={icon}
          value={value}
          label={label}
          onChange={handleChange}
        />
      ))}
    </Container>
  )
}

export default RecommendBlock
