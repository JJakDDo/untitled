import React from "react";

import { TooltipTextContainer } from "../styles/Tooltip.styled";

const TooltipText = ({ item, isCrafting }) => {
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
            공격력:
            {isCrafting
              ? ` ${item.attack}`
              : ` ${item.attack.value} (${item.attack.tier})`}
          </p>
        )}
        {item.defense && (
          <p>
            방어력:
            {isCrafting
              ? ` ${item.defense}`
              : ` ${item.defense.value} (${item.defense.tier})`}
          </p>
        )}
        {item.hp && (
          <p>
            체력:
            {isCrafting ? ` ${item.hp}` : ` ${item.hp.value} (${item.hp.tier})`}
          </p>
        )}
        {item.speed && (
          <p>
            스피드:
            {isCrafting
              ? ` ${item.speed}`
              : ` ${item.speed.value} (${item.speed.tier})`}
          </p>
        )}
        {item.evasion && (
          <p>
            회피율:
            {isCrafting
              ? ` ${item.evasion}`
              : ` ${item.evasion.value} (${item.evasion.tier})`}
          </p>
        )}
        {item.criticalRate && (
          <p>
            크리티컬 확률:
            {isCrafting
              ? ` ${item.criticalRate}`
              : ` ${item.criticalRate.value} (${item.criticalRate.tier})`}
          </p>
        )}
        {item.criticalDamage && (
          <p>
            크리티컬 데미지:
            {isCrafting
              ? ` ${item.criticalDamage}`
              : ` ${item.criticalDamage.value} (${item.criticalDamage.tier})`}
          </p>
        )}
      </TooltipTextContainer>
    );
  }
};

export default TooltipText;
