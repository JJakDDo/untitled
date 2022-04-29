import React, { useState, useEffect } from "react";

import TooltipText from "./TooltipText";
import ImageWithTooltip from "./ImageWithTooltip";

import {
  CharacterImg,
  EquippedContainer,
  Equipments,
} from "../styles/Equiments.styled";
import { Tooltip } from "../styles/Tooltip.styled";

const Equipment = ({ equippedItems }) => {
  const [tooltipVisible, setTooltipVisible] = useState("hidden");
  const [tooltipX, setTooltipX] = useState(0);
  const [tooltipY, setTooltipY] = useState(0);
  const [itemType, setItemType] = useState("");
  useEffect(() => {
    console.log(equippedItems);
  }, []);
  return (
    <EquippedContainer>
      <Equipments>
        {equippedItems.weapon ? (
          <ImageWithTooltip
            setTooltipVisible={setTooltipVisible}
            setItemType={setItemType}
            setTooltipX={setTooltipX}
            setTooltipY={setTooltipY}
            type={"weapon"}
          ></ImageWithTooltip>
        ) : (
          <img />
        )}
        {equippedItems.top ? (
          <ImageWithTooltip
            setTooltipVisible={setTooltipVisible}
            setItemType={setItemType}
            setTooltipX={setTooltipX}
            setTooltipY={setTooltipY}
            type={"top"}
          ></ImageWithTooltip>
        ) : (
          <img />
        )}
        {equippedItems.pants ? (
          <ImageWithTooltip
            setTooltipVisible={setTooltipVisible}
            setItemType={setItemType}
            setTooltipX={setTooltipX}
            setTooltipY={setTooltipY}
            type={"pants"}
          ></ImageWithTooltip>
        ) : (
          <img />
        )}
      </Equipments>
      <CharacterImg />
      <Equipments>
        {equippedItems.helmet ? (
          <ImageWithTooltip
            setTooltipVisible={setTooltipVisible}
            setItemType={setItemType}
            setTooltipX={setTooltipX}
            setTooltipY={setTooltipY}
            type={"helmet"}
          ></ImageWithTooltip>
        ) : (
          <img />
        )}
        {equippedItems.gloves ? (
          <ImageWithTooltip
            setTooltipVisible={setTooltipVisible}
            setItemType={setItemType}
            setTooltipX={setTooltipX}
            setTooltipY={setTooltipY}
            type={"gloves"}
          ></ImageWithTooltip>
        ) : (
          <img />
        )}
        {equippedItems.shoes ? (
          <ImageWithTooltip
            setTooltipVisible={setTooltipVisible}
            setItemType={setItemType}
            setTooltipX={setTooltipX}
            setTooltipY={setTooltipY}
            type={"shoes"}
          ></ImageWithTooltip>
        ) : (
          <img />
        )}
      </Equipments>
      <Tooltip
        visibility={tooltipVisible}
        tooltipX={tooltipX}
        tooltipY={tooltipY}
      >
        <TooltipText item={equippedItems[itemType]} />
      </Tooltip>
    </EquippedContainer>
  );
};

export default Equipment;
