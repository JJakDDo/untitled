import React, { useState } from "react";
import axios from "axios";

import ImageWithTooltip from "./ImageWithTooltip";
import TooltipText from "./TooltipText";

import { InventoryContainer } from "../styles/Inventory.styled";
import { Tooltip } from "../styles/Tooltip.styled";

const InventoryGrid = ({ inventoryItems, getInventory }) => {
  const [tooltipVisible, setTooltipVisible] = useState("hidden");
  const [tooltipX, setTooltipX] = useState(0);
  const [tooltipY, setTooltipY] = useState(0);
  const [itemType, setItemType] = useState("");

  /*컴포넌트에 onClick 또는 onContextMenu 처럼 이벤트를 쓸 수 는 없다. props로 보내야한다. */
  const equipItem = async (idx) => {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await axios.post(
        "http://localhost:4000/character/equip",
        {
          inventoryIdx: idx,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log(response);
        getInventory();
      }
    }
  };

  return (
    <InventoryContainer>
      {inventoryItems.map((item, idx) => {
        return (
          <ImageWithTooltip
            key={idx}
            setTooltipVisible={setTooltipVisible}
            setItemType={setItemType}
            setTooltipX={setTooltipX}
            setTooltipY={setTooltipY}
            type={idx}
            onContextMenu={equipItem}
            amount={item.amount}
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
