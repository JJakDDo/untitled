import styled from "styled-components";

export const CardButton = styled.button`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  color: white;
  background-color: #ff6f91;
  border: 1px solid white;
  border-radius: 10px;
  box-shadow: 0 7px #af2150;

  &:hover {
    background-color: #d74a70;
  }
  &:active {
    box-shadow: 0 3px #620018;
    transform: translateY(4px);
  }
`;
