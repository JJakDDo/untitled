import styled from "styled-components";

export const CharacterImg = styled.img`
  width: 250px;
  height: 350px;
`;

export const EquippedContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Equipments = styled.div`
  width: 150px;
  height: 350px;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  justify-content: space-around;
  align-items: center;
  // 장착한 아이템이 없을 때
  & > img {
    width: 96px;
    height: 96px;
  }
  // 장착한 아이템이 있을 때
  & > .item > img {
    width: 96px;
    height: 96px;
  }
`;
