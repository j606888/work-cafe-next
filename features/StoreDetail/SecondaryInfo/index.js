import React from "react"
import styled from "styled-components"
import PlaceIcon from "@mui/icons-material/Place"
import PublicIcon from "@mui/icons-material/Public"
import LocalPhoneIcon from "@mui/icons-material/LocalPhone"
import OpeningTime from "../OpeningTime"

const Container = styled.div`
  padding: 1rem 1.5rem;

  div {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }

  div:last-child {
    margin-bottom: 0;
  }

  svg {
    color: #1b72e8;
    font-size: 24px;
    margin-right: 1.5rem;
  }

  span {
    font-size: 14px;
    color: #333;
  }

  a {
    color: #333;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`

const WebsiteBlock = ({ website }) => {
  if (!website) return null

  let displayText = website
  if (website.includes("facebook")) {
    displayText = "facebook.com"
  } else if (website.includes("instagram")) {
    displayText = "instagram.com"
  }

  return (
    <a href={website} target="_blank" rel="noreferrer">
      {displayText}
    </a>
  )
}

const SecondaryInfo = ({
  address,
  website,
  phone,
  isOpenNow = false,
  openingHours = [],
}) => {
  return (
    <Container>
      <div>
        <PlaceIcon />
        <span>{address}</span>
      </div>
      <div>
        <OpeningTime openingHours={openingHours} isOpenNow={isOpenNow} />
      </div>
      {website && (
        <div>
          <PublicIcon />
          <WebsiteBlock website={website} />
        </div>
      )}
      {phone && (
        <div>
          <LocalPhoneIcon />
          <span>{phone}</span>
        </div>
      )}
    </Container>
  )
}

export default SecondaryInfo
