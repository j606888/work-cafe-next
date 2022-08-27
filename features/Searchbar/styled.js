import styled from "styled-components";

export const Container = styled.div`
  border: 1px solid #666;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 4px;
  border-radius: 8px;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    left: 50%;
    border-left: 1px solid #666;
    height: 70%;
  }

  .filter {
    position: absolute;
    left: 51%;
  }
`
