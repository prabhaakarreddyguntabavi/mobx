import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { observer } from "mobx-react";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import TransactionContext from "../../context/TransactionContext";
import { userDetails } from "../../constants/loginConstants";
import { useTranslation } from "react-i18next";

import { setJwtToken } from "../../utils/jwtToken";
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
  ProfileTextContainer,
  YesLogoutButton,
  MobileSideBarClosing,
  PopupClosingContainer,
} from "./styledComponents";

import "./index.css";

const MobileSideBar = (props: { close: () => void }): JSX.Element => {
  const { close } = props;
  const { t } = useTranslation();

  const transactionStore = useContext(TransactionContext);
  const {
    selectOption,
    onChangeSelectOption,
    onChangeTransactionOption,
    userDict,
    isUserAdmin,
    userId,
  } = transactionStore;
  const jwtToken = setJwtToken();
  const navigate: NavigateFunction = useNavigate();
  const [apiResponse, setApiResponse] = useState<UserDetail>({});

  let loginUser: UserDetail = {
    ...userDetails.find((eachUser) => eachUser.userId === userId),
    name: "",
  };

  useEffect(() => {
    const fetchProfileData = async (): Promise<void> => {
      if (!jwtToken) {
        navigate("/login");
        return;
      }
      await userDict.fetchData();
      userDict.loginUserDetails();
      setApiResponse(userDict.loginUser);
    };

    fetchProfileData();
  }, [jwtToken]);

  const onClickLogout = (): void => {
    navigate("/login");
    Cookies.remove("jwt_token");
  };

  return (
    <SideBarMainContainer className="flex flex-col w-screen h-screen flex-shrink-0 border-r border-gray-200 bg-white">
      <PopupClosingContainer className="flex">
        <LogoImage
          className="inline-flex items-center m-[20px]"
          src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1705580146/Frame_507_ba197a.png"
          alt="website logo"
        />
        <MobileSideBarClosing
          className="w-[5%] h-[35%] ml-auto mr-[20px] mt-[20px]"
          onClick={close}
          src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1706078678/Close_gxeytv.png"
          alt="close"
        />
      </PopupClosingContainer>

      <TextContainer className="w-[90vw] h-[171px] flex-shrink-0 mt-[49px]">
        <Link
          className="sidbar-content"
          to="/"
          onClick={() => {
            onChangeSelectOption("DASHBOARD");
            onChangeTransactionOption("ALLTRANSACTION");
          }}
        >
          <EachTextContainer className="flex w-[60vw] h-[60px] justify-start items-center gap-[20px] flex-shrink-0">
            <SelectedContainer
              className="w-[6px] h-[60px] flex-shrink-0 rounded-r-3xl"
              selectOption={selectOption === "DASHBOARD"}
            >
              {}
            </SelectedContainer>
            <IconsImage
              className="w-[25px] h-[25px]"
              src={
                selectOption === "DASHBOARD"
                  ? "https://res.cloudinary.com/dwdq2ofjm/image/upload/v1706070137/home_2_1_xkaadl.png"
                  : "https://res.cloudinary.com/dwdq2ofjm/image/upload/v1705730106/home_2_m9drn7.png"
              }
              alt="dashboard"
            />
            <TextParagraph
              className="font-inter text-[18px] text-base font-medium"
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
          <EachTextContainer className="flex w-[60vw] h-[60px] justify-start items-center gap-[20px] flex-shrink-0">
            <SelectedContainer
              className="w-[6px] h-[60px] flex-shrink-0 rounded-r-3xl"
              selectOption={selectOption === "TRANSACTIONS"}
            ></SelectedContainer>
            <TransactionIconsImage
              className="w-[25px] h-[25px]"
              src={
                selectOption === "TRANSACTIONS"
                  ? "https://res.cloudinary.com/dwdq2ofjm/image/upload/v1706070137/transfer_1_1_hqx4fr.png"
                  : "https://res.cloudinary.com/dwdq2ofjm/image/upload/v1705912310/transfer_1_e0it36.png"
              }
              alt="transactions"
            />

            <TextParagraph
              className="font-inter text-[18px] text-base font-medium"
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
          <EachTextContainer className="flex w-[60vw] h-[60px] justify-start items-center gap-[20px] flex-shrink-0">
            <SelectedContainer
              className="w-[6px] h-[60px] flex-shrink-0 rounded-r-3xl"
              selectOption={selectOption === "PROFILE"}
            ></SelectedContainer>
            <IconsImage
              src={
                selectOption === "PROFILE"
                  ? "https://res.cloudinary.com/dwdq2ofjm/image/upload/v1706070137/user_3_1_1_h8fxdm.png"
                  : "https://res.cloudinary.com/dwdq2ofjm/image/upload/v1705912309/user_3_1_ikruwf.png"
              }
              alt="profile"
            />
            <TextParagraph
              className="font-inter text-[18px] text-base font-medium"
              selectOption={selectOption === "PROFILE"}
            >
              {t("common.profile")}
            </TextParagraph>
          </EachTextContainer>
        </Link>
      </TextContainer>
      <ProfileContainer className="mt-auto flex px-[24px] py-[32px] items-center gap-[10px] self-stretch border-t border-[#eaecf0] pb-[10px]">
        <ProfileImageContainer className="flex w-[40px] h-[40px] flex-col justify-center items-center rounded-full bg-cover bg-center bg-no-repeat bg-[#c7c7c7]">
          {loginUser.email !== undefined
            ? loginUser.email[0].toUpperCase()
            : ""}
        </ProfileImageContainer>
        <ProfileTextContainer className="flex flex-col items-start w-[10px]">
          <ProfileName className="text-[#505887] font-inter text-[14px] font-semibold leading-5 overflow-hidden w-[100px]">
            {apiResponse.name}
          </ProfileName>
          <ProfileEmail className="text-[#718ebf] font-inter text-base font-normal leading-5 overflow-hidden w-[150px]">
            {apiResponse.email}
          </ProfileEmail>
        </ProfileTextContainer>
        <YesLogoutButton
          className="rounded-lg h-10 w-32 ml-auto mr-[5px] cursor-pointer bg-[#c3c7ca]"
          type="button"
          onClick={onClickLogout}
        >
          {t("logoutValues.yesLogout")}
        </YesLogoutButton>
      </ProfileContainer>
    </SideBarMainContainer>
  );
};

export default observer(MobileSideBar);
