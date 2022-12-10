import { useState } from "react"

const useFocusIndex = () => {
  const [focusedIndex, setFocusedIndex] = useState(-1)

  const onArrowUp = (optionSize) => {
    if (!optionSize) return

    const nextIndexCount = (focusedIndex + optionSize - 1) % optionSize
    setFocusedIndex(nextIndexCount)
  }

  const onArrowDown = (optionSize) => {
    if (!optionSize) return

    const nextIndexCount = (focusedIndex + 1) % optionSize
    setFocusedIndex(nextIndexCount)
  }

  return { focusedIndex, onArrowUp, onArrowDown }
}

export default useFocusIndex
