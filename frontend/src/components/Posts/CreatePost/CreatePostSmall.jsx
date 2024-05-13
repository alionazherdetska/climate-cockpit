import {
  Avatar,
  CreatePostCardContainer,
  WrapperDiv,
} from "./CreatePost.style.js";
import defaultAvatar from "../../../assets/svgs/avatar.svg";

import { useSelector } from "react-redux";
import CreatePostModal from "./CreatePostModal.jsx";
import newPost from "../../../assets/images/new.png";

const CreatePostSmall = ({
  postToShare,
  setModalIsOpen,
  modalIsOpen,
  setListOfPosts,
}) => {
  const userData = useSelector((store) => store.loggedInUser.user);

  return (
    <CreatePostCardContainer>
      {userData && (
        <WrapperDiv onClick={() => setModalIsOpen(true)}>
          <Avatar src={userData.avatar || defaultAvatar} />
          <p>What's on your mind, {userData.first_name}?</p>
          <img
            src={newPost}
            alt="New Post"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              filter: "saturate(0.1) brightness(1.35)",
              cursor: "pointer",
            }}
          />
        </WrapperDiv>
      )}
      {modalIsOpen && (
        <CreatePostModal
          setListOfPosts={setListOfPosts}
          userData={userData}
          setModalIsOpen={setModalIsOpen}
          postToShare={postToShare}
        />
      )}
    </CreatePostCardContainer>
  );
};

export default CreatePostSmall;
