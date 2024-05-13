import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Main = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 4rem;
  width: 100vw;
  height: 100vh;
`;

export const ClimateChallengeWrapper = styled.div`
  width: 805px;
  height: 140px;
`;
export const StyledNavLink = styled(NavLink)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 12rem;
  z-index: 2;
`;

export const LeftBar = styled.div`
  width: 60%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  margin-left: 4%;
  margin-top: 10%;
`;

export const StyledH4 = styled.h4`
  font-size: 24px;
  font-weight: 700;
  line-height: 60px;
  color: ${(props) => props.theme.fontColors.heroPageMainColor};
`;

export const CustomH4 = styled.h4`
  font-size: 24px;
  font-weight: 700;
  line-height: 60px;
  color: ${(props) => props.theme.fontColors.heroPageSecondaryColor};
`;
