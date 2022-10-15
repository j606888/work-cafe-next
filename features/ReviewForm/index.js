import { Button, Chip, Dialog, TextField } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import React, { useState } from "react"
import RecommendBlock from "./RecommendBlock"
import { Form, Scroll, Buttons, ChipContainer } from "./styled"
import ReviewApi from "api/review"
import Snackbar from "components/Snackbar"
import useSWR from "swr"
import UploadForm from "features/StoreDetail/StorePhotoUpload/UploadForm"
import StorePhotoApi from "api/store-photo"
import axios from "axios"
import useMediaQuery from "@mui/material/useMediaQuery"

const ReviewForm = ({
  placeId,
  open,
  name,
  onClose = () => {},
  onSave = () => {},
}) => {
  const [data, setData] = useState({
    recommend: "",
    description: "",
    tagIds: [],
  })
  const [files, setFiles] = useState([])
  const [showSnackbar, setShowSnackbar] = useState(null)
  const { data: tags } = useSWR("/tags")
  const fullScreen = useMediaQuery('(max-width:390px)');
  const [loading, setLoading] = useState(false)

  const handleUploadImage = async (reviewId) => {
    for (let file of files) {
      const { url } = await StorePhotoApi.getUploadLink({ placeId })
      const config = {
        headers: {
          "Content-Type": file.type,
        },
      }
      await axios.put(url, file, config)
      const link = url.split("?")[0]
      await StorePhotoApi.createStorePhoto({ placeId, url: link, reviewId })
    }
  }

  const handleRecommendChange = (recommend) => {
    handleChange("recommend", recommend)
  }
  const handleChange = (key, value) => {
    setData((cur) => ({ ...cur, [key]: value }))
  }
  const handleFileChange = (fileArr) => {
    setFiles(fileArr)
  }
  const handleSubmit = async () => {
    setLoading(true)
    const { id } = await ReviewApi.createReview({
      placeId,
      data,
    })
    await handleUploadImage(id)
    setShowSnackbar("評論成功")
    handleClose()
    onSave()
    setLoading(false)
  }
  const handleClose = () => {
    setData({
      recommend: "",
      description: "",
      tagIds: [],
    })
    setLoading(false)
    onClose()
  }

  const handleClick = (tagId) => {
    setData((cur) => {
      if (cur.tagIds.includes(tagId)) {
        const tagIds = cur.tagIds.filter((id) => id !== tagId)
        return { ...cur, tagIds }
      } else {
        return { ...cur, tagIds: [...cur.tagIds, tagId] }
      }
    })
  }

  return (
    <>
      <Dialog open={!!open} onClose={handleClose} maxWidth="xl"fullScreen={fullScreen}>
        <Form>
          <h3>{name}</h3>
          <Scroll>
            <RecommendBlock
              onChange={handleRecommendChange}
              recommend={data.recommend}
            />
            <TextField
              name="description"
              multiline
              fullWidth
              rows={3}
              value={data.description}
              placeholder="說明你在這間店的體驗"
              onChange={(e) => handleChange("description", e.target.value)}
            />
            <UploadForm onChange={handleFileChange} />
            <p>主標籤選擇</p>
            <ChipContainer>
              {tags
                ?.filter((tag) => tag.primary)
                ?.map((tag) => (
                  <Chip
                    key={tag.id}
                    label={tag.name}
                    onClick={() => handleClick(tag.id)}
                    color="primary"
                    variant={_variant(data.tagIds, tag.id)}
                  />
                ))}
            </ChipContainer>
            <p>副標籤選擇</p>
            <ChipContainer>
              {tags
                ?.filter((tag) => !tag.primary)
                ?.map((tag) => (
                  <Chip
                    key={tag.id}
                    label={tag.name}
                    onClick={() => handleClick(tag.id)}
                    color="primary"
                    variant={_variant(data.tagIds, tag.id)}
                  />
                ))}
            </ChipContainer>
          </Scroll>
          <Buttons>
            <Button variant="outlined" onClick={handleClose}>
              取消
            </Button>
            <LoadingButton
              variant="contained"
              onClick={handleSubmit}
              disabled={!data.recommend}
              loading={loading}
            >
              送出
            </LoadingButton>
          </Buttons>
        </Form>
      </Dialog>
      {showSnackbar && (
        <Snackbar
          onClose={() => setShowSnackbar(false)}
          message={showSnackbar}
        />
      )}
    </>
  )
}

function _variant(tagIds, id) {
  return tagIds.includes(id) ? "contained" : "outlined"
}

export default ReviewForm
