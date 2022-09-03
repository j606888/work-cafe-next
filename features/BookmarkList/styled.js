import styled from "styled-components"

export const Container = styled.div`
  width: 420px;
  background: #fff;
  height: 100vh;
`

export const Head = styled.div`
  background-color: #1a73e8;
  color: #fff;
  padding: 0.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 1rem;
  border-bottom: 1px solid #ccc;

  .new-bookmark {
    display: flex;
    align-items: center;
    color: #2b6fd5;
    gap: 0.5rem;
    cursor: pointer;
  }
`
