import React from "react";

import { ModalOverlay, ModalContainer } from "../styles/Modal.styled";
import { CardButton } from "../styles/CardButton.styled";

const BattleModal = ({
  setIsModalVisible,
  result,
  exp,
  item,
  levelup,
  logs,
}) => {
  return (
    <ModalOverlay>
      <ModalContainer>
        <div>{result === "win" ? "승리!" : "패배.."}</div>
        <CardButton onClick={() => setIsModalVisible(false)}>확인</CardButton>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default BattleModal;
