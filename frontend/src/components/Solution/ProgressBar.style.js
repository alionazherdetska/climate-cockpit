import styled from "styled-components";

export const ProgressContainer = styled.div`
  width: 100%;
  height: 35px;
  font-size: 20px;
  border: 2px solid ${(props) => props.theme.ProgressBar.borderColor};
  margin-bottom: 25px;
  padding: 2px;
`;

export const ProgressBar = styled.div`
  height: 100%;
  background-image: var(--background-image);
  width: ${(props) => props.$percentage}%;
`;
