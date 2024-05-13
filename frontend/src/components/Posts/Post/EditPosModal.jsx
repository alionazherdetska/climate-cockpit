import { useState } from "react";
import {
  AvatarAndName,
  BrowseAndRemove,
  CreatePostModalContainer,
  LeftPart,
  RemoveButton,
  RightPart,
  SaveButton,
  StyledImagePreview,
  StyledInput,
  StyledLabel,
  StyledTextarea,
} from "./Modal.styles.js";
import Overlay from "../../Overlay/Overlay.jsx";

const EditPostModal = ({ postData, onClose, handleSaveEdit, avatar }) => {
  const [editedContent, setEditedContent] = useState(postData.content);
  const [editedImages, setEditedImages] = useState([]);

  const handleImageUpload = (e) => {
    const imagesFromUpload = Array.from(e.target.files);

    if (imagesFromUpload.length + editedImages.length > 4) {
      console.error("You can only upload 4 images per post");
    } else {
      imagesFromUpload.map((image, index) => {
        const imageBlob = URL.createObjectURL(image);
        setEditedImages((prevState) => [
          ...prevState,
          { blob: imageBlob, index, file: image },
        ]);
      });
    }
  };

  const removeImage = (clickedIndex) => {
    setEditedImages((prevImages) =>
      prevImages.filter((image, index) => index !== clickedIndex),
    );
  };

  const handleSave = () => {
    handleSaveEdit(editedContent, editedImages);
    onClose();
  };

  return (
    <Overlay onClose={onClose}>
      <CreatePostModalContainer>
        <div className={"body-container"}>
          <LeftPart>
            <AvatarAndName>
              <img className={"user-avatar"} src={avatar} />
              <h3>
                {postData.user.first_name} {postData.user.last_name}
              </h3>
            </AvatarAndName>
            <StyledTextarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
          </LeftPart>
          <RightPart>
            <BrowseAndRemove>
              <>
                <StyledLabel htmlFor="fileInput">Browse</StyledLabel>
                <StyledInput
                  id="fileInput"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </>
              {editedImages.map((image, index) => (
                <StyledImagePreview key={index}>
                  <RemoveButton onClick={() => removeImage(index)}>
                    Remove
                  </RemoveButton>
                  <img
                    className={"user-avatar"}
                    style={{ paddingTop: "1rem" }}
                    src={
                      image instanceof File ? URL.createObjectURL(image) : image
                    }
                    alt={`Image ${index}`}
                  />
                </StyledImagePreview>
              ))}
            </BrowseAndRemove>
            <SaveButton onClick={handleSave}>Save</SaveButton>
          </RightPart>
        </div>
      </CreatePostModalContainer>
    </Overlay>
  );
};
export default EditPostModal;
