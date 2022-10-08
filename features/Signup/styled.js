import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  text-align: center;
  gap: 0.5rem;
  width: 420px;

  .headline {
    h2 {
      margin-bottom: 0.5rem;
    }
    margin-bottom: 2rem;
  }

  .account {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  a {
    color: #1565c0;
    text-decoration: underline;
  }

  .no-account {
    margin-top: 1rem;
    font-size: 0.9rem;
  }
`
