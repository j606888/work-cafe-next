import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  gap: 1.2rem;
  padding: 1rem;
  border-bottom: 1px solid #e5e5e5;
  cursor: pointer;

  &:hover {
    background-color: #f8f8f8;
  }
`

export const ImageBox = styled.div`
  width: 154px;
  height: 154px;
  border-radius: 8px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${({border}) => (border && `
    border: 1px solid #444;
    display: flex;
    align-items: center;
    justify-content: center;
  `)};
`

export const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #444;
  width: 225px;

  h3 {
    margin: 0;
    font-size: 18px;
    max-width: 85%;
  }

  span {
    font-size: 12px;
  }

  .opening {
    display: block;
    color: ${({openNow}) => openNow ? 'green' : 'red' };
  }

  .address {
    display: block;
    margin: 0.6rem 0;
  }

  .tag-list {
    display: flex;
    gap: 0.5rem;

    span {
      border: 1px solid #444;
      border-radius: 12px;
      padding: 0.3rem 0.6rem;
    }
  }
`
