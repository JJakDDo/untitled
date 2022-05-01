import styled from "styled-components";

export const RecipeCard = styled.div`
  width: 700px;
  height: 100px;
  display: grid;
  grid-template-columns: 1fr 5fr 1fr;
  margin-bottom: 10px;

  & > .btnContainer {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const ItemContainer = styled.div`
  & > .item > img {
    width: 96px;
    height: 96px;
    background-color: black;
  }
`;

export const MateiralContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  & > .item {
    position: relative;

    & > img {
      width: 64px;
      height: 64px;
      background-color: black;
      margin-left: 50px;
    }

    & > div {
      position: absolute;
      color: white;
      bottom: 0;
      right: 0;
      padding-right: 5px;
      padding-bottom: 5px;
    }
  }
`;
