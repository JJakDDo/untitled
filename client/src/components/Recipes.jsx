import React, { useState, useEffect } from "react";
import axios from "axios";

import ImageWithTooltip from "./ImageWithTooltip";
import { CardButton } from "../styles/CardButton.styled";

import {
  RecipeCard,
  ItemContainer,
  MateiralContainer,
} from "../styles/Recipe.styled";

const Recipes = ({
  recipe,
  setTooltipVisible,
  setItemType,
  setTooltipX,
  setTooltipY,
  setCraftedItem,
  setIsModalVisible,
}) => {
  const craftItems = async (id) => {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await axios.post(
        `http://localhost:4000/craft/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        setCraftedItem(response.data[0]);
      } else {
        setCraftedItem({});
      }
      setIsModalVisible(true);
    }
  };

  return (
    <RecipeCard>
      <ItemContainer>
        <ImageWithTooltip
          setTooltipVisible={setTooltipVisible}
          setItemType={setItemType}
          setTooltipX={setTooltipX}
          setTooltipY={setTooltipY}
          type={recipe}
        ></ImageWithTooltip>
      </ItemContainer>
      <MateiralContainer>
        {recipe.required.map((item, idx) => {
          return (
            <ImageWithTooltip
              key={idx}
              setTooltipVisible={setTooltipVisible}
              setItemType={setItemType}
              setTooltipX={setTooltipX}
              setTooltipY={setTooltipY}
              type={item}
              amount={item.amount}
            ></ImageWithTooltip>
          );
        })}
      </MateiralContainer>
      <div className='btnContainer'>
        <CardButton
          width={"64px"}
          height={"64px"}
          onClick={() => craftItems(recipe._id)}
        >
          제작
        </CardButton>
      </div>
    </RecipeCard>
  );
};

export default Recipes;
