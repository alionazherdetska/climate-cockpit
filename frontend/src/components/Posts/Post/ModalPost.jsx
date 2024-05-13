import { useState } from "react";
import { useSelector } from "react-redux";
import likeHeart from "../../../assets/svgs/heart_rgb.png";
import shareArrow from "../../../assets/svgs/share.svg";
import useApiRequest from "../../../hooks/useApiRequest.js";
import Overlay from "../../Overlay/Overlay.jsx";
import ProfileLink from "../../ProfileLink/ProfileLink.jsx";
import {
  FooterContainer,
  LikeCount,
  ModalPostContainer,
  PostActionButton,
  PostActionWrapper,
  PostContentContainer,
  PostHeaderWrapper,
  PostImage,
  PostImageContainer,
  PostText,
} from "./Post.style.js";

const ModalPost = ({ postData, onClose }) => {
  const userData = useSelector((store) => store.loggedInUser.user);

  const [postIsLiked, setPostIsLiked] = useState(postData.logged_in_user_liked);
  const [amountOfLikes, setAmountOfLikes] = useState(postData.amount_of_likes);
  const { sendRequest } = useApiRequest();
  const postHasImages = postData.images.length > 0;

  const handleClickLike = () => {
    sendRequest("post", `social/posts/toggle-like/${postData.id}/`);
    setPostIsLiked(!postIsLiked);
    postIsLiked
      ? setAmountOfLikes(amountOfLikes - 1)
      : setAmountOfLikes(amountOfLikes + 1);
  };

  return (
    <Overlay onClose={onClose}>
      <ModalPostContainer $hasImages={postHasImages}>
        {postHasImages && (
          <PostImageContainer>
            {postData.images.map((image, index) => (
              <PostImage key={index} src={image.image} alt={image.image} />
            ))}
          </PostImageContainer>
        )}
        <PostContentContainer>
          <PostHeaderWrapper>
            <ProfileLink
              user={postData.user}
              isLoggedInUser={postData.user.id === userData.id}
              created={postData.created}
            />
          </PostHeaderWrapper>
          <PostText>{postData.content}</PostText>
          <FooterContainer>
            <LikeCount>{amountOfLikes} likes</LikeCount>
            <PostActionWrapper>
              <PostActionButton onClick={handleClickLike}>
                <img
                  src={likeHeart}
                  alt="like heart"
                  className={postIsLiked ? "liked-post" : null}
                />
                {postIsLiked ? "Liked" : "Like"}
              </PostActionButton>
              <PostActionButton>
                <img src={shareArrow} alt="share Icon" />
                Share
              </PostActionButton>
            </PostActionWrapper>
          </FooterContainer>
        </PostContentContainer>
      </ModalPostContainer>
    </Overlay>
  );
};

export default ModalPost;
