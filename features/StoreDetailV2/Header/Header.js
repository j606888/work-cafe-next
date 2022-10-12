import React from "react"
import styled from "styled-components"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import CircleIcon from "@mui/icons-material/Circle"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { devices } from "constant/styled-theme"

const Container = styled.div`
  display: flex;
  align-items: start;
  margin: 0 56px;
  position: relative;

  h3 {
    margin: 0 auto 0 1rem;
    font-size: 24px;
    color: #757575;
    max-width: 50%;
  }

  @media ${devices.iphoneSE} {
    margin: 0 24px;
    flex-direction: column;
    gap: 12px;

    h3 {
      font-size: 20px;
      margin: 0;
      max-width: 90%;
    }
  }
`

const BackButton = styled.button`
  border: 1px solid #757575;
  border-radius: 50%;
  height: 32px;
  width: 32px;
  color: #757575;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  cursor: pointer;

  svg {
    font-size: 20px;
  }

  &:hover {
    background-color: #f2f2f2;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;

  @media ${devices.iphoneSE} {
    position: absolute;
    top: 0;
    right: 0;
    gap: 0;
  }
`

const Button = styled.button`
  height: 36px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 6px;
  border: 1px solid #757575;
  border-radius: 12px;
  background-color: #fff;

  svg {
    color: #757575;
  }

  @media ${devices.iphoneSE} {
    border: none;

    span {
      display: none;
    }

    svg {
      font-size: 32px;
    }
  }
`

const Header = ({ name, onClick }) => {
  return (
    <Container>
      <BackButton onClick={onClick}>
        <ArrowBackIcon />
      </BackButton>
      <h3>{name}</h3>
      <ButtonGroup>
        <Button>
          <CircleIcon />
          <span>收藏</span>
        </Button>
        <Button>
          <CircleIcon />
          <span>分享</span>
        </Button>
        <Button>
          <MoreVertIcon />
        </Button>
      </ButtonGroup>
    </Container>
  )
}

export default Header
