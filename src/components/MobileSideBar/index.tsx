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
    <SideBarMainContainer>
      <PopupClosingContainer>
        <LogoImage
          src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1705580146/Frame_507_ba197a.png"
          alt="website logo"
        />
        <MobileSideBarClosing
          onClick={close}
          src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1706078678/Close_gxeytv.png"
          alt="close"
        />
      </PopupClosingContainer>

      <TextContainer>
        <Link
          className="sidbar-content"
          to="/"
          onClick={() => {
            onChangeSelectOption("DASHBOARD");
            onChangeTransactionOption("ALLTRANSACTION");
          }}
        >
          <EachTextContainer>
            <SelectedContainer selectOption={selectOption === "DASHBOARD"}>
              {}
            </SelectedContainer>
            <IconsImage
              src={
                selectOption === "DASHBOARD"
                  ? "https://res.cloudinary.com/dwdq2ofjm/image/upload/v1706070137/home_2_1_xkaadl.png"
                  : "https://res.cloudinary.com/dwdq2ofjm/image/upload/v1705730106/home_2_m9drn7.png"
              }
              alt="dashboard"
            />
            <TextParagraph selectOption={selectOption === "DASHBOARD"}>
              {t("dashboard.dashboard")}
            </TextParagraph>
          </EachTextContainer>
        </Link>
        <Link
          className="sidbar-content"
          to="/transaction"
          onClick={() => onChangeSelectOption("TRANSACTIONS")}
        >
          <EachTextContainer>
            <SelectedContainer
              selectOption={selectOption === "TRANSACTIONS"}
            ></SelectedContainer>
            <TransactionIconsImage
              src={
                selectOption === "TRANSACTIONS"
                  ? "https://res.cloudinary.com/dwdq2ofjm/image/upload/v1706070137/transfer_1_1_hqx4fr.png"
                  : "https://res.cloudinary.com/dwdq2ofjm/image/upload/v1705912310/transfer_1_e0it36.png"
              }
              alt="transactions"
            />

            <TextParagraph selectOption={selectOption === "TRANSACTIONS"}>
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
          <EachTextContainer>
            <SelectedContainer
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
            <TextParagraph selectOption={selectOption === "PROFILE"}>
              {t("common.profile")}
            </TextParagraph>
          </EachTextContainer>
        </Link>
      </TextContainer>
      <ProfileContainer>
        <ProfileImageContainer>
          {loginUser.email !== undefined
            ? loginUser.email[0].toUpperCase()
            : ""}
        </ProfileImageContainer>
        <ProfileTextContainer>
          <ProfileName>{apiResponse.name}</ProfileName>
          <ProfileEmail>{apiResponse.email}</ProfileEmail>
        </ProfileTextContainer>
        <YesLogoutButton type="button" onClick={onClickLogout}>
          {t("logoutValues.yesLogout")}
        </YesLogoutButton>
      </ProfileContainer>
    </SideBarMainContainer>
  );
};

export default observer(MobileSideBar);
