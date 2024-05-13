import { useState } from "react";
import { useSelector } from "react-redux";
import MenuDot from "../../../assets/svgs/menu.svg";
import ProfileLink from "../../ProfileLink/ProfileLink.jsx";
import ModalPost from "./ModalPost.jsx";
import {
  EditButton,
  PostHeaderWrapper,
  PostImage,
  PostImageContainer,
  PostText,
  SharedPostContainer,
} from "./Post.style.js";

const SharedPost = ({ postData }) => {
  const userData = useSelector((store) => store.loggedInUser.user);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <SharedPostContainer>
      <PostHeaderWrapper>
        <ProfileLink
          user={postData.user}
          isLoggedInUser={postData.user.id === userData.id}
          created={postData.created}
        />
        {userData.id === postData.user.id && (
          <EditButton onClick={() => setModalIsOpen(true)}>
            <img src={MenuDot} />
          </EditButton>
        )}
        {modalIsOpen && (
          <ModalPost postData={postData} onClose={setModalIsOpen} />
        )}
      </PostHeaderWrapper>
      <PostHeaderWrapper>
        <PostText onClick={() => setModalIsOpen(true)}>
          {postData.content}
        </PostText>
      </PostHeaderWrapper>
      <PostImageContainer onClick={() => setModalIsOpen(true)}>
        {postData.images.map((image, index) => (
          <PostImage key={index} src={image.image} alt={image.image} />
        ))}
      </PostImageContainer>
    </SharedPostContainer>
  );
};

export default SharedPost;
