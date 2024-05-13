import styled from "styled-components";

export const ButtonsStyle = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.fontColors.button};
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.25);
  padding: 10px 20px 10px 20px;
  cursor: pointer;
  font-size: 19px;
  font-family: "CabinSketch", serif;
  font-weight: 600;
`;

export const ButtonsStyleRed = styled.button``;

export const ButtonsStyleGreen = styled.button`
  background-color: ${(props) => props.theme.colors.selectedSolution};
  color: ${(props) => props.theme.fontColors.button};
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.25);
  padding: 10px 20px 10px 20px;
  cursor: pointer;
  font-size: 19px;
`;
