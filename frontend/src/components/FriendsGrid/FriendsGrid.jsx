import { useSelector } from "react-redux";
import useAutoFetch from "../../hooks/useAutoFetch.js";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.jsx";
import FriendCard from "./FriendCard.jsx";
import {
  FindFriendsContainer,
  FriendsGridContainer,
} from "./FriendCard.style.js";

const FriendsGrid = ({ url }) => {
  const { data, loading } = useAutoFetch("get", url);
  const friendRequests = useSelector((store) => store.friendRequests);
  const loggedInUserID = useSelector((store) => store.loggedInUser.user?.id);

  const checkRequest = (friendID) => {
    return friendRequests.find((request) => request.receiver.id === friendID);
  };

  if (loading) return <LoadingSpinner />;
  return (
    <FindFriendsContainer>
      <FriendsGridContainer>
        {data &&
          data.results
            .filter((friend) => friend.id !== loggedInUserID)
            .map((friend, index) => {
              return (
                <FriendCard
                  key={index}
                  friendInfo={friend}
                  requestObject={checkRequest(friend.id)}
                />
              );
            })}
      </FriendsGridContainer>
    </FindFriendsContainer>
  );
};

export default FriendsGrid;
