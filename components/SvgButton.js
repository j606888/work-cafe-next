import React from "react"
import styled from "styled-components"

const SvgButton = ({ className, path, onClick }) => {
  return (
    <Container
      className={className}
      src={`/${path}.svg`}
      alt={path}
      onClick={onClick}
    />
  )
}

const Container = styled.img`
  cursor: pointer;
`

export default SvgButton
