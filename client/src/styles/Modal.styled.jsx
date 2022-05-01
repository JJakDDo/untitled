import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.9);
`;

export const ModalContainer = styled.div`
  width: 400px;
  height: 700px;
  background-color: #ff6f91;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const ModalBattleScene = styled.div`
  width: 350px;
  height: 300px;
  margin-bottom: 20px;
  position: relative;
`;

export const ModalAttackContainer = styled.div`
  display: grid;
  width: 350px;
  height: 350px;
  justify-items: center;
  align-items: center;
  grid-gap: 10px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  & > button:last-child {
    grid-column: 1 / span 2;
  }
`;

export const ModalResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  width: 350px;
  height: 350px;
  background-color: white;
`;

export const ModalResultImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  width: 250px;
  height: 64px;
  margin: 0 auto;

  & > .item {
    position: relative;
    margin-top: 15px;
    & > img {
      width: 64px;
      height: 64px;
      background-color: black;
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

export const MonsterContainer = styled.div`
  position: absolute;
  width: 200px;
  height: 150px;
  right: 0;
  margin-top: 10px;

  & > img {
    width: 100px;
    height: 100px;
  }
`;

export const CharacterContainer = styled.div`
  position: absolute;
  width: 200px;
  height: 150px;
  bottom: 0;
  margin-top: 10px;

  & > img {
    width: 100px;
    height: 100px;
  }
`;

export const CloseButton = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  top: 10px;
  right: 10px;
`;
