import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import StarIcon from "@mui/icons-material/Star"
import StarHalfIcon from "@mui/icons-material/StarHalf"
import StarOutlineIcon from "@mui/icons-material/StarOutline"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import useOutsideClick from 'hooks/useOutsideClick'
import DoneIcon from "@mui/icons-material/Done"

const Container = styled.div`
  position: relative;
  display: inline-block;
  background-color: ${(props) => (props.rate ? "#E1F5FE" : "white")};

  .selector {
    display: inline-flex;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0.2rem;
    align-items: center;
    color: #3c4043;
    font-size: 14px;
    gap: 4px;
    &:hover {
      cursor: pointer;
      background-color: #f5f5f5;
    }
  }

  .options {
    display: ${(props) => (props.show ? "inline-flex" : "none")};
    background-color: white;
    position: absolute;
    left: 0;
    top: 2.5rem;
    flex-direction: column;
    border: 1px solid #ccc;
    border-radius: 4px;
    z-index: 10;

    & > span {
      color: #444;
      font-size: 14px;
      padding: 0.5rem 1rem;

      &:hover {
        background-color: #f5f5f5;
        cursor: pointer;
      }
    }
  }
`

const style = {
  color: "#E7915A",
  fontSize: 14,
}

function chooseStar(limit, rating) {
  const current = rating - limit
  if (current >= 0) {
    return <StarIcon sx={style} />
  } else if (current >= -0.5) {
    return <StarHalfIcon sx={style} />
  } else {
    return <StarOutlineIcon sx={style} />
  }
}

const StarListContainer = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #aa5f09;
    width: 1.6rem;
    font-size: 14px;
  }
  padding: 0.3rem 1rem;

  &:hover {
    background-color: #f5f5f5;
    cursor: pointer;
  }
`

const StarList = ({ rating, onClick }) => {
  return (
    <StarListContainer onClick={onClick}>
      <span>{rating.toFixed(1)}</span>
      {chooseStar(1, rating)}
      {chooseStar(2, rating)}
      {chooseStar(3, rating)}
      {chooseStar(4, rating)}
      {chooseStar(5, rating)}
    </StarListContainer>
  )
}

const RatingSelect = ({ params, setParams }) => {
  const [show, setShow] = useState(false)
  const selectorRef = useOutsideClick(() => setShow(false))

  const beforeChoose = (
    <>
      <StarIcon sx={{ fontSize: 18, marginLeft: 1 }} />
      <span>評分</span>
      <ArrowDropDownIcon />
    </>
  )

  const afterChoose = (
    <>
      <DoneIcon sx={{ fontSize: 18, marginLeft: 1, color: "#1565C0" }} />
      <span style={{ color: "#1565C0", fontWeight: 'bold' }}>{params.rating}+</span>
      <StarIcon sx={{ fontSize: 22, color: "#E7915A" }} />
      <ArrowDropDownIcon sx={{ color: "#1565C0" }} />
    </>
  )

  const setRate = (rating) => {
    setParams(curParams => ({ ...curParams, rating }))
  }

  return (
    <Container show={show} rate={params.rating}>
      <div className="selector" onClick={() => setShow(true)} ref={selectorRef}>
        {params.rating ? afterChoose : beforeChoose }
      </div>
      <div className="options">
        <span onClick={() => setRate(null)}>不限評分</span>
        <StarList rating={2.0} onClick={() => setRate(2.0)} />
        <StarList rating={2.5} onClick={() => setRate(2.5)} />
        <StarList rating={3.0} onClick={() => setRate(3.0)} />
        <StarList rating={3.5} onClick={() => setRate(3.5)} />
        <StarList rating={4.0} onClick={() => setRate(4.0)} />
        <StarList rating={4.5} onClick={() => setRate(4.5)} />
      </div>
    </Container>
  )
}



export default RatingSelect
