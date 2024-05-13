import styled from "styled-components";

export const Main = styled.div`
  height: 100%;
  width: 100%;
  margin-top: 5rem;
  overflow-y: scroll;
  display: flex;
  gap: 2rem;
  flex-direction: row;
`;
export const DashboardGridDiv = styled.div`
  display: flex;
  width: 90%;
  padding-top: 1%;
  padding-right: 1%;
  padding-left: 1%;
  flex-direction: column;
  margin-left: 3rem;
  box-sizing: border-box;
  border: 2px solid ${(props) => props.theme.emissionColors.inland};
  position: relative;

  & > div {
    padding-bottom: 1.5%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 2.1%;
  }

  & > div > div {
    display: flex;

    flex-direction: row;
    align-items: center;
  }

  .left-column {
    width: 60%;
    padding-right: 0.9%;
    justify-content: center;
    gap: 4.1%;
    margin-left: 2%;
  }

  .right-column {
    display: flex;
    justify-content: flex-end;
    width: 40%;
    padding-right: 2%;
  }

  .innovation {
    display: flex;
    justify-content: flex-start;
  }

  .money {
    display: flex;

    justify-content: flex-end;
  }
`;

export const StyledH2 = styled.h2`
  font-size: 23px;
  font-weight: 500;
  margin-left: 3rem;
  margin-top: 1rem;
  margin-bottom: 0.4rem;
  line-height: 19px;
`;

export const StyledP = styled.p`
  line-height: 6px;
  font-size: 17px;
  padding-bottom: 0.5%;
  padding-left: 2.1%;
`;

export const CustomStyledP = styled.p`
  line-height: 1px;
  font-size: 19px;
  padding-right: 82%;
`;

export const CustomStyledP2 = styled.p`
  line-height: 1px;
  font-size: 17px;
`;

export const DashboardCategoriesTotalPoints = styled.div`
  padding-top: 0.95rem;
  padding-bottom: 0.25rem;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: start;
  border-bottom: 1.2px solid
    ${(props) => props.theme.colors.solutionPagePrimaryColor};
  font-size: ${(props) => props.theme.fontSize.equation};
  color: ${(props) => props.theme.fontColors.primary};
  font-weight: 500;
  padding-left: 3%;
  padding-right: 3%;

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 80%;
  }

  .inland-emissions {
    color: ${(props) => props.theme.fontColors.emissionColor};
  }

  .imported-emissions {
    color: ${(props) => props.theme.fontColors.emissionColor};
  }

  .removed-emissions {
    color: ${(props) => props.theme.fontColors.removalColor};
  }

  .solution-emissions {
    color: ${(props) => props.theme.fontColors.solutionColor};
  }
`;
export const Inland = styled.div`
  border: 2px solid ${(props) => props.theme.emissionColors.imported};
`;
export const Import = styled.div`
  box-sizing: border-box;
  border: 2px solid ${(props) => props.theme.emissionColors.imported};
  position: relative;
  width: 90%;
  margin-left: 3rem;
  padding-left: 1.6rem;
  padding-top: 0.2rem;
`;

export const Removal = styled.div`
  box-sizing: border-box;
  border: 2px solid ${(props) => props.theme.emissionColors.removed};
  position: relative;
  width: 90%;
  margin-left: 3rem;
  padding-left: 1.6rem;
  padding-top: 0.2rem;
`;
export const Innovation = styled.div`
  display: flex;
  width: 90%;
  flex-direction: column;
  margin-left: 3rem;
  box-sizing: border-box;
  position: relative;

  & > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  & > div > div {
    display: flex;

    flex-direction: row;
    align-items: center;
  }
`;

export const CircleShapedPoints = styled.div`
  width: 40px;
  height: 40px;
  position: absolute;
  top: -1.2rem;
  right: -1.2rem;
  border-radius: 50%;
  background-color: ${(props) => props.theme.emissionColors[props.$type]};
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.fontColors.emissionLevel};
`;

export const LeftBar = styled.div`
  width: 50.6%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border-right: 1.2px solid
    ${(props) => props.theme.colors.solutionPagePrimaryColor};

  position: sticky;
  top: 0;
  height: 100%;
  overflow-y: auto;
`;
export const RightBar = styled.div`
  width: 46%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;

  .filterDiv {
    display: flex;
    width: 100%;
    flex-direction: column;
    box-sizing: border-box;
  }
`;

export const Source = styled.div`
  margin-left: 3rem;
  width: 90%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  position: relative;
  padding: 10px;
  height: 100%;
  align-items: flex-start;
`;

export const TopDiv = styled.div`
  align-self: flex-end;
  margin-bottom: auto;
  text-align: right;
`;

export const BottomDiv = styled.div`
  align-self: flex-start;
  margin-top: auto;
  text-align: left;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
