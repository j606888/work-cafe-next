import Drawer from 'features/Drawer'
import React from 'react'
import styled from 'styled-components'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Container = styled.div`
`

const Head = styled.div`
  background-color: #1a73e8;
  color: #fff;
  padding: 0.5rem 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 56px;
`

const BookmarkStore = ({ stores = [], onClick=() => {} }) => {
  const handleClick = () => {
    onClick()
  }
  return (
    <Container>
      <Drawer stores={stores}>
        <Head>
          <ArrowBackIcon sx={{cursor: 'pointer'}} onClick={handleClick}/>
          <h3>已儲存</h3>  
        </Head>
      </Drawer>
    </Container>
  )
}

export default BookmarkStore
