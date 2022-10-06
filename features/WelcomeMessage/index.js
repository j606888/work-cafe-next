import { Alert } from '@mui/material'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 80%;
  max-width: 560px;
  margin: 6rem auto;
  text-align: left;
  font-family: 'Roboto', sans-serif;

  p {
    line-height: 150%;
    font-weight: 400;
  }

  span {
    font-size: 12px;
  }
`

const ImageContainer = styled.div`
  text-align: center;
  margin: 3rem;
`

const WelcomeMessage = () => {
  return (
    <Container>
      <h3>Work Cafe 如何篩選「適合工作」的咖啡店？</h3>
      <p>在Work Cafe註冊登入後，所有人都能為去過的咖啡店評分。我們優先推薦<b>至少5位用戶評過分，且超過6成評分者標註為「適合工作」</b>的咖啡店。</p>
      <p>評分者可以針對4大適合工作的咖啡店要素<b>「安靜程度」、「限時規定」、「插座供應」和「空間狀況」</b>給予評價。你可以參考不同要素的評價，選擇適合自己工作的咖啡店。</p>
      <span>註：Work Cafe 定義的「適合工作」是指看書、用電腦做事 等個人工作，不包含多人討論情境。</span>
      <ImageContainer>
        <img src="human2.png" alt="human2" />
      </ImageContainer>
      <Alert severity='info'>這是一個剛起步的網站，如果大家能夠幫忙建立評論就太感謝了。如果有看到什麼問題或是想建議的都歡迎填寫以下表單 - <a href="https://forms.gle/YHYz3bGUimFtuTyZ9" target="_blank" rel="noreferrer">https://forms.gle/YHYz3bGUimFtuTyZ9</a></Alert>
    </Container>
  )
}

export default WelcomeMessage
