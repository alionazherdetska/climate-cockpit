import Hero3DCloud from "../components/HeroPageComponents/Hero3DCloud.jsx";
import {
  Main,
  StyledNavLink,
} from "../components/HeroPageComponents/HeroPage.style.js";
import HeroPage3DContent from "../components/HeroPageComponents/HeroPage3DContent.jsx";
import { ButtonsStyle } from "../styles/buttons.style.js";

const HeroPage = () => {
  return (
    <>
      <Main>
        <HeroPage3DContent />
        <Hero3DCloud />
      </Main>
      <StyledNavLink to="/solutions">
        <ButtonsStyle style={{ padding: "20px 60px 20px 60px" }}>
          Start Your Climate Journey
        </ButtonsStyle>
      </StyledNavLink>
    </>
  );
};

export default HeroPage;
