import React, { useState, useEffect } from "react";
import axios from "axios";

import Recipes from "../components/Recipes";
import TooltipText from "../components/TooltipText";
import CraftResultModal from "../components/CraftResultModal";

import { FlexBox } from "../styles/FlexBox.styled";
import { Tooltip } from "../styles/Tooltip.styled";

const Craft = () => {
  const [recipes, setRecipes] = useState([]);
  const [tooltipVisible, setTooltipVisible] = useState("hidden");
  const [tooltipX, setTooltipX] = useState(0);
  const [tooltipY, setTooltipY] = useState(0);
  const [itemType, setItemType] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [craftedItem, setCraftedItem] = useState({});

  const getRecipes = async () => {
    const response = await axios.get(`http://localhost:4000/craft`);
    if (response.status === 200) {
      setRecipes(response.data);
    }
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <FlexBox>
      {recipes.map((recipe, idx) => {
        return (
          <Recipes
            key={idx}
            recipe={recipe}
            setTooltipVisible={setTooltipVisible}
            setItemType={setItemType}
            setTooltipX={setTooltipX}
            setTooltipY={setTooltipY}
            setCraftedItem={setCraftedItem}
            setIsModalVisible={setIsModalVisible}
          />
        );
      })}
      <Tooltip
        visibility={tooltipVisible}
        tooltipX={tooltipX}
        tooltipY={tooltipY}
      >
        <TooltipText item={itemType} isCrafting={true} />
      </Tooltip>
      {isModalVisible && (
        <CraftResultModal
          setIsModalVisible={setIsModalVisible}
          craftedItem={craftedItem}
        />
      )}
    </FlexBox>
  );
};

export default Craft;
