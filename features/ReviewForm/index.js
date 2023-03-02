import {
  Box,
  CircularProgress,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material"
import CloseButton from "components/CloseButton"
import StorePhotoApi from "api/store-photo"
import { grey01, grey02, grey03, orange100 } from "constants/color"
import React, { useEffect, useRef, useState } from "react"
import styled, { css } from "styled-components"
import RecommendButton from "./RecommendButton"
import useSWR from "swr"
import ReviewApi from "api/review"
import formControlStore from "stores/formControlStore"
import Wrapper from "./Wrapper"
import { devices } from "constants/styled-theme"
import useRefreshStore from "hooks/useRefreshStore"
import ImageUpload from "./ImageUpload"
import axios from "axios"
import LinearProgress from "components/LinearProgress"
import { snackbarStore } from "features/GlobalSnackbar"

const RadioColor = {
  "&.Mui-checked": {
    color: orange100,
  },
}

function _getDefaultVisitDay() {
  const today = new Date()
  const dayOfWeek = today.getDay()
  if ([0, 6].includes(dayOfWeek)) {
    return "weekend"
  } else {
    return "weekday"
  }
}

const ReviewForm = ({ store }) => {
  const [decision, setDecision] = useState(null)
  const [selectedTagIds, setSelectedTagIds] = useState([])
  const [images, setImages] = useState([])
  const [visitDay, setVisitDay] = useState(_getDefaultVisitDay())
  const inputRef = useRef()
  const { setMessage } = snackbarStore((state) => ({
    setMessage: state.setMessage,
  }))
  const { data: tags } = useSWR("/tags")
  const refreshStore = useRefreshStore({ placeId: store.placeId })
  const [isLoading, setIsLoading] = useState(false)
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

  function handleImageChange(images) {
    setImages(images)
  }

  async function handleSubmit() {
    if (!decision) return

    setIsLoading(true)

    const data = {
      recommend: decision,
      tagIds: selectedTagIds,
      description: inputRef.current.value,
      visitDay: visitDay,
    }

    // Id are used for upload image
    const { id } = await ReviewApi.createReview({
      placeId: store.placeId,
      data,
    })
    await uploadImages(id)
    await refreshStore()
    setMessage("評論成功")
    handleClose()
    setIsLoading(false)
  }

  async function uploadImages(reviewId) {
    for (let file of images) {
      const { url } = await StorePhotoApi.getUploadLink({
        placeId: store.placeId,
      })
      const config = {
        headers: {
          "Content-Type": file.type,
        },
      }
      await axios.put(url, file, config)
      const link = url.split("?")[0]
      await StorePhotoApi.createStorePhoto({
        placeId: store.placeId,
        url: link,
        reviewId,
      })
    }
  }

  return (
    <Wrapper open={newReviewOpen} onClose={handleClose}>
      <Header>
        <H2>{store.name}</H2>
        <CloseButton onClick={handleClose} />
      </Header>
      <Divider />
      <Body>
        <Box>
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
          <TextField
            fullWidth
            inputRef={inputRef}
            rows={3}
            multiline
            placeholder="分享更多你在這家店的體驗"
            InputProps={{
              style: {
                borderRadius: "20px",
                padding: "12px 24px",
              },
            }}
          />
          <ImageUpload onChange={handleImageChange} />
        </Box>
        <Box>
          <H4>最近一次造訪這間店的時間？</H4>
          <RadioGroup
            value={visitDay}
            onChange={(e) => setVisitDay(e.target.value)}
          >
            <FormControlLabel
              value="weekday"
              control={<Radio sx={RadioColor} />}
              label="平日"
            />
            <FormControlLabel
              value="weekend"
              control={<Radio sx={RadioColor} />}
              label="週末/國定假日"
            />
          </RadioGroup>
        </Box>
        <Box>
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
        </Box>
      </Body>
      {isLoading && <LinearProgress />}
      <Divider />
      <Footer>
        <ActionButton onClick={handleClose}>取消</ActionButton>
        <ActionButton
          contained
          disabled={decision === null}
          onClick={handleSubmit}
        >
          {isLoading ? (
            <CircularProgress size={16} sx={{ color: "#FFFFFF" }} />
          ) : (
            "發送 "
          )}
        </ActionButton>
      </Footer>
    </Wrapper>
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

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`

const Header = styled.div`
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-shrink: 0;

  @media ${devices.mobileXl} {
    height: 61px;
  }
`

const Body = styled.div`
  padding: 36px;
  display: flex;
  flex-direction: column;
  gap: 44px;
  overflow-y: auto;
  height: calc(100% - 68px - 94px);

  @media ${devices.mobileXl} {
    padding: 29px;
    height: calc(100% - 61px - 84px);
  }

  & > div {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &::-webkit-scrollbar {
    width: 8px;
    display: block;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #666;
    border-right: 1px solid #f1f1f1;
  }

  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }
`

const Footer = styled.div`
  height: 94px;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  flex-shrink: 0;

  @media ${devices.mobileXl} {
    height: 84px;
    padding: 0 26px;
  }
`

const Buttons = styled.div`
  display: flex;
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
