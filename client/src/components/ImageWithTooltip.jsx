import React from "react";

const ImageWithTooltip = ({
  setTooltipVisible,
  setItemType,
  setTooltipX,
  setTooltipY,
  type,
}) => {
  return (
    <img
      onMouseOver={() => {
        setTooltipVisible("visible");
        setItemType(type);
      }}
      onMouseOut={() => setTooltipVisible("hidden")}
      onMouseMove={(e) => {
        setTooltipX(e.clientX + 20);
        setTooltipY(e.clientY);
      }}
    ></img>
  );
};

export default ImageWithTooltip;
