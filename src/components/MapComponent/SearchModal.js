import React from 'react'
import Modal from '@/components/Modal'
import styled from 'styled-components'
import CloseIcon from "@mui/icons-material/Close"

const Container = styled.div`
  position: relative;
  h3 {
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1.5rem;
  }

  button {
    color: white;
    background-color: #5054dd;
    border-radius: 24px;
    padding: 0.8rem 2.4rem;
    border: none;

    &:hover {
      cursor: pointer;
      background-color: #7578e5;
    }
  }
`

const SearchModal = ({ open, handleClose, handleSearch }) => {
  return (
    <Modal open={open} handleClose={handleClose}>
      <Container>
        <CloseIcon
          sx={{
            position: "absolute",
            right: -10,
            top: -10,
            "&:hover": { cursor: "pointer " },
          }}
          onClick={handleClose}
        />
        <h3>Want to search here?</h3>
        <p>
          The Max results is <b>30</b>, make sure your radius is not too wide
        </p>
        <button onClick={handleSearch}>Search</button>
      </Container>
    </Modal>
  )
}

export default SearchModal
