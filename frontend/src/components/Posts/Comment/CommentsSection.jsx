import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import trash from "../../../assets/images/delete-folder.png";
import send_icon from "../../../assets/images/send.png";
import useApiRequest from "../../../hooks/useApiRequest.js";
import ProfileLink from "../../ProfileLink/ProfileLink.jsx";
import {
  CommentBlock,
  CommentContent,
  CommentInput,
  CommentsContainer,
  DeleteSection,
  InputContainer,
  PostButton,
  StyledImg,
} from "./Comment.style.js";

const CommentsSection = ({
  postId,
  comments,
  setComments,
  setAmountOfComments,
}) => {
  const userData = useSelector((store) => store.loggedInUser.user);
  const [commentText, setCommentText] = useState("");
  const { sendRequest: sendRequestPost, data: dataPost } = useApiRequest();
  const { sendRequest: sendRequestDelete } = useApiRequest();

  const handleCommentChange = (e) => setCommentText(e.target.value);

  const handlePostButtonClick = () => {
    if (!commentText.trim()) return;

    sendRequestPost("post", `social/comments/${postId}/`, {
      content: commentText,
    });
    setCommentText("");
    setAmountOfComments((previous) => previous + 1);
  };

  useEffect(() => {
    if (dataPost !== null) {
      setComments((currentComments) => [dataPost, ...currentComments]);
    }
  }, [dataPost, setComments]);

  const deleteComment = (commentId) => {
    sendRequestDelete("delete", `social/comments/comment/${commentId}/`);
    setComments((currentComments) =>
      currentComments.filter((comment) => comment.id !== commentId),
    );
    setAmountOfComments((previous) => previous - 1);
  };

  return (
    <CommentsContainer>
      <InputContainer>
        <CommentInput
          value={commentText}
          onChange={handleCommentChange}
          placeholder="Write a comment..."
        />
        <StyledImg src={send_icon} alt="Send" onClick={handlePostButtonClick} />
      </InputContainer>
      {comments.map((comment) => (
        <CommentBlock key={comment.id}>
          <ProfileLink
            user={comment.user}
            isLoggedInUser={comment.user.id === userData.id}
            created={comment.created}
          />

          <CommentContent>{comment.content}</CommentContent>
          <DeleteSection>
            {userData.id === comment.user.id && (
              <PostButton onClick={() => deleteComment(comment.id)}>
                <img src={trash} alt="delete post" />
                <p>Delete</p>
              </PostButton>
            )}
          </DeleteSection>
        </CommentBlock>
      ))}
    </CommentsContainer>
  );
};

export default CommentsSection;
