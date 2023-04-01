import styled from "styled-components"

const ButtonWithCount = ({ onClick, count }) => {
  return (
    <Button onClick={onClick}>
      <img src="/filter.svg" alt="filter" />
      <span>篩選條件</span>
      {count > 0 && <Badge>{count}</Badge>}
    </Button>
  )
}

const Button = styled.div`
  width: 140px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.grey01};
  font-size: 16px;
  flex-shrink: 0;
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.04));
  cursor: pointer;
  position: relative;
  background-color: #ffffff;

  img {
    width: 36px;
    height: 36px;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 52px;

    span {
      display: none;
    }
  }
`
const Badge = styled.div`
  position: absolute;
  top: -6px;
  right: -6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  background-color: ${({ theme }) => theme.colors.green01};
  border-radius: 50%;
  width: 24px;
  height: 24px;
  font-size: 14px;
`

export default ButtonWithCount
