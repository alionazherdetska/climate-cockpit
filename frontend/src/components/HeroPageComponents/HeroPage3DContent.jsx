import climate_challenge from "../../assets/images/climate_challenge.png";
import {
  ClimateChallengeWrapper,
  CustomH4,
  LeftBar,
  StyledH4,
} from "./HeroPage.style.js";

export default function HeroPage3DContent() {
  return (
    <LeftBar>
      <ClimateChallengeWrapper>
        <img src={climate_challenge} />
      </ClimateChallengeWrapper>
      <StyledH4>
        To stop Climate Change, we have to reduce emissions to net-zero by 2050.
      </StyledH4>
      <StyledH4>This is the single biggest challenge for humanity.</StyledH4>
      <CustomH4>In order to succeed, we need YOU!</CustomH4>
    </LeftBar>
  );
}
