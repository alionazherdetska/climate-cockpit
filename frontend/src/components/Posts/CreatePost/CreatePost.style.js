import styled from "styled-components";
import { defaultButtonStyles } from "../../../styles/globalStyles.js";
import paper_texture from "../../../assets/images/paper_texture2.png";
export const CreatePostModalContainer = styled.div`
  width: 100%;
  min-height: 6rem;
  max-width: 42rem;
  font-size: 19px;
  background-image: url(${paper_texture});
  box-shadow:
    0px 0px 1px rgba(0, 0, 0, 0.2),
    0px 10px 20px rgba(0, 0, 0, 0.05);
  border-radius: 4px;

  .body-container {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 2rem;
    padding: 2rem;

    .user-avatar {
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 50%;
      object-fit: cover;
    }

    .image-preview-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      width: 100%;
      grid-column: 2/-1;

      .image-preview-instance {
        position: relative;
        width: 100%;
        height: fit-content;

        button {
          position: absolute;
          top: 0.3rem;
          right: 0.3rem;
          width: 1.4rem;
          height: 1.4rem;
          border: none;
          border-radius: 50%;
          background-color: white;
          cursor: pointer;
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: 0.3rem;
        }

        span {
          width: 100%;
          display: block;
          font-size: 0.875rem;
        }
      }
    }
  }

  .footer-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #ccc;
    padding: 1rem 2rem;
  }
`;

export const AvatarAndTextField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const CustomImageUploadButton = styled.div`
  position: relative;
  width: 1.2rem;
  height: 1.2rem;

  input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }

  img {
    width: 100%;
    height: 100%;
    opacity: 40%;
  }
`;

export const SubmitButton = styled.button`
  ${defaultButtonStyles}
`;

export const CreatePostCardContainer = styled.div`
  width: 100%;
  min-height: 6rem;
  font-size: 18px;
  background-image: url(${paper_texture});
  box-shadow:
    0px 0px 1px rgba(0, 0, 0, 0.2),
    0px 10px 20px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.8rem;
`;

export const WrapperDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;

  p {
    color: ${(props) => props.theme.colors.lightGray};
  }

  img:nth-of-type(2) {
    width: 32px;
  }
`;
export const Avatar = styled.img`
  width: 7rem;
  aspect-ratio: 1/1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  object-fit: cover;
`;
