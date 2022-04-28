import styled from "styled-components";

export const Nav = styled.div`
  width: 100%;
  height: 60px;
  background-color: #ff6f91;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  margin-bottom: 30px;

  & > a {
    text-decoration: none;
    color: white;
    margin: 0 30px;
  }
`;
