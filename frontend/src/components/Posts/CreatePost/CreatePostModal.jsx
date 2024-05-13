import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import uploadIcon from "../../../assets/svgs/Shape.svg";
import useApiRequest from "../../../hooks/useApiRequest.js";
import Overlay from "../../Overlay/Overlay.jsx";
import {
  AvatarAndName,
  SaveButton,
  StyledTextarea,
} from "../Post/Modal.styles.js";
import SharedPost from "../Post/SharedPost.jsx";
import {
  AvatarAndTextField,
  CreatePostModalContainer,
  CustomImageUploadButton,
} from "./CreatePost.style.js";

const CreatePostModal = ({
  setModalIsOpen,
  userData,
  postToShare,
  setListOfPosts,
}) => {
  const [content, setContent] = useState();
  const [imageToUpload, setImageToUpload] = useState([]);
  const [error, setError] = useState(undefined);
  const { sendRequest, data } = useApiRequest();
  const { sendRequest: sendBotCommentRequest } = useApiRequest();
  const gptbotUsers = useSelector((store) => store.gptbotUsers.list);

  const uploadPreviewImage = (e) => {
    setImageToUpload([]);
    setError(undefined);
    const imagesFromUpload = Array.from(e.target.files);

    if (imagesFromUpload.length > 4) {
      setError({ images: "you can only upload 4 images per post" });
    } else {
      imagesFromUpload.map((image, index) => {
        const imageBlob = URL.createObjectURL(image);
        setImageToUpload((prevState) => [
          ...prevState,
          { blob: imageBlob, index, file: image },
        ]);
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formdata = new FormData();
    formdata.append("content", content);
    //if it is a share of a post, then link it to the post to share
    if (postToShare) {
      formdata.append("shared", postToShare.id);
    }
    imageToUpload.map((image) => {
      formdata.append("images", image.file);
    });
    sendRequest("post", "social/posts/", formdata, true);
  };

  useEffect(() => {
    if (data !== null) {
      // Send request to create comment from GPTbot users if they are followed by the user
      const createGptbotComments = () => {
        gptbotUsers
          .filter((gptbotUser) => gptbotUser.logged_in_user_is_following)
          .forEach((gptbotUser) =>
            sendBotCommentRequest(
              "post",
              `social/comments/${data.id}/gptbot-comment/${gptbotUser.id}`,
            ),
          );
      };

      createGptbotComments();
      setListOfPosts((prevState) => [data, ...prevState]);
      setModalIsOpen(false);
    }
  }, [
    data,
    gptbotUsers,
    sendBotCommentRequest,
    setListOfPosts,
    setModalIsOpen,
  ]);

  const removeImage = (clickedIndex) => {
    setImageToUpload(
      imageToUpload.filter((image) => image.index !== clickedIndex),
    );
  };

  return (
    <Overlay onClose={setModalIsOpen}>
      <CreatePostModalContainer>
        <div className={"body-container"}>
          <AvatarAndTextField>
            <AvatarAndName>
              <img className={"user-avatar"} src={userData.avatar} />
              <h3>
                {userData.first_name} {userData.last_name}
              </h3>
            </AvatarAndName>
            <StyledTextarea
              style={{ width: "90%", marginLeft: "15%" }}
              className={"content-input"}
              id="content"
              cols="40"
              rows="2"
              name="content"
              value={content}
              placeholder={`What's on your mind ${
                userData.first_name && `, ${userData.first_name}`
              }?`}
              onChange={(e) => setContent(e.target.value)}
            />
          </AvatarAndTextField>
          {postToShare && <SharedPost postData={postToShare} />}
          <div className={"image-preview-container"}>
            {imageToUpload &&
              imageToUpload.map((image) => {
                return (
                  <div key={image.index} className={"image-preview-instance"}>
                    <button onClick={() => removeImage(image.index)}>X</button>
                    <img
                      className={"user-avatar"}
                      src={image.blob}
                      width={400}
                    />
                    <span>{image.file.name}</span>
                  </div>
                );
              })}
            {error?.images && <p>{error.images}</p>}
          </div>
        </div>
        <div className={"footer-container"}>
          <CustomImageUploadButton>
            <img src={uploadIcon} />
            <input
              type="file"
              multiple
              className={"image-upload-button"}
              accept="image/*"
              onChange={uploadPreviewImage}
            />
          </CustomImageUploadButton>
          <SaveButton className={"send-post-button"} onClick={handleSubmit}>
            Post
          </SaveButton>
        </div>
      </CreatePostModalContainer>
    </Overlay>
  );
};

export default CreatePostModal;
