import React, { useState, useEffect, useContext } from "react";
import { TextField, Box, Button, Typography, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Image = styled("img")({
  width: 100,
  display: "flex",
  margin: "auto",
  padding: "50px 0 0",
});

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  overflow: auto;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #fb641b;
  color: #fff;
  height: 48px;
  border-radius: 2px;
`;

const SignupButton = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
  color: #878787;
  font-size: 12px;
`;

const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;

const loginInitialValues = {
  username: "",
  password: "",
};

const signupInitialValues = {
  name: "",
  username: "",
  password: "",
};

const MIN_PASSWORD_LENGTH = 5;
const Login = ({ isUserAuthenticated }) => {
  const [login, setLogin] = useState(loginInitialValues);
  const [error, showError] = useState("");
  const [account, toggleAccount] = useState("login");
  const navigate = useNavigate();
  const { setAccount } = useContext(DataContext);

  const imageURL =
    "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";

  useEffect(() => {
    showError("");
  }, [login]);

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const loginUser = async () => {
    if (!login.username || !login.password) {
      showError("Please enter both username and password.");
      return;
    }

    if (login.password.length < MIN_PASSWORD_LENGTH) {
      showError(
        `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`
      );
      return;
    }

    let response = await API.userLogin(login);
    if (response.isSuccess) {
      showError("");

      sessionStorage.setItem(
        "accessToken",
        `Bearer ${response.data.accessToken}`
      );
      sessionStorage.setItem(
        "refreshToken",
        `Bearer ${response.data.refreshToken}`
      );
      setAccount({
        name: response.data.name,
        username: response.data.username,
      });

      isUserAuthenticated(true);
      setLogin(loginInitialValues);
      navigate("/");
    } else {
      showError("Invalid username or password. Please try again.");
    }
  };

  const toggleSignup = () => {
    account === "signup" ? toggleAccount("login") : toggleAccount("signup");
  };

  return (
    <Component>
      <Box>
        <Image src={imageURL} alt="blog" />
        {account === "login" ? (
          <Wrapper>
            <TextField
              variant="standard"
              value={login.username}
              onChange={(e) => onValueChange(e)}
              name="username"
              label="Enter Username"
            />
            <TextField
              variant="standard"
              value={login.password}
              type="password"
              onChange={(e) => onValueChange(e)}
              name="password"
              label="Enter Password"
            />

            {error && <Error>{error}</Error>}

            <LoginButton variant="contained" onClick={() => loginUser()}>
              Login
            </LoginButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <SignupButton
              onClick={() => toggleSignup()}
              style={{ marginBottom: 50 }}
            >
              Create an account
            </SignupButton>
          </Wrapper>
        ) : (
          <Signup
            isUserAuthenticated={isUserAuthenticated}
            toggleSignup={toggleSignup}
          />
        )}
      </Box>
    </Component>
  );
};

const Signup = ({ isUserAuthenticated, toggleSignup }) => {
  const [signup, setSignup] = useState(signupInitialValues);
  const [nameError, showNameError] = useState("");
  const [usernameError, showUsernameError] = useState("");
  const [passwordError, showPasswordError] = useState("");

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const signupUser = async () => {
    // Reset all previous errors
    showNameError("");
    showUsernameError("");
    showPasswordError("");

    // Validate the signup fields
    if (!signup.name) {
      showNameError("Please enter your name.");
      return;
    }

    if (!signup.username) {
      showUsernameError("Please enter a username.");
      return;
    }

    if (signup.password.length < MIN_PASSWORD_LENGTH) {
      showPasswordError(
        `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`
      );
      return;
    }

    // Make API call for user signup
    let response = await API.userSignup(signup);
    if (response.isSuccess) {
      setSignup(signupInitialValues);
      toggleSignup();
    } else {
      showNameError("Something went wrong! Please try again later.");
    }
  };

  return (
    <Wrapper>
      <TextField
        variant="standard"
        value={signup.name}
        onChange={(e) => onInputChange(e)}
        name="name"
        label="Enter Name"
      />
      {nameError && <Error>{nameError}</Error>}
      <TextField
        variant="standard"
        value={signup.username}
        onChange={(e) => onInputChange(e)}
        name="username"
        label="Enter Username"
      />
      {usernameError && <Error>{usernameError}</Error>}
      <TextField
        variant="standard"
        type="password"
        value={signup.password}
        onChange={(e) => onInputChange(e)}
        name="password"
        label="Enter Password"
      />
      {passwordError && <Error>{passwordError}</Error>}

      <SignupButton onClick={() => signupUser()}>Signup</SignupButton>
      <Text style={{ textAlign: "center" }}>OR</Text>
      <LoginButton variant="contained" onClick={() => toggleSignup()}>
        Already have an account
      </LoginButton>
    </Wrapper>
  );
};

export default Login;
