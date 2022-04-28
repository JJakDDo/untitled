import styled from "styled-components";

export const MonsterGrid = styled.div`
  display: grid;
  width: 800px;
  margin-top: 20px;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
`;

export const MonsterCard = styled.div`
  width: 200px;
  height: 300px;
  background-color: #ff6f91;
  border-radius: 10px;
  color: white;

  & > img {
    width: 100%;
  }

  & > button {
    margin-top: 20px;
    width: 100px;
    height: 30px;
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
  }
`;
