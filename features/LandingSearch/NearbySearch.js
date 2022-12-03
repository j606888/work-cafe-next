import React from 'react'
import styled from 'styled-components'

const NearbySearch = ({ onClick }) => {
  return (
    <Container>
      <Content>
        <h3>正在找尋附近的咖啡店？</h3>
        <p>須許可此網頁存取你的GPS定位</p>
      </Content>
      <SearchBtn onClick={onClick}>搜尋附近</SearchBtn>
    </Container>
  )
}

const Container = styled.div`
  margin-top: 43px;
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 112px;
  padding: 30px;
  background-color: #FFF7EE;
  border-radius: 28px;
  align-items: center;
  justify-content: space-between;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  h3 {
    color: #222120;
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 27px;
    margin: 0;
  }

  p {
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 19px;
    display: flex;
    align-items: center;
    color: #222120;
  }
`

const SearchBtn = styled.button`
  background-color: #222120;
  border: none;
  cursor: pointer;
  border-radius: 12px;
  width: 120px;
  height: 52px;
  color: #ffffff;
  font-size: 18px;
  line-height: 25px;
`

export default NearbySearch
