import React from "react"
import styled from "styled-components"

const SvgButton = ({ path, onClick }) => {
  return <Container src={`/${path}.svg`} alt={path} onClick={onClick} />
}

const Container = styled.img`
  cursor: pointer;
`

export default SvgButton
