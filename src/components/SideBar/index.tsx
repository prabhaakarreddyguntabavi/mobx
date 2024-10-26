import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import Cookies from "js-cookie";
import { observer } from "mobx-react";
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
  LogoImage1,
} from "./styledComponents";

import "./index.css";

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
    <SideBarMainContainer className="hidden max-w-[235px] h-screen shrink-0 border-r-[1px] border-[#e2e2e2] md:flex flex-col bg-white">
      <LogoImage
        className="w-[90%] inline-flex items-center m-3 "
        src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1705580146/Frame_507_ba197a.png"
        alt="website logo"
      />

      <LogoImage1
        className="hidden w-[100%] inline-flex items-center m-3 pr-2 ml-1 "
        src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1716617460/Frame_2_fae1sx.png"
        alt="website logo"
      />
      

      <TextContainer className="flex flex-col items-start w-2.5 h-[171px] mt-[50px]">
        <Link
          className="sidbar-content"
          to="/"
          onClick={() => {
            onChangeSelectOption("DASHBOARD");
            onChangeTransactionOption("ALLTRANSACTION");
          }}
        >
          <EachTextContainer className="flex h-6 justify-start items-center gap-3 shrink-0">
            <SelectedContainer
              className="w-1.5 h-10 shrink-0 rounded-r-lg"
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
              className="font-inter text-base font-medium text-gray-800"
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
          <EachTextContainer className="flex h-20 justify-start items-center gap-3 shrink-0">
            <SelectedContainer
              className="w-1.5 h-10 shrink-0 rounded-r-lg"
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
              className="font-inter text-base font-medium text-gray-800"
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
          <EachTextContainer className="flex h-6 justify-start items-center gap-3 shrink-0">
            <SelectedContainer
              className="w-1.5 h-10 shrink-0 rounded-r-lg"
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
              className="font-inter text-base font-medium text-gray-800"
              selectOption={selectOption === "PROFILE"}
            >
              {t("common.profile")}
            </TextParagraph>
          </EachTextContainer>
        </Link>
        <Link
          className="sidbar-content"
          to="/button-styles"
          onClick={() => {
            onChangeSelectOption("PROFILE");
            onChangeTransactionOption("ALLTRANSACTION");
          }}
        >
          <EachTextContainer className="flex h-20 justify-start items-center gap-3 shrink-0">
            <SelectedContainer
              className="w-1.5 h-10 shrink-0 rounded-r-lg"
              selectOption={selectOption === "PROFILE"}
            ></SelectedContainer>
            <IconsImage
              className="w-6 h-6"
              src={
                selectOption === "PROFILE"
                  ? "https://png.pngtree.com/element_pic/16/11/06/a459909a69500e714cfb6b442a80e2a1.jpg"
                  : "https://png.pngtree.com/element_pic/16/11/06/a459909a69500e714cfb6b442a80e2a1.jpg"
              }
              alt="profile"
            />
            <TextParagraph
              className="font-inter text-base font-medium text-gray-800"
              selectOption={selectOption === "PROFILE"}
            >
              {/* {t("common.profile")} */}
              Button Styles
            </TextParagraph>
          </EachTextContainer>
        </Link>
        <Link
          className="sidbar-content"
          to="/input-element"
          onClick={() => {
            onChangeSelectOption("PROFILE");
            onChangeTransactionOption("ALLTRANSACTION");
          }}
        >
          <EachTextContainer className="flex h-6 justify-start items-center gap-3 shrink-0">
            <SelectedContainer
              className="w-1.5 h-10 shrink-0 rounded-r-lg"
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
              className="font-inter text-base font-medium text-gray-800"
              selectOption={selectOption === "PROFILE"}
            >
              Input Elements{/* {t("common.profile")} */}
            </TextParagraph>
          </EachTextContainer>
        </Link>
      </TextContainer>
      <ProfileContainer className="h-20 mt-auto flex p-[24px 32px 0px 24px] items-center gap-2 self-stretch border-t border-solid border-gray-200">
        {loginUser.email !== undefined ? (
          <>
            <ProfileImageContainer className="flex items-center justify-center w-10 h-10 flex-col rounded-full bg-cover bg-center bg-[#6e7275] ml-2">
              {loginUser.email[0].toUpperCase()}
            </ProfileImageContainer>
            <ProfileTextContainer>
              <ProfileName className="text-gray-700 font-inter font-semibold text-sm leading-5 w-100 overflow-hidden">
                {loginUser.email.split("@")[0]}
              </ProfileName>
              <ProfileEmail className="text-gray-700 font-inter font-semibold text-sm leading-5 w-100 overflow-hidden">
                {loginUser.email}
              </ProfileEmail>
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
                <ProfileImageContainerMedium className="items-center justify-center w-10 h-10 flex-col rounded-full bg-cover bg-center bg-[#6e7275] ml-2 mt-10">
                  {loginUser.email[0].toUpperCase()}
                </ProfileImageContainerMedium>
              ) : (
                ""
              )}

              <ProfileLogoutImage
                className="w-[20px] h-[20px] cursor-pointer"
                src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1706074414/log-out-01_yllnww.png"
                alt="logout"
              />
            </LogoutButton>
          }
        >
          {/* @ts-ignore */}
          {(close) => (
            <LogoutContainer className="flex fixed top-0 left-0 w-screen h-screen flex-shrink-0 bg-gray-700 bg-opacity-70 backdrop-blur-md">
              <LogoutConformationContainer className="min-w-591 h-188 flex-shrink-0 rounded-lg bg-white mx-auto self-center shadow-lg pl-4">
                <TestContainer className="flex">
                  <WarningImageContainer className="w-[64px] h-[64px] flex-shrink-0 bg-yellow-200 rounded-full mt-[32px] [ml-20px] mr-[15px] flex justify-center items-center">
                    <WarningImage
                      src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1706080360/log-out-01_1_wtsz63.png"
                      alt="logout"
                    />
                  </WarningImageContainer>
                  <TextImageContainer>
                    <HeaderTextImageContainer>
                      <LogoutHeading className="text-[#333b69] font-inter font-bold text-lg mt-[32px] leading-7">
                        {t("logoutValues.logOutWarningTitle")}
                      </LogoutHeading>
                      <LogoutParagraph className="text-gray-700 font-inter text-base font-normal leading-5">
                        {t("logoutValues.logOutWarningParagraph")}
                      </LogoutParagraph>
                    </HeaderTextImageContainer>
                  </TextImageContainer>
                  <LogoutClosingImage
                    className="w-[24px] h-[24px] flex-shrink-0 m-[10px] ml-auto cursor-pointer"
                    onClick={close}
                    src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1706078678/Close_gxeytv.png"
                    alt="close"
                  />
                </TestContainer>
                <LogoutButtonContainer className="flex">
                  <YesLogoutButton
                    className="flex px-4 py-2 justify-center items-center gap-4 bg-red-600 rounded-lg border-0 mr-4 mt-8 mb-8 ml-28 text-white text-center font-inter font-medium text-sm leading-5 cursor-pointer"
                    type="button"
                    onClick={onClickLogout}
                  >
                    {t("logoutValues.yesLogout")}
                  </YesLogoutButton>
                  <CancelLogoutButton
                    className="flex h-10 p-2 md:p-4 justify-center items-center gap-4 md:gap-[10px] rounded-lg border border-gray-300 bg-white mt-8 text-[#333b69] md:text-gray-700 text-center font-inter font-medium text-sm leading-5 cursor-pointer"
                    type="button"
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
