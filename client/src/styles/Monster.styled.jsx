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
  padding: 20px;

  & > img {
    width: 150px;
    height: 150px;
    margin-bottom: 20px;
  }
`;
