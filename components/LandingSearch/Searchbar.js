import React from "react"
import styled from "styled-components"
import Option from "./Option"

const Searchbar = () => {
  return (
    <Wrapper>
      <Container>
        <Input placeholder="輸入縣市、地區或店名" />
        <img src="/search-btn.svg" alt="search-btn" />
      </Container>
      <Options>
        <Option type="city" name="台南市" storeCount={5138} />
        <Option
          type="store"
          name="Kakes patisserie(遷店中，詳情請留意專頁，台南見)"
        />
        <Option type="store" name="多那之台南新營門市" />
        <Option type="store" name="Tea’s原味 台南六甲店" />
        <Option
          type="store"
          name="咖啡地圖麻豆店/麻豆coffe/麻豆咖啡廳/麻豆下午茶/麻豆美食/麻豆餐廳/"
        />
      </Options>
    </Wrapper>
  )
}

const Options = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 68px;
  width: 100%;
  height: 234px;
  border: 1px solid #afaaa3;
  border-radius: 20px;
  background-color: #ffffff;
  z-index: 1;
  padding: 12px 0;
  overflow: hidden;
`

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 60px;
  padding: 10px;
  border: 1px solid #afaaa3;
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
