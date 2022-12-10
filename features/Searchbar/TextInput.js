import React, { useState } from "react"
import styled from "styled-components"

const TextInput = ({ keyword, onChange, onKeyDown }) => {
  const [isOnComposition, setIsOnComposition] = useState(false)

  function handleComposition(e) {
    setIsOnComposition(e.type !== "compositionend")
  }

  function handleKeyDown(e) {
    if (isOnComposition) return
    if (["ArrowUp", "ArrowDown", "Enter"].includes(e.key)) {
      onKeyDown(e.key)
      e.preventDefault()
    }
  }

  return (
    <Input
      placeholder="輸入縣市、地區或店名"
      value={keyword}
      onChange={(e) => onChange(e.target.value)}
      onCompositionStart={handleComposition}
      onCompositionUpdate={handleComposition}
      onCompositionEnd={handleComposition}
      onKeyDown={handleKeyDown}
      // marginLeft={type === "landing" ? "12px" : "0px"}
    />
  )
}

const Input = styled.input`
  font-size: 16px;
  width: 100%;
  border: none;
  outline: none;
`
export default TextInput
