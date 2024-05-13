import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import trash from "../../../assets/images/delete-folder.png";
import likeHeart from "../../../assets/images/like.png";
import comments1 from "../../../assets/images/message.png";
import shareArrow from "../../../assets/images/shortcut.png";
import edit_post from "../../../assets/images/write-message.png";
import useApiRequest from "../../../hooks/useApiRequest.js";
import useAutoFetch from "../../../hooks/useAutoFetch.js";
import ProfileLink from "../../ProfileLink/ProfileLink.jsx";
import CommentsSection from "../Comment/CommentsSection.jsx";
import EditPostModal from "./EditPosModal.jsx";
import { StyledImg } from "./Modal.styles.js";
import ModalPost from "./ModalPost.jsx";
import {
  BottomButtons,
  CommentContainer,
  CommentImg,
  DeleteButton,
  EditAndDelete,
  EditButton,
  FooterContainer,
  LeftButtons,
  LikeCount,
  PostActionButton,
  PostActionWrapper,
  PostContainer,
  PostHeaderWrapper,
  PostImage,
  PostImageContainer,
  PostText,
  RightButtons,
} from "./Post.style.js";
import SharedPost from "./SharedPost.jsx";

const Post = ({
  postData,
  setPostToShare,
  setShowCreatePostModal,
  setListOfPosts,
}) => {
  const userData = useSelector((store) => store.loggedInUser.user);
  const [comments, setComments] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [content, setContent] = useState(postData.content);
  const [postImages, setPostImages] = useState([...postData.images]);
  const [postIsLiked, setPostIsLiked] = useState(postData.logged_in_user_liked);
  const [amountOfLikes, setAmountOfLikes] = useState(postData.amount_of_likes);
  const [amountOfComments, setAmountOfComments] = useState("");
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [areCommentsVisible, setAreCommentsVisible] = useState(false);
  const { sendRequest } = useApiRequest();

  const handleDeletePost = () => {
    sendRequest("delete", `social/posts/${postData.id}/`);
    setListOfPosts((current) =>
      current.filter((post) => post.id !== postData.id),
    );
  };

  const handleClickLike = () => {
    sendRequest("post", `social/posts/toggle-like/${postData.id}/`);
    setPostIsLiked(!postIsLiked);
    postIsLiked
      ? setAmountOfLikes(amountOfLikes - 1)
      : setAmountOfLikes(amountOfLikes + 1);
  };

  const handleEditPost = () => {
    setEditModalIsOpen(true);
  };

  const sharePost = () => {
    setPostToShare(postData);
    setShowCreatePostModal(true);
  };

  const handleSaveEdit = (editedContent, editedImages) => {
    let formData = new FormData();
    formData.append("content", editedContent);
    console.log(editedImages);
    editedImages.forEach((image) => {
      formData.append(`images`, image.file);
    });

    sendRequest("patch", `social/posts/${postData.id}/`, formData, true);
    setContent(editedContent);
    setPostImages(editedImages);
  };
  const toggleComments = () => setAreCommentsVisible((prevState) => !prevState);

  const urlToFetch = `social/comments/${postData.id}/`;
  const { data } = useAutoFetch(
    "get",
    urlToFetch,
    undefined,
    areCommentsVisible,
  );
  useEffect(() => {
    if (data !== null) {
      setComments(data.results);
      setAmountOfComments(data?.results.length);
    }
  }, [data]);

  return (
    <PostContainer>
      <PostHeaderWrapper>
        <ProfileLink
          user={postData.user}
          isLoggedInUser={postData.user.id === userData.id}
          created={postData.created}
        />
        <EditAndDelete>
          {userData.id === postData.user.id && (
            <EditButton onClick={handleEditPost}>
              <StyledImg src={edit_post} />
            </EditButton>
          )}
          {modalIsOpen && (
            <ModalPost
              postData={postData}
              onClose={() => setModalIsOpen(false)}
            />
          )}
          {editModalIsOpen && (
            <EditPostModal
              avatar={postData.user.avatar}
              postData={postData}
              onClose={() => setEditModalIsOpen(false)}
              handleSaveEdit={handleSaveEdit}
            />
          )}
          {userData.id === postData.user.id && (
            <DeleteButton onClick={handleDeletePost}>
              <img src={trash} alt="delete post" />
            </DeleteButton>
          )}
        </EditAndDelete>
      </PostHeaderWrapper>
      <PostHeaderWrapper>
        <PostText onClick={() => setModalIsOpen(true)}>{content}</PostText>
      </PostHeaderWrapper>
      <PostImageContainer onClick={() => setModalIsOpen(true)}>
        {postImages.map((image) => (
          <PostImage
            key={image.id}
            src={image.image ? image.image : image.blob}
            alt={image.image}
          />
        ))}
      </PostImageContainer>
      {postData.shared && <SharedPost postData={postData.shared} />}
      <FooterContainer>
        <BottomButtons>
          <LeftButtons>
            <PostActionWrapper>
              <PostActionButton onClick={handleClickLike}>
                <img
                  src={likeHeart}
                  alt="like heart"
                  className={postIsLiked ? "liked-post" : null}
                />
                {postIsLiked ? "Liked" : "Like"}
              </PostActionButton>
              <PostActionButton onClick={sharePost}>
                <img src={shareArrow} alt="share Icon" />
                Share
              </PostActionButton>
            </PostActionWrapper>
          </LeftButtons>
          <RightButtons></RightButtons>
        </BottomButtons>

        <CommentContainer onClick={toggleComments}>
          <CommentImg src={comments1} alt="Show/Hide Comments" />
          {amountOfComments === 0
            ? "Comment"
            : amountOfComments === 1
            ? "1 Comment"
            : `${amountOfComments} Comments`}
        </CommentContainer>
        <LikeCount>
          {amountOfLikes === 0
            ? "0 Like"
            : amountOfLikes === 1
            ? "1 Like"
            : `${amountOfLikes} Likes`}
        </LikeCount>
      </FooterContainer>
      {areCommentsVisible && (
        <CommentContainer>
          <CommentsSection
            postId={postData.id}
            comments={comments}
            setComments={setComments}
            setAmountOfComments={setAmountOfComments}
          />
        </CommentContainer>
      )}
    </PostContainer>
  );
};

export default Post;
