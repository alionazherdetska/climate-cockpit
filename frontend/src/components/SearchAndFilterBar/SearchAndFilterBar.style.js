import styled from "styled-components";

export const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 23px;
  -webkit-background-clip: padding-box; /* for Safari */
  background-clip: padding-box; /* for Firefox 4+, Opera, Chrome */

  :focus {
    outline: none;
  }
`;

export const SearchBarWrapper = styled.div`
  width: 100%;
  max-width: ${(props) => props.theme.max_content_width};
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ContainerWrapperLeft = styled.form`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: start;
  outline-style: none;
  margin-bottom: 1%;
  &:hover {
    outline-style: solid;
    outline-color: black;
    outline-width: 1px;
  }
`;
export const SearchIcon = styled.img`
  margin: 0 1rem 0 1rem;
  height: 1rem;
`;
export const SearchInput = styled.input`
  border: none;
  height: 100%;
  background-color: transparent;
  font: inherit;
  :focus {
    outline: none;
  }
`;
export const ContainerWrapperRight = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: end;
`;
export const FilterWrapper = styled.div`
  display: flex;
  height: 100%;
  gap: 2rem;
  justify-content: space-between;
  align-items: center;
  margin-right: 1rem;
  font-family: inherit;
`;
export const FilterSetter = styled.button`
  background: none;
  border: none;

  cursor: pointer;
  height: 100%;
  display: flex;
  font-size: 17px;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid;
  margin-bottom: 5%;
  border-color: ${(props) => (props.$filterActive ? "black" : "transparent")};
  color: ${(props) => (props.$filterActive ? "black" : "rgba(0,0,0,0.5)")};
  font-family: inherit;

  &:hover {
    border-color: black;
  }
`;
