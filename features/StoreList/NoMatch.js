import { grey02 } from 'constants/color'
import { devices } from 'constants/styled-theme'
import React from 'react'
import styled from 'styled-components'

const REPORT_URL = "https://forms.gle/ievHHnQT6U3UNQEdA"
const NoMatch = () => {
  return (
    <Container>
      <Img src="/not-found.svg" alt="not_found" />
      <H3>找不到相符的咖啡店</H3>
      <P>請嘗試其他搜尋關鍵字，或減少篩選條件。</P>
      <P>
        若仍找不到店家，請<A href={REPORT_URL} target="_blank">回報問題</A>，我們將儘速處理。
      </P>
    </Container>
  )
}

const H3 = styled.h3`
  font-size: 24px;
  color: ${grey02};
  font-weight: 700;
`

const P = styled.p`
  font-size: 16px;
  color: ${grey02};
  margin: 2px;
`

const A = styled.a`
  color: #5c8aff;
`

const Container = styled.div`
  text-align: center;
  color: #333;
  background-color: #fff;

  @media ${devices.mobileXl} {
    width: 100%;
    padding-top: 24px;
    img {
      display: none;
    }
  }
`

const Img = styled.img`
  margin: 2rem 0;
  width: 240px;
  border-radius: 50%;
`

export default NoMatch
