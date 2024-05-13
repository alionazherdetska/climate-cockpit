import styled from "styled-components";

export const StyledImage = styled.img`
  width: auto;
  height: 25px;
  cursor: pointer;
`;

export const DropdownLayout = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5%;
  margin-bottom: 0.5%;
`;

export const DropdownContent = styled.div`
  position: absolute;
  background: conic-gradient(
    from 90deg at 1.1px 1.1px,
    #f3f3e4 25%,
    rgb(217, 217, 217) 0
  );
  display: flex;
  background-size: 24px 24px;
  flex-direction: column;
  align-items: flex-end;
  top: 100%;
  width: 17rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  z-index: 1;
  padding: 10px;
  border-radius: 5px;
  gap: 1.4rem;
  height: 19rem;
`;

export const TitleAndImage = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  gap: 1rem;
  margin-bottom: 0.5rem;

  img {
    height: 20px;
    width: auto;
  }
`;

export const DropdownSelect = styled.select`
  width: inherit;
  padding: 5px;
  margin-top: 0px;
  border: 1px solid ${(props) => props.theme.backgroundColors.lightGrayBorder};
  border-radius: 5px;
  background-size: 24px 24px;
`;

export const DropdownSort = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ContainerTop = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 3rem;
`;

DropdownSort.displayName = "DropdownSort";
