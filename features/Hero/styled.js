import styled from "styled-components";

export const Outer = styled.div`
  padding: 2rem 0 4rem;
  background-color: #fff;
  font-family: 'Noto Sans', sans-serif;
`

export const Container = styled.div`
  
  color: #757575;
  
  margin: 0 auto;
  max-width: 920px;
  

  h1 {
    margin-bottom: 0.5rem;
  }

  p {
    margin: 0 0 2rem;
  }

  .searchbar {
    margin-bottom: 3rem;
  }

  button.quick-search {
    display: flex;
    align-items: center;
    margin: 0 auto;
    border: 1px solid #757575;
    color: #757575;
    background-color: #F5F5F5;
    padding: 6px 12px;
    border-radius: 8px;
    cursor: pointer;
  }
`
