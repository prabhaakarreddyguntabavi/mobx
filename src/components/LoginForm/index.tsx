import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import Cookies from "js-cookie";
import { observer } from "mobx-react";
import { useNavigate, NavigateFunction } from "react-router-dom";

import TransactionContext from "../../context/TransactionContext";
import { setJwtToken } from "../../utils/jwtToken";
import { userDetails } from "../../constants/loginConstants";
import { UserListProps } from "../../types/loginTypes";

import {
  LoginLabel,
  EmailInput,
  PasswordInput,
  LoginContainer,
  LoginFormContainer,
  InputContainer,
  LoginButton,
  ErrorMessageParagraph,
  LogoImage,
} from "./styledComponents";

const LoginForm = (): JSX.Element => {
  const { t } = useTranslation();
  const transactionStore = useContext(TransactionContext);
  const jwtToken = setJwtToken();
  const { userDict } = transactionStore;

  const [emailId, onSetEmail] = useState<string>("");
  const [password, onSetPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loginUserDict, setEmailDict] = useState<UserListProps>({
    email: "",
    password: "",
    userId: 0,
  });
  const navigate: NavigateFunction = useNavigate();

  const onEnterEmailId = (): void => {
    if (emailId !== "") {
      const emailDict: UserListProps | undefined = userDetails.find(
        (eachId) => eachId.email === emailId
      );

      setEmailDict(emailDict || { email: "", password: "", userId: 0 });
    }
  };

  const onChangeEmailId = (event: React.ChangeEvent<HTMLInputElement>): void =>
    onSetEmail(event.target.value);

  const onChangePas = (event: React.ChangeEvent<HTMLInputElement>): void =>
    onSetPassword(event.target.value);

  const onLoginButton = async (): Promise<void> => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!pattern.test(emailId)) {
      setErrorMessage("Please Enter Email");
    } else if (password === "") {
      setErrorMessage("Please Enter Password");
    } else if (
      loginUserDict.email !== emailId ||
      loginUserDict.password !== password
    ) {
      setErrorMessage("Please Enter Valid Email or Password");
    } else if (
      loginUserDict.email === emailId ||
      loginUserDict.password === password
    ) {
      setErrorMessage("");
      Cookies.set("jwt_token", loginUserDict.userId.toString(), {
        expires: 30,
      });

      const user = { email: emailId, password };
      localStorage.setItem("userDetails", JSON.stringify(user));
      await userDict.getUserId(user);
      navigate("/");
      onSetEmail("");
      onSetPassword("");
    }
  };

  if (jwtToken !== undefined) {
    navigate("/");
  }

  return (
    <LoginContainer>
      <LoginFormContainer
        onSubmit={(e) => {
          onLoginButton();
          e.preventDefault();
        }}
      >
        <LogoImage
          src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1705580146/Frame_507_ba197a.png"
          alt="website logo"
        />
        <InputContainer>
          <LoginLabel htmlFor="emailId">{t("email")}</LoginLabel>
          <EmailInput
            type="email"
            id="emailId"
            value={emailId}
            onChange={onChangeEmailId}
            onBlur={() => onEnterEmailId()}
            placeholder="Email"
          />
        </InputContainer>
        <InputContainer>
          <LoginLabel htmlFor="password">{t("password")}</LoginLabel>
          <PasswordInput
            type="password"
            id="password"
            value={password}
            onChange={onChangePas}
            placeholder="Password"
          />
        </InputContainer>
        <LoginButton type="submit">{t("login")}</LoginButton>
        {errorMessage && (
          <ErrorMessageParagraph>*{errorMessage}</ErrorMessageParagraph>
        )}
      </LoginFormContainer>
    </LoginContainer>
  );
};

export default observer(LoginForm);
