import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #eee;
  height: 56px;
  padding: 0 1rem;
  z-index: 1201;
  position: relative;

  h3, a {
    color: #757575;
    cursor: pointer;
  }

  a {
    text-decoration: none;
    margin: 0 0.6rem;
  }

  .nav-links {
    display: flex;
    gap: 2rem;
  }
`
