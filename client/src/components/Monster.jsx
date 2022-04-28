import React, { useState } from "react";

import { MonsterCard } from "../styles/Monster.styled";
import { CardButton } from "../styles/CardButton.styled";
import axios from "axios";

const Monster = ({
  _id,
  name,
  image,
  level,
  setIsModalVisible,
  setBattleResult,
  setSelectedMonster,
}) => {
  // 이거는 자동전투
  const attackMonster = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      // axios get 요청은 두번째 인자값이 options 이지만
      // post 요청은 두번째 인자값 = body 세번째 인자값이 options 이다.
      const response = await axios.post(
        `http://localhost:4000/battle/${_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBattleResult(response.data);
      setIsModalVisible(true);
    }
  };
  return (
    <MonsterCard>
      <img src={image} />
      <h4 style={{ marginBottom: "20px" }}>
        Lv{level} {name}
      </h4>
      {/*<CardButton onClick={attackMonster}>공격</CardButton>*/}
      <CardButton
        width='100px'
        height='30px'
        onClick={() => {
          setSelectedMonster({ id: _id, name, image });
          setIsModalVisible(true);
        }}
      >
        공격
      </CardButton>
    </MonsterCard>
  );
};

export default Monster;
