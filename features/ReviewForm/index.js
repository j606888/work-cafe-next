import { Divider, TextField, Typography, useMediaQuery } from "@mui/material"
import CloseButton from "components/CloseButton"
import { grey01, grey02, grey03 } from "constants/color"
import React, { useEffect, useRef, useState } from "react"
import styled, { css } from "styled-components"
import RecommendButton from "./RecommendButton"
import AddIcon from "@mui/icons-material/Add"
import useSWR from "swr"
import ReviewApi from "api/review"
import formControlStore from "stores/formControlStore"
import Wrapper from "./Wrapper"
import { devices } from "constants/styled-theme"

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

const ReviewForm = ({ store }) => {
  const [decision, setDecision] = useState(null)
  const [selectedTagIds, setSelectedTagIds] = useState([])
  const inputRef = useRef()
  const { data: tags } = useSWR("/tags")
  const { mutate: mutateStore } = useSWR(`/stores/${store.placeId}`)
  const { mutate: mutateStoreReviews } = useSWR(
    `/stores/${store.placeId}/reviews`
  )
  const { newReviewOpen, setNewReviewOpen, defaultDecision } = formControlStore(
    (state) => ({
      newReviewOpen: state.newReviewOpen,
      setNewReviewOpen: state.setNewReviewOpen,
      defaultDecision: state.defaultDecision,
    })
  )

  useEffect(() => {
    setDecision(defaultDecision)
  }, [defaultDecision])

  function handleClickTag(tagId) {
    const newTagIds = [...selectedTagIds]
    const index = selectedTagIds.indexOf(tagId)
    if (index === -1) {
      newTagIds.push(tagId)
    } else {
      newTagIds.splice(index, 1)
    }

    setSelectedTagIds(newTagIds)
  }

  function handleClose() {
    setNewReviewOpen(false)
  }

  async function handleSubmit() {
    if (!decision) return

    const data = {
      recommend: decision,
      tagIds: selectedTagIds,
      description: inputRef.current.value,
    }

    // Id are used for upload image
    const { id } = await ReviewApi.createReview({
      placeId: store.placeId,
      data,
    })
    await mutateStore()
    await mutateStoreReviews()
    handleClose()
  }

  return (
    <Wrapper open={newReviewOpen} onClose={handleClose}>
      <Header>
        <H2>{store.name}</H2>
        <CloseButton onClick={handleClose} />
      </Header>
      <Divider />
      <Body>
        <H4>推薦這裡 給想辦公的人嗎？</H4>
        <Buttons>
          <RecommendButton
            decision={true}
            onClick={() => setDecision("yes")}
            checked={decision === "yes"}
          />
          <RecommendButton
            decision={false}
            onClick={() => setDecision("no")}
            checked={decision === "no"}
          />
        </Buttons>
        <CssTextField
          fullWidth
          inputRef={inputRef}
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
        {/* <NewPhotoButton>
          <AddIcon />
          <span>新增照片</span>
        </NewPhotoButton> */}
        <WhiteSpace />
        <H4>
          這家店有哪些特色？
          <span style={{ fontSize: "16px" }}>（可複選）</span>
        </H4>
        <TagsContainer>
          {tags?.map((tag) => {
            const checked = selectedTagIds.includes(tag.id)
            return (
              <TagCheckbox
                key={tag.id}
                onClick={() => handleClickTag(tag.id)}
                checked={checked}
              >
                {tag.name}
              </TagCheckbox>
            )
          })}
        </TagsContainer>
      </Body>
      <Divider />
      <Footer>
        <ActionButton onClick={handleClose}>取消</ActionButton>
        <ActionButton
          contained
          disabled={decision === null}
          onClick={handleSubmit}
        >
          發送
        </ActionButton>
      </Footer>
    </Wrapper>
  )
}

const WhiteSpace = styled.div`
  height: 12px;
`

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

const H2 = styled.h2`
  font-size: 16px;
  color: ${grey01};
  font-weight: 400;
  margin: 0 80px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  @media ${devices.mobileXl} {
    margin: 0 66px;
  }
`

const H4 = styled.h4`
  font-weight: 700;
  font-size: 20px;
  color: ${grey01};
  margin: 0;

  @media ${devices.mobileXl} {
    font-size: 16px;
  }
`

const Header = styled.div`
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  @media ${devices.mobileXl} {
    flex-shrink: 0;
    height: 61px;
  }
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

  @media ${devices.mobileXl} {
    padding: 29px;
  }
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
      background-color: ${grey01};
      border: 1px solid ${grey03};
      color: #ffffff;
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      background-color: ${grey03};
      border: 1px solid ${grey03};
      color: #ffffff;
      cursor: not-allowed;
    `}
`
export default ReviewForm
