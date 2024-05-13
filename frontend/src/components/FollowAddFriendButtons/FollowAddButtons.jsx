import { useEffect, useState } from "react";
import {
  FollowOrRequestButton,
  RevokeRequest,
  TickerAndButton,
  TickerImage,
} from "./FollowAddButtons.style.js";
import tickerImage from "../../assets/images/CheckMarcIcon.png";
import useApiRequest from "../../hooks/useApiRequest.js";
import { setRequests } from "../../store/slices/friendRequests.js";
import { useDispatch } from "react-redux";

function FollowAddButtons({ friendInfo, requestObject }) {
  const { sendRequest, data } = useApiRequest();
  const dispatch = useDispatch();
  const [deleteRequestHover, setHover] = useState(false);
  const [FollowUser, setFollowUser] = useState(
    friendInfo.logged_in_user_is_following,
  );
  const [requestStatus, setRequestStatus] = useState(undefined);

  useEffect(() => {
    setRequestStatus(requestObject?.status);
  }, [requestObject]);

  useEffect(() => {
    if (data !== null) {
      dispatch(setRequests(data?.results));
    }
  }, [dispatch, data]);

  const toggleFriendFollow = () => {
    setFollowUser(!FollowUser);
    sendRequest("post", `social/followers/toggle-follow/${friendInfo.id}/`);
  };

  const sendFriendRequest = () => {
    setRequestStatus("P");
    sendRequest("post", `social/friends/request/${friendInfo.id}/`);
    sendRequest("get", "social/friends/requests/");
  };

  const deleteFriendOrRequest = () => {
    setRequestStatus(undefined);
    sendRequest("delete", `social/friends/requests/${requestObject.id}/`);
    sendRequest("get", "social/friends/requests/");
  };

  return (
    <>
      <FollowOrRequestButton $follow={FollowUser} onClick={toggleFriendFollow}>
        {FollowUser ? "Following" : "Follow"}
      </FollowOrRequestButton>
      {requestStatus !== undefined && (
        <FollowOrRequestButton
          $requestStatus={requestStatus}
          style={{ padding: "8px 11px" }}
          onMouseOver={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={deleteFriendOrRequest}
        >
          {requestStatus === "A" &&
            (!deleteRequestHover ? "Friend" : "Quit friendship")}
          {requestStatus === "P" &&
            (!deleteRequestHover ? (
              <TickerAndButton>
                <TickerImage src={tickerImage} />
                Request sent
              </TickerAndButton>
            ) : (
              <RevokeRequest>Revoke request</RevokeRequest>
            ))}
        </FollowOrRequestButton>
      )}
      {requestStatus === undefined && (
        <FollowOrRequestButton onClick={sendFriendRequest}>
          Add friend
        </FollowOrRequestButton>
      )}
    </>
  );
}

export default FollowAddButtons;
