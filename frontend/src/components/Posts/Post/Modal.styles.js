import styled from "styled-components";
import paper_texture from "../../../assets/images/paper_texture2.png";

export const CreatePostModalContainer = styled.div`
  background-image: url(${paper_texture});
  min-height: 15rem;
  min-width: 39rem;
  max-width: 42rem;
  box-shadow:
    0px 0px 1px rgba(0, 0, 0, 0.2),
    0px 10px 20px rgba(0, 0, 0, 0.05);
  border-radius: 4px;

  .body-container {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    padding: 3rem;
  }

  .user-avatar {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    object-fit: cover;
  }
`;

export const LeftPart = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 100%;
  gap: 1.7rem;
`;

export const AvatarAndName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.2rem;

  h3 {
    font-size: 18px;
  }
`;

export const RightPart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: start;
  width: 20%;
  gap: 0.5rem;
  height: 13rem;
`;

export const BrowseAndRemove = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledLabel = styled.label`
  width: 6rem;
  border: 1.5px solid gray;
  margin-right: 1%;
  margin-left: 1%;
  padding: 8px 16px 8px 16px;
  margin-bottom: 5%;
  font-size: 15px;
  font-family: "CabinSketch", serif;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  background: conic-gradient(
    from 90deg at 1.1px 1.1px,
    #f3f3e4 25%,
    rgb(217, 217, 217) 0
  );
  color: black;
  height: 2.4rem;
  border-radius: 10px;
  cursor: pointer;
  //box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.8);
`;

export const StyledInput = styled.input`
  display: none;
`;

export const StyledTextarea = styled.textarea`
  width: 100%;
  height: 13rem;
  background: conic-gradient(
    from 90deg at 1.1px 1.1px,
    #f3f3e4 25%,
    rgb(217, 217, 217) 0
  );
  background-size: 24px 24px;
  padding: 8px;
  margin-bottom: 10px;
  font-size: 19px;
  font-family: "CabinSketch", serif;
  font-weight: 600;
  border: 1px solid darkgray;
  border-radius: 4px;
  outline: none;

  &:focus {
    outline: 1.5px solid darkgray;
  }
`;

export const StyledImg = styled.img`
  width: 1.7rem;
  filter: saturate(0.2) brightness(1.35);
  height: 1.6rem;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

export const buttonStyles = `
background: conic-gradient(
    from 90deg at 1.1px 1.1px,
    #f3f3e4 25%,
    rgb(217, 217, 217) 0
  );
  width: 6rem;
  border: 1.5px solid gray;
  border-radius: 10px;
  margin-right: 1%;
  margin-left: 1%;
  padding: 8px 16px 8px 16px;
  margin-bottom: 1%;
  cursor: pointer;
  font-size: 14.5px;
  font-family: "CabinSketch", serif;
  font-weight: 600;
`;

export const SaveButton = styled.button`
  ${buttonStyles};
  color: ${(props) => props.theme.fontColors.primary};
`;

export const RemoveButton = styled.button`
  ${buttonStyles}
  display: flex;
  height: 2.45rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-size: cover;
  color: ${(props) => props.theme.fontColors.primary};
`;

export const StyledImagePreview = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 95%;
`;
