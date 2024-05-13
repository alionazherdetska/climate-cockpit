import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BackgroundImage from "../../../assets/images/blue_sky.jpg";
import avatarImage from "../../../assets/svgs/avatar.svg";
import FollowAddButtons from "../../FollowAddFriendButtons/FollowAddButtons.jsx";
import ProfileData from "./ProfileData/ProfileData.jsx";
import {
  AvatarImg,
  FriendProfileButtons,
  NameAndLocation,
  ProfileBackground,
  ProfileButton,
  ProfileHeaderContainer,
  ProfileHeaderLeftContainer,
  ProfileHeaderRightContainer,
  ProfileHeaderTop,
} from "./ProfileHeader.style.js";
import ProfileSubNavigation from "./ProfileSubNavigation/ProfileSubNavigation.jsx";

function ProfileHeader({ userdata, profileId, error }) {
  const currentUser = useSelector((store) => store.loggedInUser.user);
  const friendRequests = useSelector((store) => store.friendRequests);
  const requestObject = friendRequests.find(
    (request) => request.receiver.id === Number(profileId),
  );

  return (
    <>
      <ProfileBackground
        src={BackgroundImage}
        alt="Background"
      ></ProfileBackground>
      <ProfileHeaderContainer>
        {userdata && (
          <>
            <ProfileHeaderLeftContainer>
              <AvatarImg alt="avatar" src={userdata.avatar || avatarImage} />
              {userdata.id === currentUser.id ? (
                <Link to={"/profile/edit"}>
                  <ProfileButton>Edit Profile</ProfileButton>
                </Link>
              ) : (
                <FriendProfileButtons>
                  <FollowAddButtons
                    friendInfo={userdata}
                    requestObject={requestObject}
                  />
                </FriendProfileButtons>
              )}
            </ProfileHeaderLeftContainer>

            <ProfileHeaderRightContainer>
              <ProfileHeaderTop>
                <NameAndLocation>
                  <h2>{`${userdata.first_name} ${userdata.last_name}`}</h2>
                  <h3>{userdata.location}</h3>
                </NameAndLocation>
              </ProfileHeaderTop>
              <ProfileData userdata={userdata} />
            </ProfileHeaderRightContainer>
          </>
        )}
        {error && (
          <div>
            <h2>Profile not found</h2>
            <Link to={"/find-friends"}>
              <button>find friends here!</button>
            </Link>
          </div>
        )}
      </ProfileHeaderContainer>
      <ProfileSubNavigation userdata={userdata} profileId={profileId} />
    </>
  );
}

export default ProfileHeader;
