import { Link } from "react-router-dom";
import CheckMarkIcon from "../../assets/images/CheckMarcIcon.png";
import {
  AuthForm,
  AuthFormContainer,
  ConfirmationText,
  FormTitle,
} from "../Layout/Layout.style.js";
import { CheckMark } from "../../styles/globalStyles.js";
import { ButtonsStyle } from "../../styles/buttons.style.js";

function CongratsSection() {
  const userEmail = localStorage.getItem("registered_email");

  return (
    <>
      <AuthFormContainer>
        <AuthForm>
          <div className={"input-container"}>
            <FormTitle>Congratulations!</FormTitle>
            <CheckMark src={CheckMarkIcon} alt="Check mark" />
            <ConfirmationText>
              We’ve sent a confirmation code to your email <br />
              {userEmail}
            </ConfirmationText>
          </div>
          <div>
            <Link to="/verification">
              <ButtonsStyle>Continue</ButtonsStyle>
            </Link>
          </div>
        </AuthForm>
      </AuthFormContainer>
    </>
  );
}

export default CongratsSection;
