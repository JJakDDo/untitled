import React, { useState, useEffect } from "react";
import axios from "axios";

import Equipment from "../components/Equipment";
import InventoryGrid from "../components/InventoryGrid";
import { FlexBox } from "../styles/FlexBox.styled";

const Inventory = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [equippedItems, setEquippedItems] = useState([]);
  const getInventory = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await axios.get(
        "http://localhost:4000/character/inventory",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setInventoryItems(response.data.inventory);
      const tempEquipment = {};
      response.data.equipment.forEach((item) => {
        tempEquipment[item.type] = item;
      });
      setEquippedItems(tempEquipment);
    }
  };

  useEffect(() => {
    getInventory();
  }, []);

  return (
    <FlexBox>
      <Equipment equippedItems={equippedItems}></Equipment>
      <InventoryGrid inventoryItems={inventoryItems}></InventoryGrid>
    </FlexBox>
  );
};

export default Inventory;
