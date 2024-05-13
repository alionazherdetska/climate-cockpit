import styled from "styled-components";
import blue_texture from "../../assets/score_bar_textures/blue_texture.jpg";
import purple_texture from "../../assets/score_bar_textures/purple_texture1.jpg";
import red_texture from "../../assets/score_bar_textures/red_texture1.jpg";
import paper_texture from "../../assets/images/paper_texture2.png";

export const ScorecardContainer = styled.div`
  width: 44rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-image: url(${paper_texture});
  align-items: center;
  padding: 24px 20px;
  border-radius: 6px;
  position: absolute;
  top: 12rem;
`;

export const ScoreCardContent = styled.div`
  width: 94%;
  height: 92%;
`;

export const CategoryBar = styled.div`
  display: flex;
  width: 98%;
  height: 31px;
  margin-bottom: 0.2rem;
`;

export const LevelNames = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 98%;
  padding-bottom: 15px;
  span {
    word-wrap: break-word;
  }
`;

export const BarAndLevel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: inherit;
`;

export const CategoryPart = styled.div`
  flex: 1;
  background-size: cover;
  background-position: center;
  border: 2px solid ${(props) => props.theme.ProgressBar.borderColor};
  background-image: ${(props) => {
    const textures = [null, red_texture, purple_texture, blue_texture];
    return props.$isFilled
      ? `url(${textures[props.$level] || "none"})`
      : "none";
  }};
`;

export const TitleAndBar = styled.div`
  display: flex;
  width: 100%;
  height: inherit;
  flex-direction: row;
  align-items: start;
  gap: 2rem;
`;

export const CategoryWrap = styled.div`
  display: flex;
  margin-top: 1.5%;
`;

export const ScoreIcon = styled.div`
  width: 1rem;
  font-weight: 700;
  font-size: 1.5rem;
  display: flex;
  margin-top: 0.75%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.fontColors.secondary};
`;

export const FinalContainer = styled.div`
  width: inherit;
  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: space-between;
`;

export const CategoryLabelDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  font-size: ${(props) => props.theme.categoryLabels.fontSize};
  font-weight: 600;
  background-image: ${(props) => props.theme.categoryLabels.default};
  color: ${(props) => props.theme.categoryLabels.fontColor};
  width: 85px;
  height: inherit;
`;
