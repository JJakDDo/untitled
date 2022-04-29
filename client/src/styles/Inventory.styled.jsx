import styled from "styled-components";

export const InventoryContainer = styled.div`
  margin-top: 50px;
  display: grid;
  width: 550px;
  grid-template-columns: repeat(8, 1fr);
  gap: 2px;

  & > img {
    width: 64px;
    height: 64px;
    background-color: black;
  }
`;
