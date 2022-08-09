import React from "react"
import { default as ReactSelect } from "react-select"

const colourStyles = {
  control: (styles, {}) => ({ ...styles, backgroundColor: "white" }),
  option: (styles, {}) => {
    return {
      ...styles,
    }
  },
  multiValue: (styles, { data }) => ({
    ...styles,
    color: "#999999",
    backgroundColor: "#E1F5FE",
    border: "1px solid #e9eefa",
    margin: "5px 5px 5px 0",
  }),
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    backgroundColor: "#E1F5FE",
  }),
  menu: (styles=> ({ ...styles, zIndex: 10}))
}

const Select = ({ options, handleChange }) => {
  const labelOptions = options.map(option => {
    return {value: option, label: option}
  })

  return (
    <ReactSelect
      options={labelOptions}
      isMulti
      placeholder="Choose City..."
      styles={colourStyles}
      defaultValue={[labelOptions[0], labelOptions[1]]}
      onChange={handleChange}
    />
  )
}
export default Select
