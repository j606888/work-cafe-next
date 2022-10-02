import React from "react"
import styled from "styled-components"
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import LightbulbIcon from "@mui/icons-material/Lightbulb"
import AccountMenu from "features/AccountMenu"

const Container = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid #eee;
  background: #fff;

  h2 {
    font-size: 18px;
    font-weight: 700;
  }

  div {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
`

const Link = styled.a`
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  color: #666;
  gap: 0.5rem;
  padding-bottom: 2px;

  &:hover {
    border-bottom: 1px solid #666;
  }

`

const AppBar = () => {
  return (
    <Container>
      <h2>Work Cafe | Taiwan</h2>
      <div>
        <Link
          href="https://j606888.gitbook.io/work-cafe-jiao-xue-wen-jian/"
          target="_blank"
          rel="noreferrer"
        >
          <AutoStoriesIcon fontSize="small" />
          <span>教學文件</span>
        </Link>
        <AccountMenu />
      </div>
    </Container>
  )
}

export default AppBar
