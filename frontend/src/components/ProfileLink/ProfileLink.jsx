import ReactTimeAgo from "react-time-ago";
import defaultAvatar from "../../assets/svgs/avatar.svg";
import {
  AuthorInfoWrapper,
  Avatar,
  ProfileLinkWrapper,
} from "./ProfileLink.style.js";

export default function ProfileLink({ user, isLoggedInUser, created }) {
  const endpoint = `/profile/${isLoggedInUser ? "" : user.id}`;

  return (
    <ProfileLinkWrapper to={endpoint}>
      <Avatar
        src={user.avatar || defaultAvatar}
        className={!user.avatar ? "default" : null}
      />
      <AuthorInfoWrapper>
        <p>{`${user.first_name} ${user.last_name}`}</p>
        <p className={"date"}>
          <ReactTimeAgo date={Date.parse(created)} locale="en-US" />
        </p>
      </AuthorInfoWrapper>
    </ProfileLinkWrapper>
  );
}
