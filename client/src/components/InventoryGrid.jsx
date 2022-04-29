import React, { useState } from "react";

import ImageWithTooltip from "./ImageWithTooltip";
import TooltipText from "./TooltipText";

import { InventoryContainer } from "../styles/Inventory.styled";
import { Tooltip } from "../styles/Tooltip.styled";

const InventoryGrid = ({ inventoryItems }) => {
  console.log(inventoryItems);
  const [tooltipVisible, setTooltipVisible] = useState("hidden");
  const [tooltipX, setTooltipX] = useState(0);
  const [tooltipY, setTooltipY] = useState(0);
  const [itemType, setItemType] = useState("");
  return (
    <InventoryContainer>
      {inventoryItems.map((item, idx) => {
        return (
          <ImageWithTooltip
            key={item._id}
            setTooltipVisible={setTooltipVisible}
            setItemType={setItemType}
            setTooltipX={setTooltipX}
            setTooltipY={setTooltipY}
            type={idx}
          ></ImageWithTooltip>
        );
      })}
      <Tooltip
        visibility={tooltipVisible}
        tooltipX={tooltipX}
        tooltipY={tooltipY}
      >
        <TooltipText item={inventoryItems[itemType]} />
      </Tooltip>
    </InventoryContainer>
  );
};

export default InventoryGrid;
