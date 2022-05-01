import React, { useState } from "react";
import axios from "axios";

import ImageWithTooltip from "./ImageWithTooltip";
import TooltipText from "./TooltipText";

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
import { Tooltip } from "../styles/Tooltip.styled";

const ManualBattleModal = ({ id, image, name, setIsModalVisible }) => {
  const [characterHp, setCharacterHp] = useState("");
  const [monsterHp, setMonsterHp] = useState("");
  const [isOver, setIsOver] = useState(false);
  const [battleID, setBattleID] = useState(0);
  const [exp, setExp] = useState(0);
  const [items, setItems] = useState([]);
  const [tooltipVisible, setTooltipVisible] = useState("hidden");
  const [tooltipX, setTooltipX] = useState(0);
  const [tooltipY, setTooltipY] = useState(0);
  const [itemType, setItemType] = useState("");

  const manualAttack = async (skillName) => {
    const token = localStorage.getItem("token");
    if (token) {
      // axios get 요청은 두번째 인자값이 options 이지만
      // post 요청은 두번째 인자값 = body 세번째 인자값이 options 이다.
      let currentBattleID = battleID;
      if (battleID === 0) {
        currentBattleID = Math.floor(new Date().getTime());
        setBattleID(currentBattleID);
      }
      const response = await axios.post(
        `http://localhost:4000/battle/manual/${id}`,
        { skillName: skillName, battleID: currentBattleID.toString() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setCharacterHp(response.data.characterHP);
        setMonsterHp(response.data.monsterHP);
        if (response.data.result === "win" || response.data.result === "lose") {
          console.log(response.data);
          setIsOver(true);
          setExp(response.data.exp);
          setItems(response.data.item);
          console.log(response.data.item);
        }
      }
    }
  };
  return (
    <ModalOverlay>
      <ModalContainer>
        <CloseButton>
          <CardButton
            width='30px'
            height='30px'
            onClick={() => setIsModalVisible(false)}
          >
            X
          </CardButton>
        </CloseButton>
        <ModalBattleScene>
          <MonsterContainer>
            <p>HP: {monsterHp}</p>
            <img src={image} />
          </MonsterContainer>
          <CharacterContainer>
            <img />
            <p>HP: {characterHp}</p>
          </CharacterContainer>
        </ModalBattleScene>
        {isOver ? (
          <ModalResultContainer>
            <h3>EXP</h3>
            <p>{exp}</p>
            <h3>아이템</h3>
            <ModalResultImageContainer>
              {items.map((item, idx) => {
                return (
                  <ImageWithTooltip
                    key={item._id}
                    setTooltipVisible={setTooltipVisible}
                    setItemType={setItemType}
                    setTooltipX={setTooltipX}
                    setTooltipY={setTooltipY}
                    type={idx}
                    amount={item.amount}
                  ></ImageWithTooltip>
                );
              })}
            </ModalResultImageContainer>
          </ModalResultContainer>
        ) : (
          <ModalAttackContainer>
            <CardButton width='150px' height='100px'>
              스킬 1
            </CardButton>
            <CardButton width='150px' height='100px'>
              스킬 2
            </CardButton>
            <CardButton width='150px' height='100px'>
              스킬 3
            </CardButton>
            <CardButton width='150px' height='100px'>
              스킬 4
            </CardButton>
            <CardButton
              width='330px'
              height='100px'
              onClick={() => manualAttack("basic")}
            >
              일반 공격
            </CardButton>
          </ModalAttackContainer>
        )}
      </ModalContainer>
      <Tooltip
        visibility={tooltipVisible}
        tooltipX={tooltipX}
        tooltipY={tooltipY}
      >
        <TooltipText item={items[itemType]} />
      </Tooltip>
    </ModalOverlay>
  );
};

export default ManualBattleModal;
