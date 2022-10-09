import React from "react"
import styled from "styled-components"
import { TypeAnimation } from "react-type-animation"
import { devices } from "constant/styled-theme"

const Container = styled.div`
  .large {
    display: block;
  }

  .small {
    display: none;
  }

  @media ${devices.iphoneSE} {
    .large {
      display: none;
    }

    .small {
      display: block;
    }
  }
`

const sequence = ["", 800, "嗨! ", 800, "嗨! 今天想去哪辦公呢？"]

const WhereToGo = () => {
  return (
    <Container>
      <div className="large">
        <TypeAnimation
          sequence={sequence}
          wrapper="div"
          style={{
            fontSize: "28px",
            fontWeight: 700,
          }}
          cursor={true}
          speed={50}
        />
      </div>
      <div className="small">
        <TypeAnimation
          sequence={sequence}
          wrapper="div"
          style={{
            fontSize: "20px",
            fontWeight: 700,
            padding: '25px 0 12px',
          }}
          cursor={true}
          speed={50}
        />
      </div>
    </Container>
  )
}

export default WhereToGo
