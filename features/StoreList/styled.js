import styled from "styled-components"

export const Scrollbar = styled.div`
  width: ${props => props.theme.sidebarWidth};
  overflow-y: scroll;
  height: calc(100vh - 80px);
  box-shadow: 1px 0 3px 1px rgba(0,0,0,0.2);

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background: #eeeeee;
  }

  ::-webkit-scrollbar-thumb {
    background: #666;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #aaaaaa;
  }
`
