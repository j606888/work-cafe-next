import styled from "styled-components"

export const Container = styled.div`
  width: 280px;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  color: #333;

  span {
    font-size: 18px;
    font-weight: 500;
  }

  svg {
    cursor: pointer;
  }
`

export const Tabs = styled.div`
  padding: 0.7rem;

  div {
    display: flex;
    align-items: center;
    padding: 0.7rem;
    gap: 1rem;
    cursor: pointer;

    span {
      font-size: 13px;
    }

    svg {
      font-size: 22px;
    }

    &:hover {
      color: #2980B9;
    }
  }

  a {
    color: #333;
    font-size: 12px;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`
