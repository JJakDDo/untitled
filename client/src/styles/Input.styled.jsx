import styled from "styled-components";

export const Input = styled.input`
  width: 300px;
  height: 50px;
  border: none;
  border-bottom: 1px solid grey;
  margin: 5px 0;
  font-size: 1.5rem;

  &:focus {
    outline: none;
    border-bottom: 2px solid #ff6f91;
  }
`;
