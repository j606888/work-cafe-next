import React from "react"
import styled from "styled-components"

const CityOption = ({ name, storeCount, onClick }) => {
  return (
    <Container onClick={onClick}>
      <img src="/location_28.svg" alt="location_28" />
      <span>{name}</span>
      <StoreCount>
        <img src="/cafe.svg" alt="cafe" />
        <span>{storeCount}</span>
      </StoreCount>
    </Container>
  )
}

const StoreOption = ({ name, onClick }) => {
  return (
    <Container onClick={onClick}>
      <img src="/cafe.svg" alt="cafe" />
      <span>{name}</span>
    </Container>
  )
}

const Option = ({ type, name, count, onClick }) => {
  return type === "store" ? (
    <StoreOption name={name} onClick={onClick}/>
  ) : (
    <CityOption name={name} storeCount={count} onClick={onClick}/>
  )
}

const Container = styled.div`
  color: #222120;
  box-sizing: border-box;
  width: 100%;
  padding: 16px;
  height: 42px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;

  &:hover {
    background-color: #f2f2f2;
    cursor: pointer;
  }
`

const StoreCount = styled.div`
  margin-left: auto;
  width: 68px;
  height: 32px;
  border-radius: 12px;
  border: 1px solid #e8e6e4;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    font-size: 12px;
  }
`

export default Option