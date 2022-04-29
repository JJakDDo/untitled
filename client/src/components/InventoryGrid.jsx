import React from "react";

import { InventoryContainer } from "../styles/Inventory.styled";

const InventoryGrid = ({ inventoryItems }) => {
  return (
    <InventoryContainer>
      {inventoryItems.map((item) => {
        return <img key={item._id}></img>;
      })}
    </InventoryContainer>
  );
};

export default InventoryGrid;
