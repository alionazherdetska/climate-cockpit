import styled, { css } from "styled-components";
import { ButtonsStyle } from "../../styles/buttons.style.js";

export const FollowOrRequestButton = styled.button`
  ${ButtonsStyle};
  width: 100%;
  background: conic-gradient(
    from 90deg at 1.1px 1.1px,
    #f3f3e4 25%,
    rgb(217, 217, 217) 0
  );
  border: 1.5px solid gray;
  position: relative;
  background-size: cover;
  border-radius: 10px;
  margin-right: 1%;
  margin-left: 1%;
  box-shadow: rgba(0, 0, 0, 0.25);
  padding: 8px 16px 8px 16px;
  margin-bottom: 1%;
  cursor: pointer;
  font-size: 0.9rem;
  font-family: "CabinSketch", serif;
  font-weight: 600;
  color: ${(props) => props.theme.fontColors.primary};

  ${(props) =>
    props.$follow &&
    css`
      box-shadow: rgba(0, 0, 0, 0.25);
      color: ${(props) => props.theme.fontColors.primary};
    `}
  ${(props) =>
    props.$requestStatus &&
    css`
      box-shadow: rgba(0, 0, 0, 0.25);
      color: ${(props) => props.theme.fontColors.primary};
    `}
`;

export const RevokeRequest = styled.p`
  font-size: 0.9rem;
`;

export const TickerAndButton = styled.div`
  width: inherit;
  display: flex;
  padding-left: 0.5px;
  padding-right: 1px;
  flex-direction: row;
  font-size: 0.85rem;
`;
export const TickerImage = styled.img`
  height: 50%;
  width: 1.5em;
  opacity: 0.8;
  padding-left: 0.4rem;
`;
