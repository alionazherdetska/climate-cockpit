import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner.jsx";
import ScoreCard from "../components/ScoreCard/ScoreCard.jsx";
import ProfileHeader from "../components/UserProfile/Profile/ProfileHeader.jsx";
import {
  LeftBlock,
  ProfilePageMain,
  RightBlock,
} from "../components/UserProfile/Profile/ProfileHeader.style.js";
import ProfileSubSection from "../components/UserProfile/Profile/ProfileSubSection.jsx";
import useAutoFetch from "../hooks/useAutoFetch.js";
import { setProfileFilter } from "../store/slices/profileFilter.js";

function ProfilePage() {
  const { profileId } = useParams();
  const params = useParams();
  const endpointToFetch = profileId ? `users/${profileId}/` : "users/me/";
  const { data } = useAutoFetch("get", endpointToFetch, "", params);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setProfileFilter("posts"));
  }, [dispatch]);

  if (!data) return <LoadingSpinner />;
  return (
    <ProfilePageMain>
      <LeftBlock>
        <ProfileHeader userdata={data} profileId={profileId} />
        <ProfileSubSection userID={profileId} />
      </LeftBlock>
      <RightBlock>
        <ScoreCard userID={data.id} />
      </RightBlock>
    </ProfilePageMain>
  );
}

export default ProfilePage;
