import React from 'react'
import styled from 'styled-components'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import HideSourceIcon from '@mui/icons-material/HideSource';
import CommentIcon from '@mui/icons-material/Comment';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import ShareIcon from '@mui/icons-material/Share';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Container = styled.div`
  text-align: center;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  span {
    color: ${({color}) => color};
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
  background-color: ${({primary, color}) => primary ? color : '#fff'};
  border: 1px solid ${({ color} ) => color};
`

const ActionButton = ({type, text, primary=false, onClick, color="#1B72E8"}) => {
  function handleOnClick(e) {
    if (onClick) onClick(e)
  }

  const sx = {
    color: primary ? '#fff' : color,
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
    case 'show': {
      icon = <VisibilityIcon sx={sx} />
      break
    }
    default: {
      icon = <QuestionMarkIcon sx={sx} />
      break
    }
  }

  return (
    <Container onClick={handleOnClick} color={color}>
      <Circle primary={primary} color={color}>
        {icon}
      </Circle>
      <span>{text}</span>
    </Container>
  )
}

export default ActionButton
