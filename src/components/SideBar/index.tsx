import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import Cookies from "js-cookie";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { setJwtToken } from "../../utils/jwtToken";
import TransactionContext from "../../context/TransactionContext";
import { userDetails } from "../../constants/loginConstants";

import { UserDetail } from "../../types/usersTypes";

import {
  SideBarMainContainer,
  LogoImage,
  TextContainer,
  EachTextContainer,
  IconsImage,
  TextParagraph,
  TransactionIconsImage,
  SelectedContainer,
  ProfileContainer,
  ProfileImageContainer,
  ProfileName,
  ProfileEmail,
  ProfileLogoutImage,
  ProfileTextContainer,
  LogoutButton,
  LogoutConformationContainer,
  LogoutContainer,
  WarningImageContainer,
  WarningImage,
  TextImageContainer,
  HeaderTextImageContainer,
  LogoutHeading,
  LogoutClosingImage,
  LogoutParagraph,
  TestContainer,
  LogoutButtonContainer,
  CancelLogoutButton,
  YesLogoutButton,
  ProfileImageContainerMedium,
} from "./styledComponents";

import "./index.css";
import { observer } from "mobx-react";
import "../../tailwind.css";

const SideBar = (): JSX.Element => {
  const { t } = useTranslation();

  const transactionStore = useContext(TransactionContext);
  const {
    selectOption,
    onChangeSelectOption,
    onChangeTransactionOption,
    userId,
    isUserAdmin,
  } = transactionStore;

  const jwtToken = setJwtToken();

  const navigate: NavigateFunction = useNavigate();

  let loginUser: UserDetail = {
    ...userDetails.find((eachUser) => eachUser.userId === userId),
    name: "",
  };

  const onClickLogout = (): void => {
    Cookies.remove("jwt_token");
    navigate("/login");
    localStorage.clear();
  };

  if (!jwtToken) {
    navigate("/login");
  }

  return (
    <SideBarMainContainer className="w-1/6 h-screen shrink-0 border-r-1 border-[#e2e2e2] flex flex-col bg-white">
      <LogoImage
        className="inline-flex items-center m-5 "
        src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1705580146/Frame_507_ba197a.png"
        alt="website logo"
      />

      <TextContainer className="flex flex-col items-start w-2.5">
        <Link
          className="sidbar-content"
          to="/"
          onClick={() => {
            onChangeSelectOption("DASHBOARD");
            onChangeTransactionOption("ALLTRANSACTION");
          }}
        >
          <EachTextContainer className="flex h-6 justify-start items-center gap-5 shrink-0">
            <SelectedContainer
              className="w-1.5 h-6 shrink-0 "
              selectOption={selectOption === "DASHBOARD"}
            >
              {}
            </SelectedContainer>
            <IconsImage
              className="w-6 h-6"
              src={
                selectOption === "DASHBOARD"
                  ? "https://res.cloudinary.com/dwdq2ofjm/image/upload/v1706070137/home_2_1_xkaadl.png"
                  : "https://res.cloudinary.com/dwdq2ofjm/image/upload/v1705730106/home_2_m9drn7.png"
              }
              alt="dashboard"
            />
            <TextParagraph
              className="font-medium text-base no-underline"
              selectOption={selectOption === "DASHBOARD"}
            >
              {t("common.dashboard")}
            </TextParagraph>
          </EachTextContainer>
        </Link>
        <Link
          className="sidbar-content"
          to="/transaction"
          onClick={() => onChangeSelectOption("TRANSACTIONS")}
        >
          <EachTextContainer className="flex h-20 justify-start items-center gap-5 shrink-0">
            <SelectedContainer
              className="w-1.5 h-6 shrink-0 "
              selectOption={selectOption === "TRANSACTIONS"}
            ></SelectedContainer>
            <TransactionIconsImage
              className="w-6 h-6"
              src={
                selectOption === "TRANSACTIONS"
                  ? "https://res.cloudinary.com/dwdq2ofjm/image/upload/v1706070137/transfer_1_1_hqx4fr.png"
                  : "https://res.cloudinary.com/dwdq2ofjm/image/upload/v1705912310/transfer_1_e0it36.png"
              }
              alt="transactions"
            />

            <TextParagraph
              className="font-medium text-base no-underline"
              selectOption={selectOption === "TRANSACTIONS"}
            >
              {isUserAdmin
                ? t("common.allTransactions")
                : t("common.transactions")}
            </TextParagraph>
          </EachTextContainer>
        </Link>
        <Link
          className="sidbar-content"
          to="/profile"
          onClick={() => {
            onChangeSelectOption("PROFILE");
            onChangeTransactionOption("ALLTRANSACTION");
          }}
        >
          <EachTextContainer className="flex h-6 justify-start items-center gap-5 shrink-0">
            <SelectedContainer
              className="w-1.5 h-6 shrink-0 "
              selectOption={selectOption === "PROFILE"}
            ></SelectedContainer>
            <IconsImage
              className="w-6 h-6"
              src={
                selectOption === "PROFILE"
                  ? "https://res.cloudinary.com/dwdq2ofjm/image/upload/v1706070137/user_3_1_1_h8fxdm.png"
                  : "https://res.cloudinary.com/dwdq2ofjm/image/upload/v1705912309/user_3_1_ikruwf.png"
              }
              alt="profile"
            />
            <TextParagraph
              className="font-medium text-base no-underline"
              selectOption={selectOption === "PROFILE"}
            >
              {t("common.profile")}
            </TextParagraph>
          </EachTextContainer>
        </Link>
      </TextContainer>
      <ProfileContainer className="h-20 mt-auto flex p-[24px 32px 0px 24px] items-center gap-2 self-stretch border-t border-solid border-gray-200">
        {loginUser.email !== undefined ? (
          <>
            <ProfileImageContainer className="flex items-center justify-center w-10 h-10 flex-col rounded-full bg-cover bg-center bg-lightgray">
              {loginUser.email[0].toUpperCase()}
            </ProfileImageContainer>
            <ProfileTextContainer>
              <ProfileName>{loginUser.email.split("@")[0]}</ProfileName>
              <ProfileEmail>{loginUser.email}</ProfileEmail>
            </ProfileTextContainer>
          </>
        ) : (
          <></>
        )}

        <Popup
          modal
          trigger={
            <LogoutButton
              className="border-0 bg-transparent mb-10 cursor-pointer"
              type="button"
            >
              {loginUser.email !== undefined ? (
                <ProfileImageContainerMedium>
                  {loginUser.email[0].toUpperCase()}
                </ProfileImageContainerMedium>
              ) : (
                ""
              )}

              <ProfileLogoutImage
                src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1706074414/log-out-01_yllnww.png"
                alt="logout"
              />
            </LogoutButton>
          }
        >
          {/* @ts-ignore */}
          {(close) => (
            <LogoutContainer>
              <LogoutConformationContainer>
                <TestContainer>
                  <WarningImageContainer>
                    <WarningImage
                      src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1706080360/log-out-01_1_wtsz63.png"
                      alt="logout"
                    />
                  </WarningImageContainer>
                  <TextImageContainer>
                    <HeaderTextImageContainer>
                      <LogoutHeading>
                        {t("logoutValues.logOutWarningTitle")}
                      </LogoutHeading>
                      <LogoutParagraph>
                        {t("logoutValues.logOutWarningParagraph")}
                      </LogoutParagraph>
                    </HeaderTextImageContainer>
                  </TextImageContainer>
                  <LogoutClosingImage
                    onClick={close}
                    src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1706078678/Close_gxeytv.png"
                    alt="close"
                  />
                </TestContainer>
                <LogoutButtonContainer>
                  <YesLogoutButton type="button" onClick={onClickLogout}>
                    {t("logoutValues.yesLogout")}
                  </YesLogoutButton>
                  <CancelLogoutButton
                    type="button"
                    className="trigger-button"
                    data-testid="close"
                    onClick={close}
                  >
                    {t("common.cancel")}
                  </CancelLogoutButton>
                </LogoutButtonContainer>
              </LogoutConformationContainer>
            </LogoutContainer>
          )}
        </Popup>
      </ProfileContainer>
    </SideBarMainContainer>
  );
};

export default observer(SideBar);
