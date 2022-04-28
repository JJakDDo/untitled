import axios from "axios";
import React, { useState, useEffect } from "react";

import { FieldNav } from "../styles/Field.styled";
import { FlexBox } from "../styles/FlexBox.styled";
import { MonsterGrid } from "../styles/Monster.styled";

import Monster from "../components/Monster";

const FIELDLIST = ["태초마을", "옐로우시티", "상록시티"];

const Field = () => {
  const [currentField, setCurrentField] = useState(0);
  const [monsters, setMonsters] = useState([]);

  const changeField = (value) => {
    setCurrentField(value);
  };

  const getMonstersByField = async () => {
    const response = await axios.get(
      `http://localhost:4000/monster/${FIELDLIST[currentField]}`
    );
    if (response.status === 200) {
      console.log(response);
      setMonsters(response.data.monster);
    }
  };

  useEffect(() => {
    getMonstersByField();
  }, [currentField]);

  return (
    <FlexBox>
      <FieldNav left={currentField * 100}>
        {FIELDLIST.map((field, idx) => {
          return (
            <li key={idx} onClick={() => changeField(idx)}>
              {field}
            </li>
          );
        })}
        <div></div>
      </FieldNav>
      <MonsterGrid>
        {monsters.map((monster) => {
          return <Monster key={monster._id} {...monster} />;
        })}
      </MonsterGrid>
    </FlexBox>
  );
};

export default Field;
