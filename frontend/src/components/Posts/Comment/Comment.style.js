import styled from "styled-components";

export const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const CommentInput = styled.input`
  flex-grow: 1;
  line-height: 28px;
  background: conic-gradient(
    from 90deg at 1.1px 1.1px,
    #f3f3e4 25%,
    rgb(217, 217, 217) 0
  );
  background-size: 24px 24px;
  padding: 10px;
  border: 1px solid darkgray;
  font-size: 19px;
  font-family: "CabinSketch", serif;
  font-weight: 500;
  outline-style: none;
  border-radius: 4px;
  margin-right: 10px;
`;

export const DeleteSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  margin-right: 0.8vw;
`;

export const PostButton = styled.button`
  border: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
  background-color: transparent;
  gap: 0.5rem;
  font-family: inherit;
  cursor: pointer;
  margin-top: 3%;

  &:hover {
    transform: scale(1.2);
  }
  img {
    filter: saturate(0.25) brightness(1.35);
    width: 1.5rem;
    height: 1.5rem;
    transition: transform 200ms ease;
  }
`;

export const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: none;
  width: 100%;
  padding: 20px;
  border-radius: 8px;
`;

export const CommentContent = styled.div`
  margin-top: 3%;
  font-size: 18px;
  margin-left: 1.4%;
`;

export const CommentBlock = styled.div`
  background-color: #f9f9f9; // A light grey background for each comment block
  padding: 15px; // Some padding to space out the content
  border-radius: 4px; // Rounded corners for the block
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); // A subtle shadow for depth
  margin-bottom: 5%; // Space between subsequent comments
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2); // A deeper shadow on hover for an interactive effect
  }
`;

export const StyledImg = styled.img`
  width: 2rem;
  height: 1.5rem;
  margin-left: 1.5%;
  filter: saturate(0) brightness(1.35) opacity(0.8);
`;
