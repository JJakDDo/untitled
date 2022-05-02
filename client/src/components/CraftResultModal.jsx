import React from "react";
import {
  ModalOverlay,
  ModalContainer,
  ModalBattleScene,
  ModalAttackContainer,
  MonsterContainer,
  CharacterContainer,
  CloseButton,
  ModalResultContainer,
  ModalResultImageContainer,
} from "../styles/Modal.styled";
import { CardButton } from "../styles/CardButton.styled";
import { FlexBox } from "../styles/FlexBox.styled";

const CraftResultModal = ({ setIsModalVisible, craftedItem }) => {
  console.log(craftedItem);
  return (
    <ModalOverlay>
      <ModalContainer style={{ height: "300px" }}>
        <CloseButton>
          <CardButton
            width='30px'
            height='30px'
            onClick={() => setIsModalVisible(false)}
          >
            X
          </CardButton>
        </CloseButton>
        <FlexBox>
          <img style={{ width: "96px", height: "96px" }}></img>
          <h3>
            {craftedItem.name} Lv{craftedItem.level}
          </h3>
          <h5>{craftedItem.type}</h5>
          <i>{craftedItem.description}</i>
          {craftedItem.attack && (
            <p>
              공격력: {craftedItem.attack.value} ({craftedItem.attack.tier})
            </p>
          )}
          {craftedItem.defense && (
            <p>
              방어력: {craftedItem.defense.value} ({craftedItem.defense.tier})
            </p>
          )}
          {craftedItem.hp && (
            <p>
              체력: {craftedItem.hp.value} ({craftedItem.hp.tier})
            </p>
          )}
          {craftedItem.speed && (
            <p>
              스피드: {craftedItem.speed.value} ({craftedItem.speed.tier})
            </p>
          )}
          {craftedItem.evasion && (
            <p>
              회피율: {craftedItem.evasion.value} ({craftedItem.evasion.tier})
            </p>
          )}
          {craftedItem.criticalRate && (
            <p>
              크리티컬 확률: {craftedItem.criticalRate.value} (
              {craftedItem.criticalRate.tier})
            </p>
          )}
          {craftedItem.criticalDamage && (
            <p>
              크리티컬 데미지: {craftedItem.criticalDamage.value} (
              {craftedItem.criticalDamage.tier})
            </p>
          )}
        </FlexBox>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default CraftResultModal;
