import styled from "styled-components";

export const Outer = styled.div`
  background-color: #F6EEE8;
  padding: 1rem 0;
  font-family: 'Noto Sans', sans-serif;
  color: #757575;
`

export const Container = styled.div`
  max-width: 920px;
  margin: 0 auto;
  display: flex;
  gap: 5rem;

  .content {
    margin-top: 1rem;
    h3 {
      font-size: 24px;
      margin-bottom: 3rem;
    }

    p {
      font-size: 18px;
      margin-bottom: 2.5rem;
    }

    span {
      font-size: 14px;
    }
  }
`
