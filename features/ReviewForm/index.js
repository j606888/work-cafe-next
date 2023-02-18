import { Dialog, Divider, TextField, Typography } from "@mui/material"
import CloseButton from "components/CloseButton"
import { grey01, grey02, grey03 } from "constants/color"
import React from "react"
import styled, { css } from "styled-components"
import RecommendButton from "./RecommendButton"
import AddIcon from "@mui/icons-material/Add"
import useSWR from "swr"

const TitleStyle = {
  fontSize: "16px",
  color: grey01,
  fontWeight: 400,
  margin: "0 80px",
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
}

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: grey01,
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: grey01,
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: grey01,
    },
  },
})

const ReviewForm = ({ store = {}, open = true, onClose }) => {
  const { data: tags } = useSWR("/tags")

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ style: { borderRadius: "20px", width: "596px" } }}
    >
      <Header>
        <Typography variant="h2" style={TitleStyle}>
          {store.name}
        </Typography>
        <CloseButton />
      </Header>
      <Divider />
      <Body>
        <Typography
          variant="h4"
          style={{
            fontWeight: 700,
            fontSize: "20px",
            color: grey01,
          }}
        >
          推薦這裡 給想辦公的人嗎？
        </Typography>
        <Buttons>
          <RecommendButton decision={true} focus />
          <RecommendButton decision={false} />
        </Buttons>
        <CssTextField
          fullWidth
          rows={3}
          multiline
          placeholder="分享更多你在這家店的體驗"
          InputProps={{
            style: {
              borderRadius: "20px",
              padding: "12px 24px",
              "&:focus": {
                border: grey01,
              },
            },
          }}
        />
        {/* TODO, margin-bottom for button is not good, make is block */}
        <NewPhotoButton>
          <AddIcon />
          <span>新增照片</span>
        </NewPhotoButton>
        <Typography
          variant="h4"
          style={{
            fontWeight: 700,
            fontSize: "20px",
            color: grey01,
          }}
        >
          這家店有哪些特色？
          <span style={{ fontSize: "16px" }}>（可複選）</span>
        </Typography>
        <TagsContainer>
          {tags?.map((tag) => (
            <TagCheckbox key={tag.id}>{tag.name}</TagCheckbox>
          ))}
        </TagsContainer>
      </Body>
      <Divider />
      <Footer>
        <ActionButton>取消</ActionButton>
        <ActionButton contained>發送</ActionButton>
      </Footer>
    </Dialog>
  )
}

const TagCheckbox = styled.div`
  height: 36px;
  padding: 0 16px;
  border: 1px solid #afaaa3;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid ${grey03};

  ${({ checked }) =>
    checked &&
    css`
      border: 1px solid ${grey02};
      background-color: ${grey02};
      color: #ffffff;
    `}
`
const Header = styled.div`
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`

const Body = styled.div`
  padding: 36px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const NewPhotoButton = styled.div`
  width: 128px;
  height: 44px;
  margin: 0 auto;
  margin-bottom: 28px;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid #222120;
  border-radius: 12px;
`

const Buttons = styled.div`
  display: flex;
  gap: 16px;
`

const Footer = styled.div`
  height: 94px;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
`

const ActionButton = styled.div`
  display: flex;
  width: 80px;
  height: 44px;
  align-items: center;
  justify-content: center;
  border: 1px solid ${grey01};
  border-radius: 12px;
  cursor: pointer;

  ${({ contained }) =>
    contained &&
    css`
      background-color: ${grey03};
      border: 1px solid ${grey03};
      color: #ffffff;
    `}
`
export default ReviewForm
