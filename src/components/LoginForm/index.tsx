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
    <LoginContainer className="flex flex-col justify-center items-center h-screen w-screen mx-auto bg-white">
      <LoginFormContainer
        className="flex flex-col items-center p-[20px] rounded-lg w-full md:w-[350px] bg-white shadow-lg"
        onSubmit={(e) => {
          onLoginButton();
          e.preventDefault();
        }}
      >
        <LogoImage
          className="flex items-center gap-[11px]"
          src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1705580146/Frame_507_ba197a.png"
          alt="website logo"
        />
        <InputContainer className="flex flex-col mt-20px w-full">
          <LoginLabel
            className="mb-0 font-bold text-sm leading-4 text-[#475569]"
            htmlFor="emailId"
          >
            {t("common.email")}
          </LoginLabel>
          <EmailInput
            className="text-base h-[40px] border border-[#d7dfe9] bg-[#e2e8f0] text-[#64748b] rounded-md mt-1 px-4 mb-3"
            type="email"
            id="emailId"
            value={emailId}
            onChange={onChangeEmailId}
            onBlur={() => onEnterEmailId()}
            placeholder="Email"
          />
        </InputContainer>
        <InputContainer className="flex flex-col mt-20px w-full">
          <LoginLabel
            className="mb-0 font-bold text-sm leading-4 text-[#475569]"
            htmlFor="password"
          >
            {t("common.password")}
          </LoginLabel>
          <PasswordInput
            className="text-base h-[40px] border border-[#d7dfe9] bg-[#e2e8f0] text-[#64748b] rounded-md mt-1 px-4 mb-3"
            type="password"
            id="password"
            value={password}
            onChange={onChangePas}
            placeholder="Password"
          />
        </InputContainer>
        <LoginButton
          className="font-bold text-base text-white h-10 w-full mt-5 mb-2 bg-[#0b69ff] rounded-lg border-none cursor-pointer focus:outline-none"
          type="submit"
        >
          {t("common.login")}
        </LoginButton>
        {errorMessage && (
          <ErrorMessageParagraph className="self-start text-xs mt-1 mb-0 font-roboto text-red-600">
            *{errorMessage}
          </ErrorMessageParagraph>
        )}
      </LoginFormContainer>
    </LoginContainer>
  );
};

export default observer(LoginForm);
