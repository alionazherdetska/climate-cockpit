import styled from "styled-components";
import checkbox_checked from "../../assets/other_icons/checkbox_checked.png";
import checkbox_unchecked from "../../assets/other_icons/checkbox_unchecked.png";
import paper_texture from "../../assets/images/paper_texture2.png";

export const FilterAndList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SolutionListDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  height: 100vh;
`;

export const SolutionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 7px;

  .solutionBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 3px solid #333;
    background-color: ${(props) =>
      props.$isChecked
        ? "rgba(173, 216, 230, 0.7)"
        : "rgba(255, 255, 255, 0.5)"};
    border-radius: 10px;
    padding: 5px;
  }

  .dropdownToggleIcon {
    width: 5%;
    margin-right: 4%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .solutionBarLeft {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
  }

  .solutionName {
    font-size: ${(props) => props.theme.fontSize.solutionName};
    margin: 10px;
    font-weight: bold;
    color: #555;
  }

  .rotated {
    transform: rotate(180deg);
    transition: transform 0.3s ease;
  }

  .rotated-closed {
    transform: rotate(0deg);
    transition: transform 0.3s ease;
  }

  .solutionBarRight {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
  }

  .solutionBarRightInner {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }

  .supporters {
    img {
      width: 20px;
      height: auto;
    }
  }

  .solutionDetails {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
    background-image: url(${paper_texture});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  .solutionButton {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`;

export const ArrowImg = styled.img`
  transform: rotate(90deg);
  cursor: pointer;
`;

export const CheckboxContainer = styled.div`
  .custom-checkbox {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    cursor: pointer;
    width: 26px;
    height: 26px;
    border: none;
    background: url(${checkbox_unchecked}) no-repeat center center;
    background-size: 26px 26px;

    &:checked {
      background: url(${checkbox_checked}) no-repeat center center;
      background-size: 26px 26px;
    }
  }
`;

export const CategoryLabelDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  font-size: ${(props) => props.theme.categoryLabels.fontSize};
  font-weight: 600;
  background-image: ${(props) =>
    props.theme.categoryLabels[props.$category] ||
    props.theme.categoryLabels.default};
  color: ${(props) => props.theme.categoryLabels.fontColor};
  width: 85px;
  height: inherit;
`;

export const ImpactIconDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.$isChecked
      ? props.theme.backgroundColors.impactIconSelected
      : props.theme.backgroundColors.impactIconUnselected};
  color: ${(props) => props.theme.fontColors.impactIcon};
  border-radius: 10px;
  width: 6vh;
  height: 6vh;
  font-size: 3vh;

  img {
    filter: brightness(0) invert(1);
  }
`;
export const SolutionButtonStyle = styled.div`
  color: ${(props) => props.theme.fontColors.button};
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.25);
  padding: 10px 20px 10px 20px;
  cursor: pointer;
  font-size: 19px;
  width: auto;
  max-width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 50px;
  font-weight: bold;
`;

export const SvgIconDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.theme.backgroundColors.impactIconUnselected};
  border-radius: 10px;
  width: 6vh;
  height: 6vh;

  img {
    filter: brightness(0) invert(1);
    width: 80%;
    height: auto;
  }
`;

export const LevelButton = styled.div``;
