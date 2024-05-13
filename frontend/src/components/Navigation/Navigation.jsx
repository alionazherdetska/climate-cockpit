import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/header_icons/Globus.png";
import lightbulb from "../../assets/header_icons/check-mark.png";
import swissFlag from "../../assets/other_icons/SwissFlag.png";
import avatarImage from "../../assets/svgs/avatar.svg";
import MenuDot from "../../assets/svgs/menu_dots.svg";
import useAutoFetch from "../../hooks/useAutoFetch.js";
import { setRequests } from "../../store/slices/friendRequests.js";
import { ButtonsStyle } from "../../styles/buttons.style.js";
import FriendsRequestsContainer from "./FriendsRequests/FriendsRequestsContainer.jsx";
import {
  Avatar,
  ContainerLeft,
  ContainerRight,
  HeaderContainer,
  MenuContainer,
  NavbarLink,
  NotificationButton,
  StyledH1,
  SwissFlag,
} from "./Navigation.style.js";
import NavigationActionsContainer from "./NavigationActionsContainer.jsx";

const Navigation = () => {
  const loggedInUser = useSelector((store) => store.loggedInUser.user);
  const dispatch = useDispatch();
  const friendRequests = useSelector((store) => store.friendRequests);

  const [showMenu, setShowMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const { data } = useAutoFetch("get", "social/friends/requests/");

  const [sentRequests, setSentRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const requestsCount = sentRequests.length + receivedRequests.length;
  const location = useLocation();
  const isLoginPage = location.pathname === "/signin";
  const isSignUpPage = location.pathname === "/signup";
  useEffect(() => {
    dispatch(setRequests(data?.results));
  }, [data, dispatch]);

  useEffect(() => {
    if (loggedInUser) {
      setSentRequests(
        friendRequests.filter(
          (request) =>
            request.requester.id === loggedInUser.id && request.status === "P",
        ),
      );
      setReceivedRequests(
        friendRequests.filter(
          (request) =>
            request.requester.id !== loggedInUser.id && request.status === "P",
        ),
      );
    }
  }, [friendRequests, loggedInUser]);

  return (
    <HeaderContainer>
      <ContainerLeft>
        <NavbarLink to="/">
          <img src={logo} alt="Logo" />
          <StyledH1>
            Climate Cockpit{" "}
            <SwissFlag>
              <img src={swissFlag} alt="Swiss Flag" />
            </SwissFlag>
          </StyledH1>
        </NavbarLink>
        <NavbarLink to="/solutions">
          <h1>Solutions</h1>
        </NavbarLink>
        {loggedInUser ? (
          <>
            <NavbarLink to="/profile">
              <h1>Profile</h1>
            </NavbarLink>
          </>
        ) : (
          <NavbarLink to="/signin">
            <h1>Profile</h1>
          </NavbarLink>
        )}
        {loggedInUser ? (
          <>
            <NavbarLink to="/posts">
              <h1 style={{ fontSize: "34px" }}>Posts</h1>
            </NavbarLink>
            <NavbarLink to="/find-friends">
              <h1>Networking</h1>
            </NavbarLink>
          </>
        ) : null}
      </ContainerLeft>

      <nav>
        {loggedInUser ? (
          <>
            <ContainerRight>
              <NotificationButton
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <div className={"icon-wrapper"}>
                  <img src={lightbulb} alt="Lightbulb" />
                  {requestsCount >= 0 && (
                    <p className={"request-count"}>{requestsCount}</p>
                  )}
                </div>
                {showNotifications && (
                  <FriendsRequestsContainer
                    setShowNotifications={setShowNotifications}
                    sentRequests={sentRequests}
                    receivedRequests={receivedRequests}
                  />
                )}
              </NotificationButton>
              <Link to={"/profile"}>
                <Avatar
                  src={loggedInUser?.avatar || avatarImage}
                  alt="Avatar"
                />
              </Link>
              <MenuContainer>
                <img
                  src={MenuDot}
                  alt="Menu"
                  onClick={() => setShowMenu(!showMenu)}
                />
                {showMenu && (
                  <NavigationActionsContainer setShowMenu={setShowMenu} />
                )}
              </MenuContainer>
            </ContainerRight>
          </>
        ) : (
          <div>
            {isLoginPage && (
              <>
                <Link to="/signup">
                  <ButtonsStyle>Sign Up</ButtonsStyle>
                </Link>
              </>
            )}
            {isSignUpPage && (
              <>
                <Link to="/signin">
                  <ButtonsStyle>Sign In</ButtonsStyle>
                </Link>
              </>
            )}
            {!isLoginPage && !isSignUpPage && (
              <>
                <Link to="/signup">
                  <ButtonsStyle>Sign Up</ButtonsStyle>
                </Link>
                <Link to="/signin">
                  <ButtonsStyle>Sign In</ButtonsStyle>
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </HeaderContainer>
  );
};

export default Navigation;
