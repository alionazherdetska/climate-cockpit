import styled from "styled-components";
import light_blue_texture from "../../../../assets/images/light_blue_texture.jpg";

export const ProfileAboutContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  gap: 2rem;
  margin-top: 2rem;

  h3 {
    font-size: 5rem;
    font-weight: 600;
    margin-bottom: 0.8rem;
    color: ${(props) => props.theme.fontColors.profilePageSecondaryColor};
  }

  p {
    line-height: 1.6;
    hyphens: auto;
  }

  .email {
    flex: 65%;
    padding-right: 1rem;
  }
`;

export const AboutMe = styled.div`
  display: flex;
  width: 50%;
  height: 100%;
  flex-direction: column;
  p {
    line-height: 1.6;
    hyphens: auto;
  }

  h3 {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 0.8rem;
    margin-top: 0.8rem;
  }
`;
export const LikedThingsContainer = styled.ul`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.$centered ? "center" : "unset")};
  flex-wrap: wrap;
  row-gap: 1rem;
  column-gap: 0.5rem;
  list-style: none;
  margin-right: 4%;
  z-index: 1;

  h3 {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 0.8rem;
    margin-top: 0.8rem;
    color: ${(props) => props.theme.fontColors.profilePageSecondaryColor};
  }

  li {
    border-radius: 999px;
    font-size: 0.85rem;
    padding: 0.5rem 0.7rem;
    text-transform: capitalize;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url(${light_blue_texture});
  }

  li button {
    background: none;
    border: none;
    margin-left: 1rem;
    opacity: 0.3;
    cursor: pointer;
  }
`;

export const Grid = styled.div`
  display: grid;
  width: 50%;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
`;
