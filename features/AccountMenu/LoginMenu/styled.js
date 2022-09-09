import styled from "styled-components";

export const Container = styled.div`
  background-color: #fff;
  min-width: 240px;

  .name {
    font-weight: 500;
  }

  .email {
    color: #666;
    font-size: 14px;
  }
`

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`

export const Body = styled.div`
  .link {
    padding: 1rem;
    display: flex;
    align-items: center;
    color: #333;
    text-decoration: none;
    gap: 0.5rem;
    width: 100%;

    &:hover {
      background-color: #eee;
    }
  }
`

export const Button = styled.button`
  padding: 4px 16px;
  border-radius: 4px;
  border: 1px solid #999;
  background-color: #fff;
  color: #333;
  cursor: pointer;
  display: block;
  margin: 1rem auto;

  &:hover {
    background-color: #f3f3f3;
  }
`
