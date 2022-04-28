import styled from "styled-components";

export const FieldNav = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  width: 300px;

  & > li {
    flex: 1;
    text-align: center;

    &:hover {
      cursor: pointer;
    }
  }

  & > div {
    height: 4px;
    width: 100px;
    border-radius: 30px;
    background: #ff6f91;
    position: absolute;
    bottom: -5px;
    left: ${({ left }) => `${left}px`};
    transition: left 0.3s ease;
  }
`;
