import React from "react";

import { MonsterCard } from "../styles/Monster.styled";

const Monster = ({ name, image, level }) => {
  return (
    <MonsterCard>
      <img src={image} />
      <h4>
        Lv{level} {name}
      </h4>
      <button>공격</button>
    </MonsterCard>
  );
};

export default Monster;
