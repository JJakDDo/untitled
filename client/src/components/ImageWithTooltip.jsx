import React from "react";

const ImageWithTooltip = ({
  setTooltipVisible,
  setItemType,
  setTooltipX,
  setTooltipY,
  type,
  onContextMenu,
  amount,
}) => {
  return (
    <div
      className='item'
      onMouseOver={() => {
        setTooltipVisible("visible");
        setItemType(type);
      }}
      onMouseOut={() => setTooltipVisible("hidden")}
      onMouseMove={(e) => {
        setTooltipX(e.clientX + 20);
        setTooltipY(e.clientY);
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        if (!amount) onContextMenu(type);
      }}
    >
      <img></img>
      {amount && <div>{amount}</div>}
    </div>
  );
};

export default ImageWithTooltip;
