import React from 'react'
import styled from 'styled-components'

const Searchbar = () => {
  return (
    <Container>
      <Input placeholder="輸入縣市、地區或店名"/>
      <img src="/search-btn.svg" alt="search-btn" />
    </Container>
  )
}

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 60px;
  padding: 10px;
  border: 1px solid #AFAAA3;
  border-radius: 20px;
  justify-content: space-between;
  gap: 12px;
`

const Input = styled.input`
  font-size: 16px;
  width: 100%;
  border: none;
  margin-left: 12px;
  outline: none;
`

export default Searchbar
