import React from "react"
import styled from "styled-components"
import { devices } from "constants/styled-theme"
import { Dialog, ImageList, ImageListItem } from "@mui/material"
import useMediaQuery from "@mui/material/useMediaQuery"
import SvgButton from "components/SvgButton"

const ImageCanvas = ({ photos, open, onClose, name }) => {
  const fullScreen = useMediaQuery(devices.mobileXl)

  return (
    <Dialog
      onClose={onClose}
      open={open}
      fullWidth
      maxWidth="lg"
      fullScreen={fullScreen}
    >
      <Header>
        <h3>{name}</h3>
        <MobileBackButton path="arrow-left" onClick={onClose} />
        <ButtonGroup>
          <Button>
            <img src="/like.svg" alt="like" />
            <span>收藏</span>
          </Button>
          <Button>
            <img src="/share.svg" alt="share" />
            <span>分享</span>
          </Button>
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
  )
}

const MobileBackButton = styled(SvgButton)`
  display: none;

  @media ${devices.mobileXl} {
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

  @media ${devices.mobileXl} {
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

  @media ${devices.mobileXl} {
    & > :last-child {
      display: none;
    }

    gap: 0;
  }
`

const DialogContainer = styled.div`
  padding: 0 72px;

  @media ${devices.mobileXl} {
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

  @media ${devices.mobileXl} {
    border: none;
    width: auto;
    height: auto;

    span {
      display: none;
    }
  }
`
export default ImageCanvas
