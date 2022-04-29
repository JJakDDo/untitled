import React from "react";

import { TooltipTextContainer } from "../styles/Tooltip.styled";

const TooltipText = ({ item }) => {
  console.log(item);

  if (item) {
    return (
      <TooltipTextContainer>
        <h3>
          {item.name} Lv{item.level}
        </h3>
        <h5>{item.type}</h5>
        <i>{item.description}</i>
        {item.attack && <p>공격력: {item.attack}</p>}
        {item.defense && <p>방어력: {item.defense}</p>}
        {item.hp && <p>Hp: {item.hp}</p>}
        {item.speed && <p>스피드: {item.speed}</p>}
        {item.evasion && <p>회피율: {item.evasion}%</p>}
        {item.criticalRate && <p>크리티컬 확률: {item.criticalRate}%</p>}
        {item.criticalDamage && <p>크리티컬 데미지: {item.criticalDamage}%</p>}
      </TooltipTextContainer>
    );
  }
};

export default TooltipText;
