import React from "react";

import { TooltipTextContainer } from "../styles/Tooltip.styled";

const TooltipText = ({ item }) => {
  if (item) {
    return (
      <TooltipTextContainer>
        <h3>
          {item.name} Lv{item.level}
        </h3>
        <h5>{item.type}</h5>
        <i>{item.description}</i>
        {item.attack && (
          <p>
            공격력: {item.attack.value} ({item.attack.tier})
          </p>
        )}
        {item.defense && (
          <p>
            방어력: {item.defense.value} ({item.defense.tier})
          </p>
        )}
        {item.hp && (
          <p>
            Hp: {item.hp.value} ({item.hp.tier})
          </p>
        )}
        {item.speed && (
          <p>
            스피드: {item.speed.value} ({item.speed.tier})
          </p>
        )}
        {item.evasion && (
          <p>
            회피율: {item.evasion.value}% ({item.evasion.tier})
          </p>
        )}
        {item.criticalRate && (
          <p>
            크리티컬 확률: {item.criticalRate.value}% ({item.criticalRate.tier})
          </p>
        )}
        {item.criticalDamage && (
          <p>
            크리티컬 데미지: {item.criticalDamage.value}% (
            {item.criticalDamage.tier})
          </p>
        )}
      </TooltipTextContainer>
    );
  }
};

export default TooltipText;
