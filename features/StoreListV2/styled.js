import styled from "styled-components"

export const Container = styled.div`
  background-color: #fff;
  display: inline-flex;
  flex-direction: column;
  height: 100vh;
  position: relative;

  .white-box {
    position: absolute;
    left: 0;
    top: 0;
    width: 374px;
    background-color: #fff;
    height: 4rem;
    z-index: 1;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
`

export const Scrollbar = styled.div`
  overflow-y: scroll;
  height: 100vh;
  padding-top: 5rem;
`
