import React from 'react'
import styled from 'styled-components'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import HideSourceIcon from '@mui/icons-material/HideSource';
import CommentIcon from '@mui/icons-material/Comment';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import ShareIcon from '@mui/icons-material/Share';

const Container = styled.div`
  text-align: center;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  span {
    color: #1B72E8;
    font-size: 12px;
    margin-top: 8px;
  }
`
const Circle = styled.div`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 50%;
  background-color: ${({primary}) => primary ? '#1B72E8' : '#fff'};
  border: 1px solid #1B72E8;
`

const ActionButton = ({type, text, primary=false, onClick}) => {
  function handleOnClick() {
    if (onClick) onClick()
  }

  const sx = {
    color: primary ? '#fff' : '#1B72E8',
    fontSize: 18
  }

  let icon
  switch(type) {
    case 'bookmark': {
      icon = <BookmarkBorderIcon sx={sx} />
      break
    }
    case 'hide': {
      icon = <HideSourceIcon sx={sx} />
      break
    }
    case 'comment': {
      icon = <CommentIcon sx={sx} />
      break
    }
    case 'share': {
      icon = <ShareIcon sx={sx} />
      break
    }
    default: {
      icon = <QuestionMarkIcon sx={sx} />
      break
    }
  }

  return (
    <Container onClick={handleOnClick}>
      <Circle primary={primary}>
        {icon}
      </Circle>
      <span>{text}</span>
    </Container>
  )
}

export default ActionButton
