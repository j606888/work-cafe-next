import styled from "styled-components"

export const Form = styled.form`
  h3 {
    text-align: center;
    box-shadow: 0 2px 4px -2px gray;
    padding: 1rem;
    margin: 0;
  }

  input {
    display: none;
  }

  label {
    background-color: #1a73e8;
    color: #ffffff;
    padding: 0.3rem 0.6rem;
    border-radius: 8px;
    cursor: pointer;
    margin-left: 1rem;
  }
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
  padding-top: 0;
  gap: 1rem;
`


export const PreviewImageContainer = styled.div`

  margin: 0 1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  .imgBox {
    width: 132px;
    height: 84px;

    & > img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
`
