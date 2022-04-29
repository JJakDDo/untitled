import React from "react";

import {
  CharacterImg,
  EquippedContainer,
  Equipments,
} from "../styles/Equiments.styled";

const Equipment = ({ equippedItems }) => {
  return (
    <EquippedContainer>
      <Equipments>
        <img></img>
        <img></img>
        <img></img>
      </Equipments>
      <CharacterImg />
      <Equipments>
        <img></img>
        <img></img>
        <img></img>
      </Equipments>
    </EquippedContainer>
  );
};

export default Equipment;
