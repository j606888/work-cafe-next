import styled from "styled-components"

import { Dialog, ImageList, ImageListItem, Snackbar } from "@mui/material"
import useMediaQuery from "@mui/material/useMediaQuery"
import SvgButton from "components/SvgButton"
import ActionButton from "components/Button/ActionButton"
import ComingSoonForm from "components/ComingSoonForm"
import { useState } from "react"
import Tooltip from "components/Tooltip"
import ShareStore from "components/ShareStore"
import useSWR from "swr"

const ImageCanvas = ({ placeId, photos, open, onClose, name }) => {
  const [openComing, setOpenComing] = useState(false)
  const [openShareStore, setOpenShareStore] = useState(false)
  const { data: store } = useSWR(`/stores/${placeId}`)
  const fullScreen = useMediaQuery('(max-width: 720px)')

  function handleShare() {
    setOpenShareStore(true)
  }
  function handleComingSoon() {
    setOpenComing(true)
  }

  return (
    <>
      <Dialog
        onClose={onClose}
        open={open}
        fullWidth
        maxWidth="lg"
        fullScreen={fullScreen}
        PaperProps={
          fullScreen ? {} : { sx: { borderRadius: "20px", maxHeight: "85%" } }
        }
      >
        <Header>
          <h3>{name}</h3>
          <MobileBackButton path="arrow-left" onClick={onClose} />
          <ButtonGroup>
            {/* <BookmarkButton placeId={placeId} /> */}
            <Tooltip title="功能開發中" placement="bottom-end">
              <ActionButton svg="like" onClick={handleComingSoon}>
                收藏
              </ActionButton>
            </Tooltip>
            <Tooltip title="功能開發中" placement="bottom-end">
              <ActionButton svg="fire" onClick={handleComingSoon}>
                想去
              </ActionButton>
            </Tooltip>
            <ActionButton svg="share" onClick={handleShare}>
              分享
            </ActionButton>
            <SvgButton path="cancel" onClick={onClose} />
          </ButtonGroup>
        </Header>
        <DialogContainer>
          <ImageList
            variant="masonry"
            cols={fullScreen ? 1 : 2}
            gap={8}
            sx={{ marginTop: 0 }}
          >
            {photos.map((item) => (
              <ImageListItem key={item}>
                <img src={item} alt={item} loading="lazy" />
              </ImageListItem>
            ))}
          </ImageList>
        </DialogContainer>
      </Dialog>
      <ComingSoonForm open={openComing} onClose={() => setOpenComing(false)} />
      <ShareStore
        store={store}
        open={openShareStore}
        onClose={() => setOpenShareStore(false)}
      />
    </>
  )
}

const MobileBackButton = styled(SvgButton)`
  display: none;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: block;
  }
`

const Header = styled.div`
  height: 72px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 72px;
  padding-right: 22px;
  border-bottom: 1px solid #e8e6e4;

  h3 {
    font-weight: 700;
    font-size: 20px;
    color: #222120;
    max-width: 815px;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 16px;
    min-height: 56px;
    position: sticky;
    top: 0;
    z-index: 3;

    h3 {
      display: none;
    }
  }
`

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    & > :last-child {
      display: none;
    }

    gap: 0;
  }
`

const DialogContainer = styled.div`
  padding: 0 72px;
  overflow-x: scroll;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0;
  }
`

const Button = styled.button`
  width: 88px;
  height: 44px;
  align-items: center;
  border: 1px solid #e8e6e4;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  background: #ffffff;
  text-decoration: none;
  color: #222120;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    border: none;
    width: auto;
    height: auto;

    span {
      display: none;
    }
  }
`
export default ImageCanvas
