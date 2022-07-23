import React from "react"
import styled from "styled-components"

// TODO, Very bad, need to optimize
const AutoComplete = ({ keyword, texts }) => {
  return (
    <ListContainer>
      {texts.map((text) => (
        <CountryItem key={text}>
          {boldString(text, keyword)}
          {nonBoldString(text, keyword)}
        </CountryItem>
      ))}
    </ListContainer>
  )
}

const boldString = (str, substr) => {
  const match = (str.match(substr) || []).join("")
  return <b>{match}</b>
}

const nonBoldString = (str, substr) => {
  return str.replace(substr, "")
}

const ListContainer = styled.div`
  border: 1px solid #757575;
  border-radius: 8px;
  position: absolute;
  width: 320px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const CountryItem = styled.div`
  padding: 12px;
  width: 100%;
  color: #757575;
  &:hover {
    background-color: #e9e9e9;
  }
`

export default AutoComplete
