import styled from "styled-components";

export const Tooltip = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 20px;
  width: 200px;
  background: rgba(255, 111, 145, 0.9);
  color: white;
  z-index: 10;
  visibility: hidden;
  text-align: center;
  border-radius: 5px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  transform: ${(props) =>
    `translate(${props.tooltipX}px, ${props.tooltipY}px)`};

  visibility: ${(props) => props.visibility};
`;

export const TooltipTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

  & > h5 {
    font-weight: bold;
    margin-top: 10px;
  }

  & > i {
    font-size: 0.5rem;
    margin-top: 10px;
  }
  & > p {
    margin-top: 10px;
  }
`;
