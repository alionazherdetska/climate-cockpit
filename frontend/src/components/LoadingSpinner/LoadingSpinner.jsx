import styled, { keyframes } from "styled-components";

const animloader = keyframes`
  0% {
    box-shadow: 25px 0 white, 50px 0 white, 75px 0 white, 100px 0 white, 125px 0 white,
    150px 0 white, 25px 0 white, 50px 0 white, 75px 0 white, 100px 0 white, 125px 0 white,
    150px 0 white;
  }
  50% {
    box-shadow: 25px 20px rgba(255, 255, 255, 0.8), 50px 60px rgba(255, 255, 255, 0.8),
    75px 30px rgba(255, 255, 255, 0.8), 100px 70px rgba(255, 255, 255, 0.8), 125px 40px
    rgba(255, 255, 255, 0.8), 150px 60px rgba(255, 255, 255, 0.8), 25px 20px rgba(255,
    255, 255, 0.8), 50px 30px rgba(255, 255, 255, 0.8), 75px 10px rgba(255, 255, 255,
    0.8), 100px 30px rgba(255, 255, 255, 0.8), 125px 30px rgba(255, 255, 255, 0.8),
    150px 30px rgba(255, 255, 255, 0.8);
  }
  100% {
    box-shadow: 25px 60px rgba(255, 255, 255, 0.8), 50px 60px rgba(255, 255, 255, 0.8),
    75px 50px rgba(255, 255, 255, 0.8), 100px 70px rgba(255, 255, 255, 0.8), 125px 70px
    rgba(255, 255, 255, 0.8), 150px 60px rgba(255, 255, 255, 0.8), 25px 80px
    rgba(255, 255, 255, 0.8), 50px 80px rgba(255, 255, 255, 0.8), 75px 70px
    rgba(255, 255, 255, 0.8), 100px 60px rgba(255, 255, 255, 0.8), 125px 30px
    rgba(255, 255, 255, 0.8), 150px 30px rgba(255, 255, 255, 0.8);
  }
`;

const LoaderContainer = styled.div`
  width: 180px;
  height: 140px;
  display: block;
  margin: 0 auto 20px;
  background-image: radial-gradient(
      circle 25px at 25px 25px,
      #fff 100%,
      transparent 0
    ),
    radial-gradient(circle 50px at 50px 50px, #fff 100%, transparent 0),
    radial-gradient(circle 25px at 25px 25px, #fff 100%, transparent 0),
    radial-gradient(circle 15px at 15px 15px, #fff 100%, transparent 0),
    linear-gradient(#fff 50px, transparent 0);
  background-size:
    50px 50px,
    100px 75px,
    50px 50px,
    30px 32px,
    136px 20px;
  background-repeat: no-repeat;
  background-position:
    0px 30px,
    30px 0px,
    113px 29px,
    147px 50px,
    23px 60px;
  position: relative;
  box-sizing: border-box;

  &::after {
    content: "";
    position: absolute;
    left: 2px;
    top: 65px;
    width: 2px;
    height: 6px;
    background-color: ${(props) => props.theme.backgroundColors.loadingSpinner};
    box-sizing: border-box;
    animation: ${animloader} 0.6s linear infinite;
  }
`;

export default function LoadingSpinner() {
  return <LoaderContainer className="loader" />;
}