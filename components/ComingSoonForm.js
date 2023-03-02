import { Dialog } from "@mui/material"
import { grey01 } from "constants/color"
import React from "react"
import styled from "styled-components"
import Button from "./Button"
import CloseButton from "./CloseButton"

const FEED_BACK_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSf9t7SrCyJmPO9vxKCODXLr4-CPD8FDGC-y4cxJn9HE7bR_GA/viewform"

const ComingSoonForm = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          borderRadius: "20px",
          padding: "34px 38px 24px",
          display: "flex",
          alignItems: "center",
          width: "300px",
          position: "relative",
        },
      }}
    >
      <H3>功能開發中</H3>
      <P>「收藏想去店家」功能正在開發中！ 想許願其他功能，歡迎回饋給我們。</P>
      <ButtonGroup>
        <Button onClick={() => window.open(FEED_BACK_URL, "_blank")}>
          前往回饋
        </Button>
        <Button variant="black" onClick={onClose}>
          我知道了
        </Button>
      </ButtonGroup>
      <CloseButton
        sx={{ top: 12, right: 12, transform: "none", color: grey01 }}
        onClick={onClose}
      />
    </Dialog>
  )
}

const H3 = styled.h3`
  font-weight: 700;
  font-size: 16px;
  margin: 0;
  margin-bottom: 12px;
  color: ${grey01};
`

const P = styled.p`
  font-size: 14px;
  color: ${grey01};
`

const ButtonGroup = styled.div`
  margin-top: 32px;
  gap: 16px;
  display: flex;
  justify-content: space-between;
`

export default ComingSoonForm
