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
  display: grid;
  width: 350px;
  height: 350px;
  justify-items: center;
  align-items: center;
  background-color: white;
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