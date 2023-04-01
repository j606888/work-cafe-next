import { Box } from "@mui/material"
import Button from "components/Button"
import { grey02 } from "constants/color"

import NewStore from "features/NewStore"
import React, { useState } from "react"
import styled from "styled-components"

const NoMatch = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Container>
        <Img src="/not-found.svg" alt="not_found" />
        <H3>找不到相符的咖啡店</H3>
        <P>請嘗試其他搜尋關鍵字，或減少篩選條件。</P>
        <P>
          若仍找不到店家，請協助我們
          <A onClick={() => setOpen(true)}>新增店家</A>
          ，系統將立即匯入資料。
        </P>
      </Container>
      <NewStore open={open} onClose={() => setOpen(false)} />
    </>
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

const A = styled.span`
  color: #5c8aff;
  cursor: pointer;
`

const Container = styled.div`
  text-align: center;
  color: #333;
  background-color: #fff;
  box-sizing: border-box;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    padding: 24px;
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
