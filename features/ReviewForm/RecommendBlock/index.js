import React from "react"
import {
  SentimentNeutralOutlined as NormalFace,
  SentimentDissatisfiedOutlined as BadFace,
  SentimentSatisfiedOutlined as HappyFace,
} from "@mui/icons-material"
import { Radio } from "@mui/material"
import { Container, RadioContainer } from "./styled"
import { useEffect } from "react"

const FaceRadio = ({
  selectedValue,
  label,
  icon,
  value,
  color,
  onChange = () => {},
}) => {
  const handleChange = () => {
    onChange(value)
  }
  const isChecked = selectedValue === value

  return (
    <RadioContainer onClick={handleChange} isChecked={isChecked} color={color}>
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
    value: "no",
    label: "不推薦",
    color: "#E53935",
  },
  {
    icon: <NormalFace />,
    value: "normal",
    label: "一般",
    color: "#FFC107",
  },
  {
    icon: <HappyFace />,
    value: "yes",
    label: "推薦",
    color: "#00897B",
  },
]

const RecommendBlock = ({ onChange = () => {}, initFace }) => {
  const [selectedValue, setSelectedValue] = React.useState(null)

  const handleChange = (value) => {
    setSelectedValue(value)
    onChange(value)
  }

  useEffect(() => {
    if (initFace !== true && initFace !== false) {
      setSelectedValue(initFace)
      onChange(initFace)
    }
  }, [initFace])

  return (
    <Container>
      {OPTIONS.map(({ value, icon, label, color }) => (
        <FaceRadio
          key={value}
          selectedValue={selectedValue}
          defaultCheck={initFace}
          icon={icon}
          value={value}
          label={label}
          color={color}
          onChange={handleChange}
        />
      ))}
    </Container>
  )
}

export default RecommendBlock
