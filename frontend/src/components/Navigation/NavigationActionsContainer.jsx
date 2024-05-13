import logoutImage from "../../assets/svgs/icon_logout.svg";
import { ActionContainer, ActionsWrapper } from "./Navigation.style.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/slices/loggedInUser.js";

const NavigationActionsContainer = ({ setShowMenu }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickLogout = () => {
    localStorage.clear();
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <ActionsWrapper onMouseLeave={() => setShowMenu(false)}>
      <ActionContainer onClick={handleClickLogout}>
        <div>
          <img alt="Logout Image" src={logoutImage} />
          <p>Logout</p>
        </div>
      </ActionContainer>
    </ActionsWrapper>
  );
};

export default NavigationActionsContainer;
