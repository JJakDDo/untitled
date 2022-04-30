import React from "react";

const ImageWithTooltip = ({
  setTooltipVisible,
  setItemType,
  setTooltipX,
  setTooltipY,
  type,
  onContextMenu,
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
      onContextMenu={(e) => onContextMenu(e, type)}
    ></img>
  );
};

export default ImageWithTooltip;
