import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../store/slices/loggedInUser.js";
import { useDispatch } from "react-redux";
import {
  AlreadyHaveAnAccountNavLink,
  AuthForm,
  AuthFormContainer,
  ErrorMessage,
  FormTitle,
  InputFieldContainer,
  ResetNavLink,
} from "../Layout/Layout.style.js";
import useApiRequest from "../../hooks/useApiRequest.js";
import { ButtonsStyle } from "../../styles/buttons.style.js";

function SignInSection() {
  const [user, setUser] = useState({ email: undefined, password: undefined });
  const navigate = useNavigate();
  const { sendRequest, data, error } = useApiRequest("noAuth");
  const dispatch = useDispatch();

  const handleInput = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    sendRequest("post", "auth/token/", user);
  };

  useEffect(() => {
    if (data !== null) {
      dispatch(loginUser({ user: data.user, accessToken: data.access }));
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("auth-token", data.access);
      navigate("/profile");
    }
  }, [data, dispatch, navigate]);

  return (
    <>
      <AuthFormContainer>
        <AuthForm onSubmit={handleLogin}>
          <div className={"input-container"}>
            <FormTitle>Sign In</FormTitle>
            <InputFieldContainer>
              <div className={"input-wrapper"}>
                <input
                  placeholder="Email"
                  type="email"
                  required
                  onChange={handleInput}
                  id="email"
                />
              </div>
              {error?.email && <ErrorMessage>{error.email}</ErrorMessage>}
            </InputFieldContainer>
            <InputFieldContainer>
              <div className={"input-wrapper"}>
                <input
                  placeholder="Password"
                  type="password"
                  required
                  onChange={handleInput}
                  id="password"
                />
              </div>
              <ResetNavLink to="/password-reset/">
                Forgot password?
              </ResetNavLink>
              {error?.password && <ErrorMessage>{error.password}</ErrorMessage>}
            </InputFieldContainer>
            {error?.detail && <p className={"error-message"}>{error.detail}</p>}
          </div>
          <div className={"form-footer"}>
            <ButtonsStyle style={{ marginTop: "2.5rem" }} onClick={handleLogin}>
              Sign In
            </ButtonsStyle>
          </div>
          <AlreadyHaveAnAccountNavLink
            style={{ marginTop: "2rem" }}
            to="/signup"
          >
            New to Climate Cockpit?
            <br /> Create an account →
          </AlreadyHaveAnAccountNavLink>
        </AuthForm>
      </AuthFormContainer>
    </>
  );
}

export default SignInSection;
