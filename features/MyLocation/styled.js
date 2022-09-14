import styled, { css } from "styled-components"

export const Container = styled.div`
  background-color: #fefefe;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 8px;
  box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.3);
  cursor: pointer;

  @keyframes cool {
    0%,
    100% {
      color: #000;
    }
    50%,
    75% {
      color: #3a83de;
    }
  }

  svg {
    ${({ isLoading, hasLocation }) => {
      if (isLoading) {
        return css`
          animation: cool 1.2s ease-in-out infinite;
        `
      }

      if (hasLocation) {
        return css`
          color: #3a83de;
        `
      }
    }}
  }
`
