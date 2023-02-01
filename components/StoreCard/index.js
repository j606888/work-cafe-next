import React from "react"
import styled from "styled-components"
import { devices } from "constants/styled-theme"
import TagList from "components/TagList/TagList"
import ImageCarousel from "components/ImageCarousel"
import NiceBadge from "components/NiceBadge"
import { useMediaQuery } from "@mui/material"

const StoreCard = React.forwardRef(
  (
    {
      placeId,
      name,
      vicinity,
      reviewsCount,
      isOpen,
      lat,
      lng,
      images = [],
      tags = [],
      onClick = () => {},
      onMouseEnter = () => {},
      onMouseLeave = () => {},
    },
    ref
  ) => {
    const fullScreen = useMediaQuery(devices.mobileXl)

    function handleClick() {
      onClick({ placeId, lat, lng })
    }

    function handleMouseEnter() {
      onMouseEnter(placeId)
    }

    return (
      <Container
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={onMouseLeave}
        ref={ref}
      >
        <ImageCarousel
          slides={images}
          width={276}
          height={276}
          mWidth={154}
          mHeight={154}
        />
        <AbNiceBadge number={reviewsCount} />
        <MainInfo>
          <h3>{name}</h3>
        </MainInfo>
        <SecondInfo>
          <OpenStatus isOpen={isOpen}>
            {isOpen ? "營業中" : "已打烊"}
          </OpenStatus>
          <Address>・{vicinity}</Address>
        </SecondInfo>
        {!fullScreen && tags.length > 0 && <CustomTagList tags={tags} fixedHeight />}
      </Container>
    )
  }
)
StoreCard.displayName = "StoreCard"

const AbNiceBadge = styled(NiceBadge)`
  position: absolute;
  left: 16px;
  top: 16px;
`
const Container = styled.div`
  width: 276px;
  background-color: #fff;
  margin-bottom: 12px;
  position: relative;
  cursor: pointer;

  h3 {
    margin: 0;
    font-size: 16px;
  }

  @media ${devices.mobileXl} {
    width: 154px;
  }
`

const MainInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0 4px;

  div {
    display: flex;
    align-items: center;
  }

  h3 {
    max-width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  @media ${devices.mobileXl} {
    flex-direction: column;
    align-items: flex-start;

    h3 {
      max-width: 95%;
    }
  }
`

const SecondInfo = styled.div`
  display: flex;
  align-items: center;

  @media ${devices.mobileXl} {
    width: 90%;
    white-space: nowrap;
  }
`

const OpenStatus = styled.div`
  font-size: 12px;
  color: ${({ isOpen }) => (isOpen ? "green" : "#D92F25")};
`

const Address = styled.p`
  color: #757575;
  margin: 0;
  font-size: 12px;
  max-width: 80%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

const CustomTagList = styled(TagList)`
  margin-top: 12px;
`

export default StoreCard
