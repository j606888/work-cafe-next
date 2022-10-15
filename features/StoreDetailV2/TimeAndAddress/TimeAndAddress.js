import React from "react"
import styled from "styled-components"
import BusinessIcon from '@mui/icons-material/Business';
import { devices } from "constant/styled-theme"

const Container = styled.div`
  margin-left: 104px;
  margin-top: 12px;

  @media ${devices.iphoneSE} {
    margin: 0 24px 12px;
  }
`

const ListItem = styled.div`
  display: flex;
  gap: 8px;
  padding: 8px 0;
  font-size: 14px;
  color: #757575;

  a {
    color: #757575;
  }

  @media ${devices.iphoneSE} {
    a {
      display: none;
    }
  }
`

const TimeAndAddress = ({ address,  url }) => {
  return (
    <Container>
      <ListItem>
        <BusinessIcon />
        <span>{address} </span>
        <a href={url} target="_blank" rel="noreferrer">
          開啟Google Map導航
        </a>
      </ListItem>
    </Container>
  )
}

export default TimeAndAddress
