import styled from "styled-components";

export const SubSectionNavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;
  column-gap: 2rem;
  font-family: inherit;
  margin-top: 0.5%;
  position: relative;
`;

export const ProfileSubNavItem = styled.button`
  background: none;
  border: none;
  text-align: center;
  font-family: inherit;
  color: ${(props) => props.theme.fontColors.profilePageSecondaryColor};

  width: 100%;
  display: flex;
  flex-direction: column;
  border-bottom: 3px solid;
  border-color: ${(props) =>
    props.$filterActive
      ? "  color: ${(props) => props.theme.fontColors.profilePageSecondaryColor};\n"
      : "transparent"};
  cursor: pointer;
  padding-top: 2rem;
  padding-bottom: 1rem;

  .nav-item-text {
    color: ${(props) =>
      props.$filterActive ? "black" : props.theme.colors.lightGray};
    font-size: 1.3rem;
    text-transform: capitalize;
    margin-top: 0.4rem;
  }

  .nav-item-counter {
    font-size: 2rem;
  }

  &:hover {
    border-color: ${(props) => props.theme.colors.primary};
  }
`;
