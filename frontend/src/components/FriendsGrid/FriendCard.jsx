import { useState } from "react";
import avatarImage from "../../assets/images/polar-bear.png";
import FollowAddButtons from "../FollowAddFriendButtons/FollowAddButtons.jsx";
import {
  Grid,
  LikedThingsContainer,
} from "../UserProfile/Profile/ProfileData/ProfileData.style.js";
import {
  ButtonsWrapper,
  FriendAbout,
  FriendAvatar,
  FriendCardContainer,
  FriendCardHeader,
  FriendLocation,
  FriendName,
  Memberships,
  NameLocation,
  PopUp,
  ReadMoreButton,
  RightBar,
  RightBottom,
  RightTop,
} from "./FriendCard.style.js";

const ReadMorePopup = ({ aboutMeText, onClose }) => {
  return (
    <PopUp>
      <p>{aboutMeText}</p>
      <ReadMoreButton style={{ marginTop: "0.5rem" }} onClick={onClose}>
        close
      </ReadMoreButton>
    </PopUp>
  );
};

const MAX_CHARACTERS = 75;
const MIN_FONT_SIZE = 18;

const FriendCard = ({ friendInfo, requestObject }) => {
  const hasMemberships =
    friendInfo.memberships && friendInfo.memberships.length > 0;
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleReadMoreClick = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const showFullAbout =
    friendInfo.about_me.length > MAX_CHARACTERS
      ? friendInfo.about_me.slice(0, MAX_CHARACTERS) + "..."
      : friendInfo.about_me;

  return (
    <FriendCardContainer>
      <FriendCardHeader to={`/profile/${friendInfo.id}`}>
        <FriendAvatar alt="avatar" src={friendInfo.avatar || avatarImage} />
      </FriendCardHeader>
      <RightBar>
        <RightTop>
          <NameLocation>
            <FriendName>
              {friendInfo.first_name
                ? `${friendInfo.first_name} ${friendInfo.last_name}`
                : friendInfo.email
                ? friendInfo.email.split("@")[0]
                : ""}
            </FriendName>
            <FriendLocation>{friendInfo.location}</FriendLocation>
          </NameLocation>
          <ButtonsWrapper>
            <FollowAddButtons
              style={{ fontSize: "10px" }}
              friendInfo={friendInfo}
              requestObject={requestObject}
            />
          </ButtonsWrapper>
        </RightTop>
        <RightBottom>
          <Memberships>
            <LikedThingsContainer $centered>
              <Grid>
                {hasMemberships &&
                  friendInfo.memberships.map((thing) => (
                    <li key={thing}>{thing}</li>
                  ))}
              </Grid>
            </LikedThingsContainer>
          </Memberships>
          <FriendAbout
            fontSize={
              friendInfo.about_me.length < 15
                ? `${MIN_FONT_SIZE}px`
                : hasMemberships
                ? "1rem"
                : "1.5rem"
            }
          >
            {showFullAbout}
            {friendInfo.about_me.length > MAX_CHARACTERS && (
              <ReadMoreButton onClick={handleReadMoreClick}>
                {showFullAbout ? "read less" : "read more"}
              </ReadMoreButton>
            )}

            {isPopupOpen && (
              <ReadMorePopup
                aboutMeText={friendInfo.about_me}
                onClose={handleReadMoreClick}
              />
            )}
          </FriendAbout>
        </RightBottom>
      </RightBar>
    </FriendCardContainer>
  );
};

export default FriendCard;
