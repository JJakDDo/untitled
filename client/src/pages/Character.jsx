import axios from "axios";
import React, { useState, useEffect } from "react";

import {
  Container,
  MainStatContainer,
  SubStatContainer,
  TextContainer,
} from "../styles/CharacterStat.styled";

const Character = () => {
  const [characterInfo, setCharacterInfo] = useState({});

  const getCharacterInfo = async () => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      const response = await axios.get("http://localhost:4000/character", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setCharacterInfo(response.data);
      }
    }
  };

  useEffect(() => {
    getCharacterInfo();
  }, []);
  return (
    <Container>
      <MainStatContainer>
        <TextContainer>
          <h3>힘</h3>
          <p>{characterInfo.str}</p>
        </TextContainer>
        <TextContainer>
          <h3>민첩</h3>
          <p>{characterInfo.dex}</p>
        </TextContainer>
        <TextContainer>
          <h3>지능</h3>
          <p>{characterInfo.int}</p>
        </TextContainer>
      </MainStatContainer>
      <SubStatContainer>
        <TextContainer>
          <h4>공격력</h4>
          <p>{characterInfo.attack}</p>
        </TextContainer>
        <TextContainer>
          <h4>방어력</h4>
          <p>{characterInfo.defense}</p>
        </TextContainer>
        <TextContainer>
          <h4>스피드</h4>
          <p>{characterInfo.speed}</p>
        </TextContainer>
        <TextContainer>
          <h4>회피율</h4>
          <p>{characterInfo.evasion}%</p>
        </TextContainer>
        <TextContainer>
          <h4>크리티컬 확률</h4>
          <p>{characterInfo.criticalRate}%</p>
        </TextContainer>
        <TextContainer>
          <h4>크리티컬 데미지</h4>
          <p>{characterInfo.criticalDamage}%</p>
        </TextContainer>
      </SubStatContainer>
    </Container>
  );
};

export default Character;
