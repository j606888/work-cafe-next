import styled from "styled-components"

export const Form = styled.form`
  background-color: #fff;
  width: 360px;
  border-radius: 12px;
  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.2);

  h3 {
    text-align: center;
    margin: 1rem;
  }
`

export const Scroll = styled.div`
  height: 60vh;
  overflow-y: auto;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #eeeeee;
  }

  ::-webkit-scrollbar-thumb {
    background: #cccccc;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #aaaaaa;
  }
`

export const Buttons = styled.div`
  padding: 1rem 2rem;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`
