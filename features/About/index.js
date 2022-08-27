import React from "react"
import { Container, Outer } from "./styled"

const About = () => {
  return (
    <Outer>
      <Container>
        <img src="/human1.png" alt="human1" />
        <div className="content">
          <h3>Work Cafe 如何篩選「適合工作」的咖啡店？</h3>
          <p>在Work Cafe註冊登入後，所有人都能為去過的咖啡店評分。我們優先推薦<b>至少5位用戶評過分，且超過6成評分者標註為「適合工作」</b>的咖啡店。</p>
          <p>
            評分者可以針對4大適合工作的咖啡店要素<b>「安靜程度」、「限時規定」、「插座供應」和「空間狀況」</b>給予評價。你可以參考不同要素的評價，選擇適合自己工作的咖啡店。
          </p>
          <span>
            註：Work Cafe 定義的「適合工作」是指看書、用電腦做事 等個人工作，不包含多人討論情境。
          </span>
        </div>
      </Container>
    </Outer>
  )
}

export default About
