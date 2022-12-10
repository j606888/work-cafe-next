import React from "react"
import styled from "styled-components"

const Option = ({ result, onClick, focus }) => {
  const inner =
    result.type === "store" ? (
      <StoreOption {...result} />
    ) : (
      <CityOption {...result} />
    )

  return (
    <Container onClick={onClick} focus={focus}>
      {inner}
    </Container>
  )
}

const CityOption = ({ name, storeCount }) => {
  return (
    <>
      <img src="/location_28.svg" alt="location_28" />
      <span>{name}</span>
      <StoreCount>
        <img src="/cafe.svg" alt="cafe" />
        <span>{storeCount}</span>
      </StoreCount>
    </>
  )
}

const StoreOption = ({ name, address }) => {
  return (
    <>
      <img src="/cafe.svg" alt="cafe" />
      <span>{name}</span>
      <AddressSpan>{address}</AddressSpan>
    </>
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
  ${({ focus }) => focus && `background-color: #f2f2f2;`}

  span {
    white-space: pre;
  }

  &:hover {
    background-color: #f2f2f2;
    cursor: pointer;
  }
`

const AddressSpan = styled.span`
  color: #afaaa3;
  font-size: 12px;
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
