import styled, { createGlobalStyle, css } from "styled-components";
import CabinSketch from "./CabinSketch.fonts/cabin-sketch.regular.ttf";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  @font-face {
    font-family: 'CabinSketch';
    src: url(${CabinSketch}) format('truetype');
    font-weight: 400;
    font-style: italic;
  }

  body {
    width: 100vw;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    min-height: calc(100vh - 96px);
    height: 100%;
    width: 100vw;
    background: conic-gradient(from 90deg at 1.1px 1.1px, #f3f3e4 25%, rgb(217, 217, 217) 0);
    background-size: 24px 24px;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    font-family: 'CabinSketch',serif;
  }  
  
  main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem; 
  min-height: calc(100vh - ${(props) => props.theme.header_height});
  max-height: calc(100vh - ${(props) => props.theme.header_height});
  overflow-y: auto;
  margin-top: ${(props) => props.theme.header_height};
  }


  a {
    text-decoration: none;
    color: inherit
  }

  input::placeholder, textarea::placeholder {
    color: #333;
  }
`;

export const defaultButtonStyles = css`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.fontColors.button};
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.25);
  padding: 10px 20px 10px 20px;
  cursor: pointer;
  font-size: 19px;
  font-family: "CabinSketch", serif;
  font-weight: 600;

  &:hover {
    background-color: #d2baff;
    border-color: #d2baff;
  }
`;

export const PrimaryButton = styled.button`
  ${defaultButtonStyles};
  background-image: linear-gradient(132deg, #c468ff 3.32%, #6e91f6 100%);
  color: white;
  border: none;
  transition: background-image 200ms linear;
  padding: 1.5em 2.2em;
  width: 17.5rem;

  &:hover {
    background-image: linear-gradient(-48deg, #c468ff 3.32%, #6e91f6 100%);
  }
`;

export const SecondaryButton = styled.button`
  ${defaultButtonStyles}
`;

export const CardWithShadowStyles = styled.div`
  box-shadow:
    0px 0px 1px rgba(0, 0, 0, 0.2),
    0px 10px 20px rgba(0, 0, 0, 0.05);
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 0.3rem;
`;

export const CheckMark = styled.img`
  width: 5rem;
  aspect-ratio: 1/1;
  margin-bottom: 2rem;
  animation: scaleIn 400ms ease;

  @keyframes scaleIn {
    0% {
      transform: scale(0);
    }
    80% {
      transform: scale(1.3) rotate(-10deg);
    }
    100% {
      transform: scale(1) rotate(0);
    }
  }
`;

export default GlobalStyle;

export const MegatonIcon = styled.img`
  width: 1rem;
  height: 1rem;
`;
