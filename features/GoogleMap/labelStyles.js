import { css } from "styled-components";

export const labelStyles = css`
  .labels {
    font-size: 14px;
    font-weight: 700;
    color: #222120;
    box-sizing: border-box;
    position: absolute;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 240px;
  }

  .right {
    bottom: 2.9rem;
    left: 0.9rem;
  }

  .left {
    bottom: 2.9rem;
    right: 1rem;
  }

  .top {
    bottom: 4.3rem;
    left: 50%;
    transform: translateX(-50%);
  }

  .bottom {
    top: 3.8rem;
    left: 50%;
    transform: translateX(-50%);
  }

  .labels-focus {
    background-color: white;
    border-radius: 28px;
    border: 2px solid ${({ theme }) => theme.colors.green01};
    color: #222120;
    font-size: 14px;
    font-weight: 700;
    padding: 6px 12px;
    box-sizing: border-box;
    position: absolute;
    bottom: 2.3rem;
    left: 1.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 240px;
  }
`
